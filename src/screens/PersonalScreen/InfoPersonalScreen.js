import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, ScrollView, Button} from 'react-native';
import api from '../../api/index';
import {connect} from 'react-redux';
import {URL_FILE} from '../../redux/constants/constants';

const InfoPersonalScreen = props => {
  const user = props.route.params.user;
  return (
    <View style={styles.container}>
        <ScrollView>
      <View style={styles.imageheader}>
        <Image
          style={{width: '100%', height: 200, position: 'relative'}}
          source={{
            uri: URL_FILE + user?.cover_image?.fileName,
          }}
        />
        <View style={styles.title}>
          <Image
            style={{width: 60, height: 60, borderRadius: 30}}
            source={{
              uri: URL_FILE + user?.avatar?.fileName,
            }}
          />
          <Text style={{fontSize: 20, fontWeight: '700', color: 'red'}}>
            {user?.username}
          </Text>
        </View>
      </View>
      <View>
          <View style={styles.field}>
              <Text style={styles.text_title}>Username</Text>
              <Text>{user?.username}</Text>
          </View>
          <View style={styles.field}>
              <Text style={styles.text_title}>Gender</Text>
              <Text>{user?.gender}</Text>
          </View>
          <View style={styles.field}>
              <Text style={styles.text_title}>Phone number</Text>
              <Text>{user?.phonenumber}</Text>
          </View>
          <View style={styles.field}>
              <Text style={styles.text_title}>Address</Text>
              <Text>{user?.address}</Text>
          </View>
          <View style={styles.field}>
              <Text style={styles.text_title}>Description</Text>
              <Text>{user?.description}</Text>
          </View>
      </View>
      <View>
          <Button title="Add friend"/>
      </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    position: 'absolute',
    alignItems: 'center',
    top: 120,
    left: 20,
    flexDirection: 'row'
  },
  field : {
      flexDirection : 'row',
      paddingVertical : 15
      },
  text_title : {
      fontSize : 20,
      fontWeight : '700',
      marginLeft : 10,
      marginRight : 50,
  }
});

const mapStateToProp = state => {
  return {
    // phonenumber: state.user.phonenumber,
    // password: state.user.password,
    // username: state.user.username,
    token: state.auth.token,
    error: state.auth.error,
  };
};

const mapDispatchToProp = {};
export default connect(mapStateToProp, mapDispatchToProp)(InfoPersonalScreen);
