import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet, Image} from 'react-native';
import api from '../../api/index';
import {connect} from 'react-redux';
import {URL_FILE} from '../../redux/constants/constants';
import {convertTime} from '../../redux/constants/constants';

const Comment = (props) => {
    const comment = props.comment;
    const [author, setAuthor] = useState(null); 
    useEffect(() => {
        async function getAuthor() {
          try {
            const res = await api.get('users/show/' + comment.user._id, {
              headers: {authorization: `Bearer ${props.token}`},
            })
            setAuthor(res.data.data);
          } catch (e) {
            console.error(e);
          }
        }
        getAuthor();
      }, []);

      const showTime = (time) => {
        if (time) {
           let d = new Date(time);
           let dateCurrent = new Date();
  
           let seconds = dateCurrent.getTime() - d.getTime();
           let result = convertTime(seconds/1000);
           return result;
        }
    }
    return (
        <View style={styles.container}>
          <Image source={{
              uri : URL_FILE + author?.avatar?.fileName
            }} style={{width : 40, height : 40, borderRadius : 20, marginRight:15}}/>
            <View>
                <Text>{comment.user.username}</Text>
                <Text>{showTime(comment.createdAt)}</Text>
                <Text>{comment.content}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
   container : {
      marginVertical:10,
      borderWidth : 1,
      borderColor : 'lightblue',
      paddingVertical : 5,
      flexDirection : 'row'
   }
})

const mapStateToProp = state => {
  return {
    token: state.auth.token,
    error: state.auth.error,
  };
};

const mapDispatchToProp =  {
  
}
export default connect(mapStateToProp, mapDispatchToProp)(Comment);