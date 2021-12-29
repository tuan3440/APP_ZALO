import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {URL_FILE} from '../../redux/constants/constants';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';

const MessageSingle = props => {
  const navigation = useNavigation();
  const message = props.message;


  const isUser = props.id == message.user._id ? true : false;

  return (
      <View>
          {isUser ? (
              <View style={styles.box2}>
              <Text style={{backgroundColor : 'lightblue', padding: 10}}>{message.content}</Text>
              </View>) : (
              <View style={styles.box}>
              <Image
            style={{
              width: 30,
              height: 30,
              borderRadius: 15,
              marginRight : 10
            }}
            source={{
              uri: URL_FILE + message.user.avatar.fileName,
            }}
          />
            <Text style={{backgroundColor : 'white', padding: 10}}>{message.content}</Text>
            </View>
            )}
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  box2 : {
    flexDirection : 'row',
    alignItems: 'flex-end',
    justifyContent : 'flex-end',
    marginHorizontal : 10,
    padding : 15
  },
  box : {
    flexDirection : 'row',
    marginHorizontal : 10,
    padding : 10
  },
  message: {
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
  },
});

const mapStateToProp = state => {
  return {
    // phonenumber: state.user.phonenumber,
    // password: state.user.password,
    // username: state.user.username,
    token: state.auth.token,
    error: state.auth.error,
    id : state.auth.id
  };
};

const mapDispatchToProp = {};
export default connect(mapStateToProp, mapDispatchToProp)(MessageSingle);
