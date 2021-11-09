import React, {useState, useLayoutEffect, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
} from 'react-native';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {URL_FILE} from '../../redux/constants/constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import {connect} from 'react-redux';
import Comment from '../../components/Diary/Comment';
import api from '../../api/index';

const CommentScreen = props => {
  const postid = props.route.params.postId;
  // const postCurrent = props.posts.filter(post => post._id == postid);
  // const post = postCurrent[0];
  const [post, setPost] = useState({});
  useEffect(async () => {
    async function getPostCurrent(postid) {
      try {
        const res = await api.get('posts/show/' + postid, {
          headers: {authorization: `Bearer ${props.token}`},
        });
        setPost(res.data.data);
      } catch (e) {
        console.error("post",e);
      }
    }
    await getPostCurrent(postid);
  }, []);
  const showImage = post ? post.images.map((image, index) => {
    return (
      <Image
        source={{uri: URL_FILE + image.fileName}}
        style={{
          width: '100%',
          height: 200,
          resizeMode: 'stretch',
          marginRight: 5,
          marginBottom: 10,
        }}
        key={index}
      />
    );
  }) : null;
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  useEffect(() => {
    async function getCommentList() {
      try {
        const res = await api.get('postComment/list/' + postid, {
          headers: {authorization: `Bearer ${props.token}`},
        });
        setComments(res.data.data);
      } catch (e) {
        console.error("cm",e);
      }
    }
    getCommentList();
  }, []);

  const postComment = async (token, comment, id) => {
    try {
      const res = await api.post(
        'postComment/create/' + id,
        {
          content: comment,
        },
        {
          headers: {authorization: `Bearer ${token}`},
        },
      );
      setComments(comments => [...comments, res.data.data]);
    } catch (e) {
      console.error(e);
    }
  };

  const showComment =
    comments.length > 0
      ? comments.map(comment => {
          return <Comment comment={comment} key={comment._id} />;
        })
      : null;
  return (
    <ScrollView>
      {
        post && <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.left}>
            <Image
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                marginTop: 5,
                marginRight: 5,
              }}
              source={{uri: URL_FILE + post.author.avatar.fileName}}
            />
            <View>
              <Text style={{fontSize: 15, color: 'black'}}>
                {post.author.username}
              </Text>
              <Text>{post.updatedAt}</Text>
            </View>
          </View>
        </View>
        <View style={styles.content}>
          <Text style={{color: 'black'}}>{post.described}</Text>
        </View>
        {/* <View style={styles.media}>{showImage}</View> */}
        <View style={styles.action}>
          <AntDesign
            name="hearto"
            size={25}
            onPress={() => {
              props.likePost(props.token, post._id);
            }}
            color={post.isLike ? 'red' : 'black'}
          />
          <Text style={{marginLeft: 5, marginRight: 20, fontSize: 16}}>
            {post.like.length}
          </Text>
          <FontAwesome name="commenting-o" size={25} />
          <Text style={{marginLeft: 5, fontSize: 15}}>
            {post.countComments}
          </Text>
        </View>
        <View>
          {showComment}
          <View style={styles.inputcomment}>
            <TextInput
              placeholder="write comment"
              style={{flex: 1}}
              value={comment}
              onChangeText={comment => {
                setComment(comment);
              }}
            />
            <Feather
              name="send"
              size={30}
              style={{marginTop: 10}}
              onPress={() => {
                postComment(props.token, comment, post._id);
                setComment('');
              }}
            />
          </View>
        </View>
      </View>
      }
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 2,
    borderBottomColor: '#22aed1',
    marginBottom: 15,
    paddingVertical: 0,
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  left: {
    flexDirection: 'row',
    flex: 1,
  },
  content: {
    paddingHorizontal: 10,
  },
  media: {},
  action: {
    flexDirection: 'row',
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: 'lightblue',
  },
  inputcomment: {
    flexDirection: 'row',
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
const mapDispatchToProp = {};

export default connect(mapStateToProp, mapDispatchToProp)(CommentScreen);
