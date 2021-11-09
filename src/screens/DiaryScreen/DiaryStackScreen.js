import React, {useLayoutEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {NavigationContainer, getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainScreen from './MainScreen';
import CreatePostScreen from './CreatePostScreen';
import CommentScreen from './CommentScreen';

const DiaryStack = createNativeStackNavigator();


const DiaryStackScreen = ({ navigation, route }) => {
  return (
    <DiaryStack.Navigator
    // screenOptions={{ headerShown: false }}
    >
    <DiaryStack.Screen name="main" component={MainScreen} options={{headerShown: false}}/>
    <DiaryStack.Screen name="CreatePost" component={CreatePostScreen} />
    <DiaryStack.Screen name="Comment" component={CommentScreen} />
  </DiaryStack.Navigator>
  )
   
};

export default DiaryStackScreen;