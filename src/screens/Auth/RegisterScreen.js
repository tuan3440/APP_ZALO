import React, {useState, useDispatch, useSelector, useEffect} from 'react';
import {connect} from 'react-redux';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { getUniqueId, getManufacturer } from 'react-native-device-info';
import {register} from '../../redux/actions/auth.action';

const RegisterScreen = (props) => {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  // useEffect(() => {
  //   if (props.token) {
  //     props.navigation.navigate('Zalo');
  //   }
  // }, [props.token]);


  return (
    <View style={styles.container}>
       {props.error ? <Text style={{color: 'red', alignSelf: 'center', paddingVertical: 10, fontSize: 16, backgroundColor: 'orange', width:'100%', textAlign:'center'}}>{props.error}</Text> : null}
      <View style={styles.form}>
        <View style={styles.input}>
          <Text>Enter Username</Text>
          <TextInput style={styles.text} value={username} onChangeText={username => setUsername(username)}/>
        </View>
        <View style={styles.input}>
          <Text>Enter Your phone</Text>
          <TextInput style={styles.text} value={phone} onChangeText={phone => setPhone(phone)}/>
        </View>
        <View style={styles.input}>
          <Text>Enter password</Text>
          <TextInput style={styles.text} value={password} secureTextEntry={true} onChangeText={pass => setPassword(pass)}/>
        </View>
      </View>
      <TouchableOpacity style={styles.register} onPress={() => {props.register(username, phone, password)}}>
        <Text style={styles.textregister}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form : {
      flex : 10,
      marginTop : 20
  },
  input: {
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  text: {
    borderBottomWidth: 1,
    borderColor: '#1a85b3',
  },
  register: {
    flex : 1,
    alignSelf: 'flex-end',
    marginRight: 20,
  },
  textregister: {
    borderWidth: 1,
    padding: 8,
    backgroundColor: '#1a85b3',
    color: 'white',
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
const mapDispatchToProp =  {
    register
}
export default connect(mapStateToProp, mapDispatchToProp)(RegisterScreen);

