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


const FriendSingle = props => {
  const friend = props.friend;
  const removeFriend = async (user_id) => {
    try {
      const res = await api.post('friends/set-remove/',
      {
        user_id : user_id
      },
      {
        headers: {authorization: `Bearer ${props.token}`},
      });
      const newList = props.lists.filter(friend => {
        return friend._id != user_id;
      })
      props.update(newList);
    } catch (e) {
      console.error('cm111', e.response);
    }
  }
  return (
    <View style={styles.container}>
      <Image
      style={{width: 35, height: 35, borderRadius: 20, marginLeft: 20, marginRight: 20}}
      source={{
        uri : URL_FILE + friend.avatar.fileName
      }}/>
      <Text style={{flex:1}}>{friend.username}</Text>
      <AntDesign name="phone" size={25}/>
      <AntDesign name="videocamera" size={25} style={{marginLeft:20}}/>
      <MaterialCommunityIcons name="account-cancel-outline" size={30} style={{marginHorizontal:20}}
      onPress={() => removeFriend(friend._id)}
      />
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

export default FriendSingle;
