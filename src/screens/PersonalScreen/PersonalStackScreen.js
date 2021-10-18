import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import InfoPersonalScreen from './InfoPersonalScreen';

const PersonalStack = createNativeStackNavigator();
const PersonalStackScreen = () => {
  return (
    <PersonalStack.Navigator>
    <PersonalStack.Screen name="infoPersonal" component={InfoPersonalScreen} />
  </PersonalStack.Navigator>
  )
   
};

export default PersonalStackScreen;