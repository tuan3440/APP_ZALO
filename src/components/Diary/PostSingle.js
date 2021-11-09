import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {URL_FILE} from '../../redux/constants/constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Modal from 'react-native-modal';

const PostSingle = props => {
  const {post, navigation} = props;
  // console.log("aa", post)
  const [isModalPost, setIsModalPost] = useState(false);
  const [isModalReport, setIsModalReport] = useState(false);
  const [isLike, setIsLike] = useState(post.isLike);
  const [detail, setDetail] = useState("");
  // const toggleModal = () => {
  //   setIsModalPost(!isModalPost);
  // };
  const showImage = post.images.length
    ? post.images.map((image, index) => {
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
      })
    : null;

  return (
    <TouchableOpacity onPress={() => navigation.navigate("Comment", {postId : post._id}) }>
      <View style={styles.container}>
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

          <Entypo
            name="dots-three-horizontal"
            size={30}
            onPress={() => setIsModalPost(!isModalPost)}
          />
        </View>
        <View style={styles.content}>
          <Text style={{color: 'black'}}>{post.described}</Text>
        </View>
        <View style={styles.media}>{showImage}</View>
        <View style={styles.action}>
          <AntDesign
            name="hearto"
            size={25}
            onPress={() => {
              setIsLike(!isLike);
              props.likePost(props.token, post._id);
            }}
            color={isLike ? 'red' : 'black'}
          />
          <Text style={{marginLeft: 5, marginRight: 20, fontSize: 16}}>
            {post.like.length}
          </Text>
          <FontAwesome name="commenting-o" size={25} />
          <Text style={{marginLeft: 5, fontSize: 15}}>
            {post.countComments}
          </Text>
        </View>
        <Modal
          isVisible={isModalPost}
          style={{margin: 0}}
          swipeDirection="down">
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              console.log('modal1');
              setIsModalPost(false);
            }}
            style={styles.modalContainer}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.modal}>
                <Text
                  style={{
                    fontSize: 15,
                    paddingVertical: 15,
                    borderBottomWidth: 1,
                    color: 'black',
                  }}
                  onPress={() => {
                    console.log('id', post._id);
                    props.deletePost(props.token, post._id);
                  }}>
                  Detele Post
                </Text>
                <Text
                onPress = {() => setIsModalReport(true)}
                  style={{fontSize: 15, paddingVertical: 15, color: 'black'}}>
                  Report post
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>
        <Modal
          isVisible={isModalReport}
          style={{margin: 0}}
          swipeDirection="down">
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              console.log('modal1');
              setIsModalReport(false);
              setIsModalPost(false);
            }}
            style={styles.modalContainer}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.modalreport}>
                  <TextInput style={{flex:1, paddingHorizontal: 10}} value={detail} onChangeText={(detail) => setDetail(detail)} placeholder="Type.."/>
                  <Button title="Send"/>
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>
      </View>
    </TouchableOpacity>
  );
};
const deviceWidth = Dimensions.get('window').width;

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
  modalContainer: {
    flex: 1,
  },
  modal: {
    width: deviceWidth,
    height: 100,
    backgroundColor: 'white',
    paddingBottom: 0,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  modalreport : {
    width: deviceWidth,
    height: 100,
    backgroundColor: 'white',
    paddingBottom: 0,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    flexDirection : 'row'
  }
});

export default PostSingle;
