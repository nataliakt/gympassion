import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/main';
import Gyms from './pages/gyms';
import Gym from './pages/gym';

const AppNavigator = createStackNavigator({
    Gyms,
    Gym,
    Main,
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;