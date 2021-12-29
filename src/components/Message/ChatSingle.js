import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {URL_FILE} from '../../redux/constants/constants';
import { useNavigation } from '@react-navigation/native';

const ChatSingle = (props) => {
    const {chatId, friend} = props;
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => {
             navigation.navigate("MessageS", {
                 chatId: chatId,
                 username: friend.username,
                 userId : friend._id
             })
        }}
            >
        <View style={styles.container}>
            <Image
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              marginHorizontal: 20,
            }}
            source={{
              uri: URL_FILE + friend.avatar.fileName,
            }}
          />
           <View style={{width: '100%'}}>
               <Text style={{fontSize: 17, fontWeight:'700', color:'black'}}>{friend.username}</Text>
           </View>
        </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container : {
        flexDirection: 'row',
        borderBottomWidth : 1,
        borderBottomColor: 'grey',
        alignItems: 'center',
        paddingVertical : 15
    }
})

export default ChatSingle;