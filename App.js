import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import IndexScreen from './src/screens/IndexScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MainScreen from './src/screens/DiaryScreen/MainScreen';
import ListFriendScreen from './src/screens/DirectoryScreen/ListFriendScreen';
import ListChatScreen from './src/screens/MessageScreen/ListChatScreen';
import InfoPersonalScreen from './src/screens/PersonalScreen/InfoPersonalScreen';
import Search from './src/components/Search';
import Home from './src/screens/Auth/Home';

const Stack = createNativeStackNavigator();
const MessageStack = createNativeStackNavigator();
const DirectoryStack = createNativeStackNavigator();
const DiaryStack = createNativeStackNavigator();
const PersonalStack = createNativeStackNavigator();

const MessageStackScreen = () => (
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
);

const DirectoryStackScreen = () => (
  <DirectoryStack.Navigator>
    <DirectoryStack.Screen name="listfriend" component={ListFriendScreen} />
  </DirectoryStack.Navigator>
);

const DiaryStackScreen = () => (
  <DiaryStack.Navigator>
    <DiaryStack.Screen name="main" component={MainScreen} />
  </DiaryStack.Navigator>
);

const PersonalStackScreen = () => (
  <PersonalStack.Navigator>
    <PersonalStack.Screen name="infoPersonal" component={InfoPersonalScreen} />
  </PersonalStack.Navigator>
);

const Tab = createBottomTabNavigator();

function App() {
  return (
      <NavigationContainer>
        <Tab.Navigator>
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
            component={DirectoryStackScreen}
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
      </NavigationContainer>
  );
}
// headerRight : () => <AntDesign name="pluscircle" size={30}/>

export default () => {
  return (
    <Provider store={store}>
      {/* <Search />
      <App /> */}
      <Home />
    </Provider>
  );
};
