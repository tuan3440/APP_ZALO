import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import api from '../../api/index';
import {connect} from 'react-redux';
import Search from '../../components/Search';
import AntDesign from 'react-native-vector-icons/AntDesign';
import UserSearch from '../../components/Directory/UserSearch';
import {getListFriend, getListRequest, getListRequested, sendRequestFriend} from '../../redux/actions/friend.action';

const SearchScreen = props => {
  const [result, setResult] = useState(null);

  useEffect(() => {
    async function fetchData() {
      await props.getListFriend(props.token);
      await props.getListRequest(props.token);
      await props.getListRequested(props.token);
    }
    fetchData();

    return () => {
      console.log("This will be logged on unmount");
    }
  }, [])
  const search = async key => {
    try {
      const res = await api.post(
        'users/search',
        {
          keyword: key,
        },
        {
          headers: {authorization: `Bearer ${props.token}`},
        },
      );
      let result = res.data.data.filter(user => {
        return user._id != props.id
      })
      setResult(result);
      // console.log("id", props.id)
      // setTimeout(() => {
      //   console.log("rsr", result);
      // }, 1000)
      
    } catch (e) {
      console.error('cm111', e.response);
    }
  };


  const renderItem = ({item}) => {
    return <UserSearch user={item} token={props.token}  friendlist={props.listFriend} friendrequest={props.listRequest} friendrequested={props.listRequested} sendRequestFriend={props.sendRequestFriend}/>;
  };

  return (
    <View>
      <View style={styles.container}>
        <AntDesign name="search1" size={20} style={styles.icon} />
        <TextInput
          placeholder="Tìm bạn bè"
          style={styles.input}
          onChange={e => {
            const key = e.nativeEvent.text;
            search(key);
          }}
        />
      </View>
      <View>
        <FlatList
          data={result}
          keyExtractor={friend => friend._id}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: '#22aed1',
  },
  icon: {
    marginVertical: 13,
    marginHorizontal: 10,
  },
  input: {
    flex: 1,
  },
});

const mapStateToProp = state => {
  return {
    id : state.auth.id,
    token: state.auth.token,
    error: state.auth.error,
    listFriend : state.friend.listFriend,
    listRequest : state.friend.listRequest,
    listRequested : state.friend.listRequested,
  };
};

const mapDispatchToProp = {
  getListFriend, getListRequest, getListRequested, sendRequestFriend
};
export default connect(mapStateToProp, mapDispatchToProp)(SearchScreen);
