import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ToastProvider} from 'react-native-toast-notifications';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DirectoryTabScreen from './src/screens/DirectoryScreen/DirectoryTabScreen';
import MessageStackScreen from './src/screens/MessageScreen/MessageStackScreen';
import PersonalStackScreen from './src/screens/PersonalScreen/PersonalStackScreen';
import DiaryStackScreen from './src/screens/DiaryScreen/DiaryStackScreen';

import HomeScreen from './src/screens/Auth/HomeScreen';
import LoginScreen from './src/screens/Auth/LoginScreen';
import RegisterScreen from './src/screens/Auth/RegisterScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
import {changeToken} from './src/redux/actions/auth.action';

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
    {/* <AuthStack.Screen
      name="Zalo"
      component={AppZaloScreen}
      options={{header: () => null}}
    /> */}
  </AuthStack.Navigator>
);
const MainStack = createNativeStackNavigator();
const MainStackScreen = () => (
  <MainStack.Navigator>
    <MainStack.Screen
      name="Zalo"
      component={AppZaloScreen}
      options={{header: () => null}}
    />
  </MainStack.Navigator>
);

const Tab = createBottomTabNavigator();

const AppZaloScreen = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
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
        component={DirectoryTabScreen}
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
          tabBarVisible: false,
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
};

const A = (props) => {
  const [isLogin, setIsLogin] = useState('');
  useEffect(() => {
    const getTokenStorage = async () => {
      try {
        const a = await AsyncStorage.getItem('token');
        console.log("token", a);
        props.changeToken(a);
        setIsLogin(a);
      } catch (e) {}
    };
    getTokenStorage();
  },[props.token])
  return (
    <NavigationContainer>
      <ToastProvider>
        {isLogin ? <MainStackScreen /> : <AuthStackScreen />}
      </ToastProvider>
    </NavigationContainer>
  );
};
const mapStateToProp = state => {
  return {
    token: state.auth.token,
  };
};
const mapDispatchToProp = {
  changeToken
};
const B = connect(mapStateToProp, mapDispatchToProp)(A);


export default () => {
  return <Provider store={store}>
    <B />
   {/* <NavigationContainer>
      <ToastProvider>
        {isLogin ? <MainStackScreen /> : <AuthStackScreen />}
      </ToastProvider>
    </NavigationContainer> */}
  </Provider>;
};
