import React, {useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';
import {removeError} from '../../redux/actions/auth.action';
import { useIsFocused } from '@react-navigation/native';

const HomeScreen = (props) => {
  // useEffect(() => {
  //   if (props.token) {
  //     props.navigation.navigate('Zalo');
  //   }
  // }, [props.token]);

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) props.removeError();
  }, [isFocused]);


  return (
    <View style={styles.container}>
      <View style={styles.img}>
        <Image source={require('../../static/zalo.png')} />
      </View>
      <View style={styles.button}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Login')}
          style={styles.btnLogin}>
          <Text style={[styles.text, {
             color : 'white'
          }]}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Register')}
          style={styles.btnReg}>
          <Text style={[styles.text, {
            color : 'black'
          }]}>REGISTER</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.textCopy}>copyright : Team 17</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container : {
    alignItems :'center',
    justifyContent: 'space-between',
    flex : 1
  },
  button: {
    width : '100%'
    // marginTop: 50,
    // marginHorizontal: 90,
  },
  btnLogin: {
    borderRadius: 20,
    backgroundColor: '#50A7C7',
    marginHorizontal : 120,
    alignItems : 'center',
    marginBottom : 20
  },
  btnReg: {
    borderRadius: 20,
    backgroundColor: '#D8DDE6',
    marginHorizontal : 120,
    alignItems : 'center'
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    marginVertical : 10
  },
  textCopy : {
    fontSize : 20,
    backgroundColor : 'orange',
    paddingVertical : 10,
    width : '100%',
    textAlign : 'center'
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

const mapDispatchToProp =  {
  removeError
}
export default connect(mapStateToProp, mapDispatchToProp)(HomeScreen);
