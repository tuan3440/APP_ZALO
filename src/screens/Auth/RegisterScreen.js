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
import {useToast} from 'react-native-toast-notifications';

const RegisterScreen = (props) => {
  const toast = useToast();
  const [username, setUsername] = useState(null);
  const [phone, setPhone] = useState(null);
  const [password, setPassword] = useState(null);
  const [errPhone, setErrPhone] = useState(false);
  const [errPass, setErrPass] = useState(false);
  
  const validatePhone = (phone) => {
    if (phone.length <9 || phone.length >11) {
      setErrPhone("Phone is invalide");
      setPhone(phone);
    } else {
      setErrPhone(false);
      setPhone(phone);
    }
  }

  const validatePass = (pass) => {
    if(pass.length < 6) {
      setErrPass("Password should be min 6 char");
      setPassword(pass);
    } else {
      setErrPass(false);
      setPassword(pass);
    }
  }

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
          <TextInput keyboardType="numeric" style={styles.text} value={phone} onChangeText={phone => validatePhone(phone)}/>
          {errPhone && <Text style={{color: 'red'}}>{errPhone}</Text>}
        </View>
        <View style={styles.input}>
          <Text>Enter password</Text>
          <TextInput style={styles.text} value={password} secureTextEntry={true} onChangeText={pass => validatePass(pass)}/>
          {errPass && <Text style={{color: 'red'}}>{errPass}</Text>}
        </View>
      </View>
      <TouchableOpacity style={styles.register} onPress={() => {
        if (!errPhone && !errPass && username && phone && password) {
          props.register(username, phone, password)
          toast.show('Resgister successfully', {
            type: 'normal',
            placement: 'top',
            duration: 4000,
            offset: 30,
            animationType: 'slide-in',
          });
        }
        }}>
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

