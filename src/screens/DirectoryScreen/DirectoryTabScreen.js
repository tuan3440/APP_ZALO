import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ListFriendScreen from './ListFriendScreen';
import ListRequestScreen from './ListRequestScreen';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const DirectoryTab = createMaterialTopTabNavigator();
const DirectoryTabScreen = () => {
  return (
    <DirectoryTab.Navigator>
      <DirectoryTab.Screen name="listfriend" component={ListFriendScreen} />
      <DirectoryTab.Screen name="listrequest" component={ListRequestScreen} />
    </DirectoryTab.Navigator>
  );
};

export default DirectoryTabScreen;
