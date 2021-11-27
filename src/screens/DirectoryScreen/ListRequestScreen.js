import React, {useState, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import api from '../../api/index';
import {connect} from 'react-redux';
import FriendRequestSingle from '../../components/Directory/FriendRequestSingle';

const ListRequestScreen = (props) => {
  const [listRequests, setListRequests] = useState([]);
  useEffect(() => {
    async function getListRequest() {
      try {
        const res = await api.get('friends/get-requested-friend/', 
        {
          headers: {authorization: `Bearer ${props.token}`},
        });
        setListRequests(res.data.data.friends);
      } catch (e) {
        console.error('cm', e.response);
      }
    }
    getListRequest();
  }, []);

  const updateListRequests = (list) => {
    setListRequests(list);
 }
 
  const renderItem = ({item}) => {
    return <FriendRequestSingle friend={item} key={item._id} token={props.token} update={updateListRequests} lists={listRequests}/>;
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
  };
};

const mapDispatchToProp = {};
export default connect(mapStateToProp, mapDispatchToProp)(ListRequestScreen);
