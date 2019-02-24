import { createAppContainer, createStackNavigator } from 'react-navigation';
import * as Screens from './app/screens';

const AppNavigator = createStackNavigator({
	Home: Screens.HomeScreen,
	Login: {
        screen: Screens.LoginScreen,
        navigationOptions:  {
            title: 'Авторизация',
            headerLeft: null,
            gesturesEnabled: false,
        }
    }
}, {
	headerMode: 'none',
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
