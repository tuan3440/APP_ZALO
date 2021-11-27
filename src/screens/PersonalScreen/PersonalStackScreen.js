import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import InfoPersonalScreen from './InfoPersonalScreen';
import PersonalScreen from './PersonalScreen';
import UpdateInfoScreen from './UpdateInfoScreen';

const PersonalStack = createNativeStackNavigator();
const PersonalStackScreen = () => {
  return (
    <PersonalStack.Navigator>
      <PersonalStack.Screen
        name="Personal"
        component={PersonalScreen}
      />
      <PersonalStack.Screen
        name="infoPersonal"
        component={InfoPersonalScreen}
      />
       <PersonalStack.Screen
        name="Update"
        component={UpdateInfoScreen}
      />
    </PersonalStack.Navigator>
  );
};

export default PersonalStackScreen;
