import React, { Component } from 'react';
import { FormTextInput } from "../../components/form";
import { AuthService } from '../../services';
import {
    ActivityIndicator,
    Keyboard,
    StyleSheet,
    Image,
    Button,
    Text,
    KeyboardAvoidingView
} from 'react-native';

export class LoginScreen extends Component {
	state = {
        login: '',
        password: '',
        error: '',
        inProgress: false
	};

	onChangeText = (value, prop) => {
        this.setState({[prop]: value});
	};

	onContainerTouch = () => {
		Keyboard.dismiss();
	};

	onSubmit = () => {
	    this.setState({inProgress: true, error: ''}, () => {
            AuthService.login({
                username: this.state.login,
                password: this.state.password
            }).then(() => {
                this.props.navigation.navigate('Home');
                this.setState({inProgress: false})
            }).catch((error) => {
                this.setState({error, inProgress: false})
            });
        });
	};

	render() {
		const { login, password, error, inProgress } = this.state;

		return (
			<KeyboardAvoidingView
				style={styles.container}
				behavior='padding'
				enabled
				onStartShouldSetResponder={this.onContainerTouch}
			>
				<Image
					style={styles.logo}
					source={require('../../assets/images/welcome-logo.jpg')}
				/>

				<FormTextInput
					style={styles.input}
					label='Логин'
					onChangeText={value => this.onChangeText(value, 'login')}
					onSubmitEditing={() => this.passwordRef.focus()}
					value={login}
				/>

				<FormTextInput
					ref={node => this.passwordRef = node}
					style={styles.input}
					label='Пароль'
					onChangeText={value => this.onChangeText(value, 'password')}
					value={password}
					onSubmitEditing={this.onSubmit}
					secureTextEntry
				/>

				<Button
					disabled={!login || !password}
					title='Войти'
					onPress={this.onSubmit}
					style={styles.button}
				/>

                {error ? <Text style={styles.error}>{error}</Text> : null}

                {inProgress && <ActivityIndicator/>}
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#f2fafb'
	},
	logo: {
        marginBottom: 50
	},
	input: {
		width: 250,
		marginBottom: 10
	},
	button: {
		backgroundColor: '#85c9dc',
        width: '100%',
        paddingTop: 5,
        paddingBottom: 5
	},
    error: {
	    color: 'red',
        textAlign: 'center'
    }
});
