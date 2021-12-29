import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ListFriendScreen from './ListFriendScreen';
import ListRequestScreen from './ListRequestScreen';
import SearchScreen from './SearchScreen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import InfoPersonalScreen from '../PersonalScreen/InfoPersonalScreen';
import MessageScreen from '../MessageScreen/MessageScreen';

const DireactoryStack = createNativeStackNavigator();

const DirectoryTab = createMaterialTopTabNavigator();
const DirectoryTabScreen = () => {
  return (
    <DirectoryTab.Navigator>
      <DirectoryTab.Screen name="listfriend" component={ListFriendScreen} />
      <DirectoryTab.Screen name="listrequest" component={ListRequestScreen} />
      <DirectoryTab.Screen name="search" component={SearchScreen} />
    </DirectoryTab.Navigator>
  );
};

const DirectoryStackScreen = () => (
  <DireactoryStack.Navigator>
    <DireactoryStack.Screen
      name="DirectoryTab"
      component={DirectoryTabScreen}
      options={{headerShown: false}}
    />
    <DireactoryStack.Screen name="Info" component={InfoPersonalScreen} />
    <DireactoryStack.Screen name="Message" component={MessageScreen} />

  </DireactoryStack.Navigator>
);



export default DirectoryStackScreen;
