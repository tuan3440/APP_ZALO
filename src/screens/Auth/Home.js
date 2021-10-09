import React from 'react';
import {View, Text, TextInput, StyleSheet, Image, Button} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Home = () => {
  return (
    <View>
      <Image source={require('../../static/zalo.png')} />
      <View >
        <Button title="Login"  />
        <Button title="Register" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  image: {
      flex : 7
  },
  button : {
      flex : 3
  },
  buttonLogin: {},
  buttonLogout: {},
});

export default Home;
