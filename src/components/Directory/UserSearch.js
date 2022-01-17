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
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {useNavigation} from '@react-navigation/native';


const UserSearch = props => {
  const friend = props.user;
  const lists = props.friendlist;
  const listRequests = props.friendrequest;
  const listRequesteds = props.friendrequested;
  const navigation = useNavigation();

  let isFriend = false;
  let isRequest = false;
  let isRequested = false;
  let isStranger = true;

  if (lists.length > 0) {
    lists.map(x => {
      if (x._id == friend._id) {
        isFriend = true;
      }
    })
  }
  
  if (!isFriend && listRequests.length > 0) {
    listRequests.map( y => {
      if (y._id == friend._id) {
        isRequest = true;
      }
    })
  }

  if (!isFriend && !isRequest) {
    listRequesteds.map(z => {
      if (z._id == friend._id) {
        isRequested = true;
      }
    })
  }

  if (isFriend || isRequest || isRequested) {
    isStranger = false;
  }
  return (
    <TouchableOpacity onPress={() => navigation.push("Info", {
      user : friend,
      isFriend : isFriend,
      isRequest : isRequest,
      isRequested : isRequested,
      isStranger: isStranger
    })}>

    <View style={styles.container}>
      <Image
      style={{width: 35, height: 35, borderRadius: 20, marginLeft: 20, marginRight: 20}}
      source={{
        uri : URL_FILE + friend.avatar.fileName
      }}/>
      <Text style={{flex:1}}>{friend.username}</Text>
      {isRequest &&  <View style={{marginHorizontal: 10}}><Button title="Accept"/></View>}
      {isFriend && <Text style={{marginHorizontal: 10, backgroundColor: 'lightblue', paddingTop: 5, paddingHorizontal:5}}>Friend</Text>}
      {isRequested && <Text style={{marginHorizontal: 10, backgroundColor: 'lightblue', paddingTop: 5, paddingHorizontal:5}}>you have sent request friend</Text>}
      {isStranger && <View style={{marginHorizontal: 10}}><Button title="Add" onPress={() => props.sendRequestFriend(props.token, friend._id)}/></View>}
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

export default UserSearch;
