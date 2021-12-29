import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Button
} from 'react-native';
import Search from '../../components/Search';
import {connect} from 'react-redux';
import userReducer from '../../redux/reducers/user.reducer';
import {showUser} from '../../redux/actions/user.action';
import {URL_FILE} from '../../redux/constants/constants';
import {getListPost} from '../../redux/actions/post.action';
import PostSingle from '../../components/Diary/PostSingle';
import Modal from 'react-native-modal';
import {deletePost, likePost} from '../../redux/actions/post.action';

const MainScreen = props => {
  useEffect(() => {
    props.showUser(props.token);
  }, []);
  useEffect(() => {
    props.navigation.setOptions({
        title: "Diary"
      })
}, [])
  useEffect(() => {
    props.getListPost(props.token);
  }, []);
  const renderItem = ({item}) => {
    return <PostSingle post={item} key={item._id} deletePost={props.deletePost} likePost={props.likePost} token={props.token} navigation={props.navigation}/>;
  };
  return (
    <>
    <View>
      <View style={styles.create_post}>
        <Image
          style={{width: 45, height: 45, borderRadius: 25, marginLeft: 20}}
          source={{
            uri: URL_FILE + props.avatar,
          }}
        />
        <TouchableOpacity
          onPress={() => props.navigation.navigate('CreatePost')}>
          <Text style={{marginLeft: 30}}>How are you today?</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={props.posts}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  create_post: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderBottomColor: '#22aed1'
  },
});

const mapStateToProp = state => {
  return {
    avatar: state.user.avatar,
    token: state.auth.token,
    id: state.auth.id,
    posts: state.post.posts,
  };
};
const mapDispatchToProp = {
  showUser,
  getListPost,
  deletePost,
  likePost
};

export default connect(mapStateToProp, mapDispatchToProp)(MainScreen);
