import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ListFriendScreen from './ListFriendScreen';

const DirectoryStack = createNativeStackNavigator();
const DirectoryStackScreen = () => {
  return (
    <DirectoryStack.Navigator>
    <DirectoryStack.Screen name="listfriend" component={ListFriendScreen} />
  </DirectoryStack.Navigator>
  )
   
};

export default DirectoryStackScreen;