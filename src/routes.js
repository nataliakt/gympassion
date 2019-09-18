import React from 'react';
import { Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Main from './pages/main';
import Gyms from './pages/gyms';
import Gym from './pages/gym';

const defaultNavigationOptions = {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: "#e54919"
        },
        headerTintColor: "#FFF"
    }
}

const GymsNavigator = createStackNavigator({
    Gyms,
    Gym
}, defaultNavigationOptions);

const MainNavigator = createStackNavigator({
    Main
}, defaultNavigationOptions);

const AppNavigator = createBottomTabNavigator({
    Academias: {
        screen: GymsNavigator,
        navigationOptions: {
            tabBarIcon: <Image source={require('./resources/dumbbell.png')} style={{width:20, height: 20}}/>
        }
    },
    Checkins: {
        screen: MainNavigator,
        navigationOptions: {
            tabBarIcon: <Image source={require('./resources/point.png')} style={{width:20, height: 20}}/>
        }
    }
}, {
    tabBarOptions: {
        activeTintColor: "#424242",
        inactiveTintColor: "#424242",
        activeBackgroundColor: "#fbe9e7",
        labelStyle: {
            fontSize: 12,
        },
        // showIcon: false
    },
    defaultNavigationOptions: {
        // tabBarIcon: <Image source={require('./resources/dumbbell.png')} style={{width:30, height: 30}}/>
    }
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;