import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, ScrollView, Button} from 'react-native';
import api from '../../api/index';
import {connect} from 'react-redux';
import {URL_FILE} from '../../redux/constants/constants';
import {blockUser} from '../../redux/actions/auth.action';

const InfoPersonalScreen = props => {
  const user = props.route.params.user;
  const isFriend = props.route.params.isFriend;

  const createChat = async friendId => {
    try {
      const res = await api.get('chats/createChat/' + friendId, {
        headers: {authorization: `Bearer ${props.token}`},
      });
      let chatId = res.data.data;
      props.navigation.navigate('Message', {
        username: user.username,
        userId : user._id,
        chatId: chatId,
      });
    } catch (e) {
      console.error('post', e);
    }
  };
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
        {!isFriend && user._id != props.id ? (
          <View style={styles.buttons}>
            <Button
              title="Message"
              onPress={() => {
                createChat(user?._id);
              }}
            />
            {
              props.blocked_inbox.includes(user._id) ? (
                <Button
                title="Remove Block"
                onPress={() => {
                  props.blockUser(props.token, user._id, 0);
                }}
              />
              ) : (
                <Button
                title="Block"
                onPress={() => {
                  props.blockUser(props.token, user._id, 1);
                }}
              />
              )
            }
           
          </View>
        ) : (
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
            {user._id != props.id && <View style={styles.buttons}>
              <Button
                title="Message"
                onPress={() => {
                  createChat(user?._id);
                }}
              />
            </View>}
          </View>
        )}
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
    flexDirection: 'row',
  },
  field: {
    flexDirection: 'row',
    paddingVertical: 15,
  },
  text_title: {
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 10,
    marginRight: 50,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderTopWidth: 1,
    paddingTop: 20,
  },
});

const mapStateToProp = state => {
  return {
    // phonenumber: state.user.phonenumber,
    // password: state.user.password,
    // username: state.user.username,
    id: state.auth.id,
    token: state.auth.token,
    error: state.auth.error,
    blocked_inbox : state.auth.blocked_inbox
  };
};

const mapDispatchToProp = {
  blockUser
};
export default connect(mapStateToProp, mapDispatchToProp)(InfoPersonalScreen);
