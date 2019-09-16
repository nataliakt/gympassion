import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/main';

const AppNavigator = createStackNavigator({
    Main,
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;