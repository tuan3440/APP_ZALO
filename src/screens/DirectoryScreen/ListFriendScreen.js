import React, {useState, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import api from '../../api/index';
import {connect} from 'react-redux';
import FriendSingle from '../../components/Directory/FriendSingle';
import {getListFriend, removeFriend} from '../../redux/actions/friend.action';

const ListFriendScreen = (props) => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    // await props.getListFriend(props.token);
    setLists(props.listFriend);
  }, [props.listFriend])


  // const updateListFriend = (list) => {
  //    setLists(list);
  // }
  const renderItem = ({item}) => {
    return <FriendSingle friend={item} key={item._id} token={props.token} removeFriend={props.removeFriend} lists={lists}/>;
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
    listFriend : state.friend.listFriend
  };
};

const mapDispatchToProp = {
  getListFriend,
  removeFriend
};
export default connect(mapStateToProp, mapDispatchToProp)(ListFriendScreen);
