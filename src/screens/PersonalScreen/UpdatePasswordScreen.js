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
import {changeToken} from "../../redux/actions/auth.action";

const UpdatePasswordScreen = props => {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [error, setError] = useState(null);
  const toast = useToast();
  const updatePassword = async (oldPass, newPass) => {
    try {
      await api.post('users/change-password/',{
        currentPassword : oldPass,
            newPassword : newPass,
      }, {
        headers: {authorization: `Bearer ${props.token}`},
      }).then(res => {
        props.changeToken(res.data.token);
        props.navigation.navigate("Personal Setting");
        toast.show("Update Password successfully", {
                       type: "normal",
                       placement: "top",
                       duration: 4000,
                       offset: 30,
                       animationType: "slide-in",
                     });
      }).catch(err => {
        setError(err.response.data.message)
      });
    } catch (e) {
      console.error('post', e);
    }
  }
  return (
    <View style={styles.container}>
         {error && <Text style={{width: '100%',paddingVertical: 20, backgroundColor: 'yellow', textAlign: 'center', fontSize: 17}}>{error}</Text>}
         <View style={{marginBottom : 30, marginTop : 60}}>
             <Text style={styles.title}>Enter your old password</Text>
             <TextInput style={styles.input} secureTextEntry={true} onChangeText={oldPass => setOldPass(oldPass)}/>
         </View>
         <View style={{marginBottom : 60}}>
             <Text style={styles.title}>Enter your new password</Text>
             <TextInput style={styles.input} secureTextEntry={true} onChangeText={newPass => setNewPass(newPass)}/>
         </View>
         <Button title="Change password" onPress={() => {
             updatePassword(oldPass, newPass)
         }}/>
    </View>
  );
};

const styles = StyleSheet.create({
   container : {
       alignItems: 'center'
   },
   title : {
       fontSize : 20,
       fontWeight : '700'
   },
   input : {
       borderBottomWidth : 1,
       
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

const mapDispatchToProp = {
    changeToken
};
export default connect(mapStateToProp, mapDispatchToProp)(UpdatePasswordScreen);
