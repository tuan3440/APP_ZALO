import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ListChatScreen from './ListChatScreen';
import MessageScreen from './MessageScreen';

const MessageStack = createNativeStackNavigator();
const MessageStackScreen = () => {
  return (
    <MessageStack.Navigator
     >
      <MessageStack.Screen
        name="ListChat"
        component={ListChatScreen}
        // options={{headerShown: false}}
      />
      <MessageStack.Screen
        name="MessageS"
        component={MessageScreen}
      />
    </MessageStack.Navigator>
  );
};

export default MessageStackScreen;
