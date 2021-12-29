import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, ScrollView} from 'react-native';
import api from '../../api/index';
import {connect} from 'react-redux';
import {URL_FILE} from '../../redux/constants/constants';
import Search from '../../components/Search';
import ChatSingle from '../../components/Message/ChatSingle';
import { useIsFocused } from '@react-navigation/native';

const ListChatScreen = (props) => {
  const isFocused = useIsFocused();
  const [chats, setChats] = useState(null);

  const passScreen = (chatId, username) => {
    console.log("xx", props.navigation);
    props.navigation.natigate("MessageS");
  }
  const renderItem = ({ item }) =>{
    let friend = null;
    if (item.member[0]._id == props.id) {
       friend = item.member[1];
    } else {
      friend = item.member[0];
    }
    return (
    <ChatSingle chatId={item?._id} friend={friend} passScreen={passScreen}/>
  );} 


    useEffect(() => {
      async function getListChat() {
        try {
          const res = await api.get('chats/getListChat', {
            headers: {authorization: `Bearer ${props.token}`},
          });
          setChats(res.data.data);
        } catch (e) {
          console.error('post', e);
        }
      }
      if (isFocused) {
      getListChat();
      }
    }, [isFocused]);

  
  

  return (
    <View>
            {chats && <FlatList 
                 data={chats}
                 renderItem={renderItem}
                 keyExtractor={item => item?._id}
            />}
    </View>
  );
};

const mapStateToProp = state => {
  return {
    // phonenumber: state.user.phonenumber,
    // password: state.user.password,
    // username: state.user.username,
    id: state.auth.id,
    token: state.auth.token,
    error: state.auth.error,
  };
};

const mapDispatchToProp = {};
export default connect(mapStateToProp, mapDispatchToProp)(ListChatScreen);
