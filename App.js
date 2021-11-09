import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DirectoryStackScreen from './src/screens/DirectoryScreen/DirectoryStackScreen';
import MessageStackScreen from './src/screens/MessageScreen/MessageStackScreen';
import PersonalStackScreen from './src/screens/PersonalScreen/PersonalStackScreen';
import DiaryStackScreen from './src/screens/DiaryScreen/DiaryStackScreen';

import HomeScreen from './src/screens/Auth/HomeScreen';
import LoginScreen from './src/screens/Auth/LoginScreen';
import RegisterScreen from './src/screens/Auth/RegisterScreen';

const Stack = createNativeStackNavigator();

const AuthStack = createNativeStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="Home"
      component={HomeScreen}
      options={{headerShown: false}}
    />
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="Register" component={RegisterScreen} />
    <AuthStack.Screen name="Zalo" component={AppZaloScreen}  options={{header: () => null}}/>
  </AuthStack.Navigator>
);


const Tab = createBottomTabNavigator();

const AppZaloScreen = () => {
  return (
      <Tab.Navigator
       screenOptions={{ headerShown: false }}
      >
        <Tab.Screen
          name="Message"
          component={MessageStackScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <AntDesign
                name="message1"
                size={30}
                color={focused ? '#318bfb' : '#ddd'}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Directory"
          component={DirectoryStackScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <AntDesign
                name="book"
                size={30}
                color={focused ? '#318bfb' : '#ddd'}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Diary"
          component={DiaryStackScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <EvilIcons
                name="clock"
                size={30}
                color={focused ? '#318bfb' : '#ddd'}
              />
            ),
            tabBarVisible: false
          }}
        />
        <Tab.Screen
          name="Personal"
          component={PersonalStackScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <Ionicons
                name="person-outline"
                size={30}
                color={focused ? '#318bfb' : '#ddd'}
              />
            ),
          }}
        />
      </Tab.Navigator>
  );
}

export default () => {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <AuthStackScreen />
    </NavigationContainer>
  </Provider>
  )
};
