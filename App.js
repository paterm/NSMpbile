import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { StorageService } from './app/services';
import AppContainer from './AppContainer';

export default class App extends React.Component {
	componentDidMount() {
	    // StorageService.removeData('accessToken').then(() => {});
        StorageService.retrieveData('accessToken').then(value => {
            if (!value && this.navigator) {
                this.navigator.dispatch(NavigationActions.navigate({ routeName: 'Login' }));
            }
        });
	}

	onNavigationStateChange = (previous, current) => {
		const screen = {
			current: this.getCurrentRouteName(current),
			previous: this.getCurrentRouteName(previous),
		};
		if (screen.previous !== screen.current) {
			// track(screen.current);
		}
	};

	getCurrentRouteName = (navigation) => {
		const route = navigation.routes[navigation.index];
		return route.routes ? this.getCurrentRouteName(route) : route.routeName;
	};

  render() {
    return (
      <View style={styles.container}>
        <AppContainer ref={nav => this.navigator = nav} onNavigationStateChange={this.onNavigationStateChange}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
