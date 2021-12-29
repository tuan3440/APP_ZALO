import React, {useContext, useEffect, useFocusEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import {URL_FILE} from '../../redux/constants/constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import api from '../../api/index';

const FriendRequestSingle = props => {
  const friend = props.friend;
  // const removeRequestFriend = async (user_id) => {
  //   try {
  //     const res = await api.post('friends/set-accept/',
  //     {
  //       user_id : user_id,
  //       is_accept: 2
  //     },
  //     {
  //       headers: {authorization: `Bearer ${props.token}`},
  //     });
  //     const newList = props.lists.filter(friend => {
  //       return friend._id != user_id;
  //     })
  //     props.update(newList);
  //   } catch (e) {
  //     console.error('cm111', e.response);
  //   }
  // }
  // const acceptRequestFriend = async (user_id) => {
  //   try {
  //     const res = await api.post('friends/set-accept/',
  //     {
  //       user_id : user_id,
  //       is_accept: 1
  //     },
  //     {
  //       headers: {authorization: `Bearer ${props.token}`},
  //     });
  //     const newList = props.lists.filter(friend => {
  //       return friend._id != user_id;
  //     })
  //     props.update(newList);
  //   } catch (e) {
  //     console.error('cm111', e.response);
  //   }
  // }
  return (
    <View style={styles.container}>
      <Image
      style={{width: 35, height: 35, borderRadius: 20, marginLeft: 20, marginRight: 20}}
      source={{
        uri : URL_FILE + friend.avatar.fileName
      }}/>
      <Text style={{flex:1}}>{friend.username}</Text>
      <EvilIcons name="check" size={35}
      onPress={() => {
        props.acceptRequestFriend(props.token, friend._id);
      }}
      />
      <EvilIcons name="close-o" size={35} style={{marginHorizontal:20}}
      onPress={() => {
           props.removeRequestFriend(props.token, friend._id)
      }}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container : {
      flexDirection: 'row',
      paddingVertical : 10
      // alignItems : 'center'
    }
})

export default FriendRequestSingle;