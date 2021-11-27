import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, ScrollView, Button, TouchableOpacity} from 'react-native';
import api from '../../api/index';
import {connect} from 'react-redux';
import {URL_FILE} from '../../redux/constants/constants';

const PersonalScreen = props => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function getUserCurrent() {
      try {
        const res = await api.get('users/show/', {
          headers: {authorization: `Bearer ${props.token}`},
        });
        console.log('xax', res.data.data);
        setUser(res.data.data);
      } catch (e) {
        console.error('post', e);
      }
    }
    getUserCurrent();
  }, []);
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => {
            props.navigation.navigate("infoPersonal", {
                user : user
            })
        }}>
        <View style={styles.profile}
        >
        <Image
            style={{width: 40, height: 40, borderRadius: 20, marginHorizontal: 20}}
            source={{
              uri: URL_FILE + user?.avatar?.fileName,
            }}
          />
          <View>
              <Text>{user?.username}</Text>
              <Text>View my profile</Text>
          </View>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
            props.navigation.navigate("Update", {
                user : user
            })
        }}>
        <View style={styles.option}>
            <Text style={{marginLeft : 20, flex: 1, fontSize: 20}}>Update infomation</Text>
            <Text style={{fontSize: 20, marginRight: 15}}>{'>'}</Text>
        </View>
        </TouchableOpacity>
        <View style={styles.option}>
            <Text style={{marginLeft : 20, flex: 1, fontSize: 20}}>Change password</Text>
            <Text style={{fontSize: 20, marginRight: 15}}>{'>'}</Text>
        </View>
        <View style={styles.option}>
            <Text style={{marginLeft : 20, flex: 1, fontSize: 20, color: 'red'}}>Log out</Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
 container : {},
 profile: {
     flexDirection: 'row',
     paddingVertical: 15,
     borderBottomWidth: 10,
     borderBottomColor: 'grey'
 },
 option : {
     flexDirection: 'row',
     paddingVertical : 20,
     borderBottomColor : 'grey',
     borderBottomWidth : 1
 }
});

const mapStateToProp = state => {
  return {
    // phonenumber: state.user.phonenumber,
    // password: state.user.password,
    // username: state.user.username,
    token: state.auth.token,
    error: state.auth.error,
  };
};

const mapDispatchToProp = {};
export default connect(mapStateToProp, mapDispatchToProp)(PersonalScreen);