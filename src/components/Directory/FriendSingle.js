import React, {useContext, useEffect, useFocusEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {URL_FILE} from '../../redux/constants/constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../../api/index';
import {useNavigation} from '@react-navigation/native';

const FriendSingle = props => {
  const friend = props.friend;
  const navigation = useNavigation();

  const createChat = async friendId => {
    try {
      const res = await api.get('chats/createChat/' + friendId, {
        headers: {authorization: `Bearer ${props.token}`},
      });
      let chatId = res.data.data;
      navigation.navigate('Message', {
        username: friend.username,
        chatId: chatId,
      });
    } catch (e) {
      console.error('post', e);
    }
  };
  return (
    <TouchableOpacity onPress={() => createChat(friend._id)}>
    <View style={styles.container} >
      <Image
      style={{width: 35, height: 35, borderRadius: 20, marginLeft: 20, marginRight: 20}}
      source={{
        uri : URL_FILE + friend.avatar.fileName
      }}/>
      <Text style={{flex:1}}>{friend.username}</Text>
      <AntDesign name="phone" size={25}/>
      <AntDesign name="videocamera" size={25} style={{marginLeft:20}}/>
      <MaterialCommunityIcons name="account-cancel-outline" size={30} style={{marginHorizontal:20}}
      onPress={() => props.removeFriend(props.token, friend._id)}
      />
    </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container : {
      flexDirection: 'row',
      paddingVertical : 10
      // alignItems : 'center'
    }
})

export default FriendSingle;
