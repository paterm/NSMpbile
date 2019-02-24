import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export class FormTextInput extends Component {
	focus = () => {
			this.input.focus();
	};

	render() {
		return (
			<View
				style={[styles.container, this.props.style]}
				onStartShouldSetResponder={() => this.input.focus()}
			>
				{this.props.label && <Text style={styles.label}>{this.props.label}</Text>}

				<TextInput
					ref={node => this.input = node}
					{...this.props}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		paddingTop: 8,
		paddingBottom: 5,
		paddingLeft: 12,
		paddingRight: 12,
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: '#ccc'
	},
	label: {
		fontSize: 10,
		color: '#666',
		marginBottom: 4
	},
	input: {
		width: '100%',
		fontSize: 16
	}
});
