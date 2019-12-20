import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import Todo from './src/screens/Todo';
import Position from './src/screens/Position';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Icon} from 'native-base';
import SplashScreen from './src/screens/Splash';

const AppNavigator = createStackNavigator({
  Todo: {
    screen: Todo,
    navigationOptions: () => ({
      header: null,
    }),
  },
  Position: {
    screen: Position,
    navigationOptions: () => ({
      header: null,
    }),
  },
});
const BottomNavigator = createBottomTabNavigator(
  {
    Todo: {
      screen: AppNavigator,
      navigationOptions: {
        tabBarLabel: 'To do list',
        tabBarIcon: ({tintColor}) => (
          <Icon
            type="FontAwesome"
            name="list"
            style={{color: tintColor, fontSize: 23}}
          />
        ),
      },
    },
    Position: {
      screen: Position,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon
            type="FontAwesome"
            name="map-marker"
            style={{color: tintColor, fontSize: 23}}
          />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor: 'grey',
      style: {
        backgroundColor: 'white',
        borderTopWidth: 0,
        shadowOffset: {width: 5, height: 3},
        shadowColor: 'black',
        shadowOpacity: 0.5,
        elevation: 5,
      },
    },
  },
);

const switchScreen = createSwitchNavigator({
  Splash: SplashScreen,
  // AuthScreen: UserNavigator,
  App: BottomNavigator,
});

export default createAppContainer(switchScreen);
