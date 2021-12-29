import React, {useEffect, useState, useRef} from 'react';
import {View, Text, TextInput, StyleSheet, FlatList, ScrollView} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import api from '../../api/index';
import {connect} from 'react-redux';
import MessageSingle from '../../components/Message/MessageSingle';
import socketIOClient from "socket.io-client";
import {baseURL} from '../../redux/constants/constants';

const MessageScreen = (props) => {
    const [messages, setMessages] = useState(null);
    useEffect(() => {
        props.navigation.setOptions({
            title: props.route.params.username
          })
    }, [])
    const chatId = props.route.params.chatId;
    const userId = props.route.params.userId;
    const blocked = props.blocked_inbox.includes(userId);
    useEffect(() => {
        async function getMessage(chatId) {
            try {
              const res = await api.get('chats/getMessages/' + chatId, {
                headers: {authorization: `Bearer ${props.token}`},
              });
              setMessages(res.data.data);
            } catch (e) {
              console.error("post",e);
            }
          }
          getMessage(chatId);
    }, []);
    
    const renderItem = ({ item }) => (
      <MessageSingle message={item}/>
    );

    const [content, setContent] = useState("");
    const socketRef = useRef();

    const sendMessage = (content) => {
      let data = {
        content : content,
        chatId : chatId,
        user : props.id
      }
      socketRef.current.emit('chatmessage', data)
    }

    // useEffect(() => {
    //     socketRef.current = socketIOClient.connect("http://192.168.122.1:3000")
    // }, []);

    useEffect(() => {
      socketRef.current = socketIOClient.connect("http://192.168.122.1:3000")
    
      // socketRef.current.on('getId', data => {
      //   setId(data)
      // }) // phần này đơn giản để gán id cho mỗi phiên kết nối vào page. Mục đích chính là để phân biệt đoạn nào là của mình đang chat.
  
      socketRef.current.on('message', dataGot => {
        setMessages(messages => [...messages, dataGot])
      }) // mỗi khi có tin nhắn thì mess sẽ được render thêm 
  
      return () => {
        socketRef.current.disconnect();
      };
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.content}>
            <FlatList 
                 data={messages}
                 renderItem={renderItem}
                 keyExtractor={item => item._id}
            />
            </View>
            <View style={styles.create}>
                <TextInput style={{flex: 1}} placeholder={blocked ? "You are blocked or blocked" : "Message"} onChangeText={value => setContent(value)} value={content} 
                editable={blocked ? false : true}
                />
                <Feather name="mic" size={30} style={{marginHorizontal: 15}}/>
                <FontAwesome name="photo" size={30} style={{marginHorizontal: 15}}/>
                <FontAwesome name="send-o" size={30} style={{marginHorizontal: 15}} onPress={() => {
                    sendMessage(content);
                    setContent("");
                }}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flexDirection: 'column',
        height : '100%'
    },
    content : {
        backgroundColor : '#e3f1f2',
        flex: 1
    },
    create : {
        flexDirection: 'row',
        borderWidth : 1,
        borderColor : 'grey',
        alignItems : 'center'
    }
})

const mapStateToProp = state => {
    return {
      token: state.auth.token,
      id : state.auth.id,
      blocked_inbox : state.auth.blocked_inbox
    };
  };
  const mapDispatchToProp = {
    
  };
  
export default connect(mapStateToProp, mapDispatchToProp)(MessageScreen);
