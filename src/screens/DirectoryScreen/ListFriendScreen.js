import React, {useState, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import api from '../../api/index';
import {connect} from 'react-redux';
import FriendSingle from '../../components/Directory/FriendSingle';
import { useIsFocused } from '@react-navigation/native';

const ListFriendScreen = (props) => {
  const [lists, setLists] = useState([]);
  const isFocused = useIsFocused();

  async function getListFriend() {
    try {
      const res = await api.get('friends/list/',
      {
        headers: {authorization: `Bearer ${props.token}`},
      });
      setLists(res.data.data.friends);
    } catch (e) {
      console.error('cm111', e.response);
    }
  }

  if (isFocused) {
    getListFriend();
  }

  const updateListFriend = (list) => {
     setLists(list);
  }
  const renderItem = ({item}) => {
    return <FriendSingle friend={item} key={item._id} token={props.token} update={updateListFriend} lists={lists}/>;
  };
  return (
    <View>
      <FlatList
      data={lists}
      keyExtractor={friend => friend._id}
      renderItem={renderItem} />
    </View>
  );
};

const mapStateToProp = state => {
  return {
    token: state.auth.token,
    error: state.auth.error,
  };
};

const mapDispatchToProp = {};
export default connect(mapStateToProp, mapDispatchToProp)(ListFriendScreen);
