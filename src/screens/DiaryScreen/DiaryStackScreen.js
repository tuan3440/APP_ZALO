import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainScreen from './MainScreen';

const DiaryStack = createNativeStackNavigator();
const DiaryStackScreen = () => {
  return (
    <DiaryStack.Navigator>
    <DiaryStack.Screen name="main" component={MainScreen} />
  </DiaryStack.Navigator>
  )
   
};

export default DiaryStackScreen;