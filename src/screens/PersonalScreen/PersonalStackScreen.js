import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import InfoPersonalScreen from './InfoPersonalScreen';
import PersonalScreen from './PersonalScreen';
import UpdateInfoScreen from './UpdateInfoScreen';
import UpdatePasswordScreen from './UpdatePasswordScreen';
import HomeScreen from '../Auth/HomeScreen';

const PersonalStack = createNativeStackNavigator();
const PersonalStackScreen = () => {
  return (
    <PersonalStack.Navigator>
      <PersonalStack.Screen
        name="Personal Setting"
        component={PersonalScreen}
        options={{headerShown: false}}
      />
      <PersonalStack.Screen
        name="infoPersonal"
        component={InfoPersonalScreen}
      />
       <PersonalStack.Screen
        name="Update"
        component={UpdateInfoScreen}
      />
       <PersonalStack.Screen
        name="Update Password"
        component={UpdatePasswordScreen}
      />
       {/* <PersonalStack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      /> */}
    </PersonalStack.Navigator>
  );
};

export default PersonalStackScreen;
