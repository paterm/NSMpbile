import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {ProfileService} from "../../services";
import UserProfile from "../../components/shared/UserProdile";

export class HomeScreen extends Component {
    state = {
        profile: null
    };

    componentDidMount() {
        ProfileService.getLocal().then(response => {
            this.setState({profile: response})
        });
    }

    render() {
        const {profile} = this.state;

		return (
			<View style={styles.container}>
                {profile && <UserProfile user={profile}/>}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
});
