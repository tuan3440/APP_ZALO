import React, {useState, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import api from '../../api/index';
import {connect} from 'react-redux';
import FriendRequestSingle from '../../components/Directory/FriendRequestSingle';
import {getListRequest, acceptRequestFriend, removeRequestFriend} from '../../redux/actions/friend.action';

const ListRequestScreen = props => {
  const [listRequests, setListRequests] = useState([]);

  useEffect(() => {
    setListRequests(props.listRequest);
  }, [props.listRequest])
  

  const renderItem = ({item}) => {
    return (
      <FriendRequestSingle
        friend={item}
        key={item._id}
        token={props.token}
        acceptRequestFriend={props.acceptRequestFriend}
        removeRequestFriend={props.removeRequestFriend}
        lists={listRequests}
      />
    );
  };
  return (
    <View>
      <FlatList
        data={listRequests}
        keyExtractor={friend => friend._id}
        renderItem={renderItem}
      />
    </View>
  );
};

const mapStateToProp = state => {
  return {
    token: state.auth.token,
    error: state.auth.error,
    listRequest : state.friend.listRequest
  };
};

const mapDispatchToProp = {
  getListRequest, acceptRequestFriend, removeRequestFriend
};
export default connect(mapStateToProp, mapDispatchToProp)(ListRequestScreen);
