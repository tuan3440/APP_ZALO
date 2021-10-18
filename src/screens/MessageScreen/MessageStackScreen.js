import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ListChatScreen from './ListChatScreen';

const MessageStack = createNativeStackNavigator();
const MessageStackScreen = () => {
  return (
    <MessageStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <MessageStack.Screen
      name="message"
      component={ListChatScreen}
      options={{headerShown: false}}
    />
  </MessageStack.Navigator>
  )
   
};

export default MessageStackScreen;