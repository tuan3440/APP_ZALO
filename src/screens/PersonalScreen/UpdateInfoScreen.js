import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Button,
  TextInput
} from 'react-native';
import api from '../../api/index';
import {connect} from 'react-redux';
import {URL_FILE} from '../../redux/constants/constants';
import { RadioButton } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useToast } from "react-native-toast-notifications";

const UpdateInfoScreen = props => {
  const user = props.route.params.user;
  console.log("user", user)
  const [username, setUsername] = useState(user?.username);
  const [gender, setGender] = useState(user?.gender);
  const [address, setAddress] = useState(user?.address);
  const [description, setDescription] = useState(user?.description);
  const toast = useToast();

  const updateInfomation = async (username, gender, address, description) => {
    try {
      const res = await api.post('users/edit/',{
        username, gender, address, description
      }, {
        headers: {authorization: `Bearer ${props.token}`},
      });
       props.navigation.navigate("Personal Setting");
       toast.show("Update infomation successfully", {
                      type: "normal",
                      placement: "top",
                      duration: 4000,
                      offset: 30,
                      animationType: "slide-in",
                    });
    } catch (e) {
      console.error('post', e);
    }
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.imageheader}>
          <Image
            style={{width: '100%', height: 200, position: 'relative'}}
            source={{
              uri: URL_FILE + user?.cover_image?.fileName,
            }}
          />
          <View style={styles.title}>
            <Image
              style={{width: 60, height: 60, borderRadius: 30}}
              source={{
                uri: URL_FILE + user?.avatar?.fileName,
              }}
            />
            <AntDesign name="camerao" size={30} color='white'/>
          </View>
        </View>
        <View>
          <View style={styles.field}>
            <Text style={styles.text_title}>Username</Text>
            <TextInput
            style={{borderBottomWidth : 1, width: '100%'}}
              value={username ? username : ""}
              onChangeText={username => setUsername(username)}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.text_title}>Gender</Text>
            <View>
            <RadioButton.Group onValueChange={value => setGender(value)} value={gender}>
              <RadioButton.Item label="Male" value="male" />
              <RadioButton.Item label="Female" value="female" />
              <RadioButton.Item label="Secret" value="secret" />
          </RadioButton.Group>
            </View>
          </View>
          <View style={styles.field}>
            <Text style={styles.text_title}>Address</Text>
            <TextInput
            style={{borderBottomWidth : 1, width: '100%'}}
              value={address ? address : ""}
              onChangeText={address => setAddress(address)}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.text_title}>Description</Text>
            <TextInput
            style={{borderBottomWidth : 1, width: '100%'}}
              value={description ? description : ""}
              onChangeText={description => setDescription(description)}
            />
          </View>
        </View>
        <View>
          <Button title="Update" onPress={() => updateInfomation(username, gender, address, description)}/>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    position: 'absolute',
    alignItems: 'center',
    top: 120,
    left: 20,
    flexDirection: 'row',
  },
  field: {
    flexDirection: 'row',
    paddingVertical: 15,
    alignItems: 'center'
  },
  text_title: {
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 10,
    marginRight: 50,
  },
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
export default connect(mapStateToProp, mapDispatchToProp)(UpdateInfoScreen);
