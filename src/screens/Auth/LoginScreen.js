import React, {useState, useDispatch, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {login} from '../../redux/actions/auth.action';

const LoginScreen = props => {
  const [phonenumber, setPhonenumber] = useState('');
  const [password, setPassword] = useState('');
  // useEffect(() => {
  //   if (props.token) {
  //     props.navigation.navigate('Zalo');
  //   }
  // }, [props.token]);
  return (
    <View style={styles.container}>
      {props.error ? (
        <Text
          style={{
            color: 'red',
            alignSelf: 'center',
            paddingVertical: 10,
            fontSize: 16,
            backgroundColor: 'orange',
            width: '100%',
            textAlign: 'center',
          }}>
          {props.error}
        </Text>
      ) : null}
      <Text style={styles.text}>Please enter phone and number to log in</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.textinput}
          placeholder="phone"
          value={phonenumber}
          onChangeText={phonenumber => setPhonenumber(phonenumber)}
        />
        <TextInput
          style={styles.textinput}
          placeholder="password"
          secureTextEntry={true}
          value={password}
          onChangeText={password => setPassword(password)}
        />
      </View>
      <TouchableOpacity
        style={styles.login}
        onPress={() => {
          props.login(phonenumber, password);
        }}>
        <Text style={styles.textLogin}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  text: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    width: '100%',
    textAlign: 'center',
    backgroundColor: '#1a85b3',
    color: 'white',
    fontSize: 17,
    flex: 1,
  },
  form: {
    width: '100%',
    flex: 12,
  },
  textinput: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    width: '80%',
    marginHorizontal: '10%',
  },
  login: {
    flex: 1,
    alignSelf: 'flex-end',
    marginRight: 20,
  },
  textLogin: {
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

const mapDispatchToProp = {
  login,
};
export default connect(mapStateToProp, mapDispatchToProp)(LoginScreen);
