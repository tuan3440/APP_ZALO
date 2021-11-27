import React, {useState, useEffect} from 'react';
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
import api from '../../api/index';
import { useToast } from "react-native-toast-notifications";
import {connect} from 'react-redux';
const PostSingle = props => {
  const toast = useToast();
  const {navigation} = props;
  const postid = props.post._id;
  console.log("www", postid)
  const [isModalPost, setIsModalPost] = useState(false);
  const [isModalReport, setIsModalReport] = useState(false);
  const [isModalReportDetail, setIsModalReportDetail] = useState(false);
  // const [isLike, setIsLike] = useState(post.isLike);
  const [detail, setDetail] = useState('');
  const [post, setPost] = useState(null);
  useEffect(() => {
    async function getPostCurrent(postid) {
      try {
        const res = await api.get('posts/show/' + postid, {
          headers: {authorization: `Bearer ${props.token}`},
        });
        console.log("xax", res.data.data)
        setPost(res.data.data);
      } catch (e) {
        console.error("post",e);
      }
    }
    getPostCurrent(postid);
  }, [props.posts]);
  const showImage = post?.images?.map?.((image, index) => {
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
  });

  const createReport = async (postid, subject, details) => {
    try {
      const res = await api.post(
        'postReport/create/' + postid,
        {
          subject: subject,
          details: details,
        },
        {
          headers: {authorization: `Bearer ${props.token}`},
        },
      );
    } catch (e) {
      console.error('cm111', e.response);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Comment', {postId: post._id})}>
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
              source={{uri: URL_FILE + post?.author?.avatar?.fileName}}
            />
            <View>
              <Text style={{fontSize: 15, color: 'black'}}>
                {post?.author?.username}
              </Text>
              <Text>{post?.updatedAt}</Text>
            </View>
          </View>

          <Entypo
            name="dots-three-horizontal"
            size={30}
            onPress={() => setIsModalPost(!isModalPost)}
          />
        </View>
        <View style={styles.content}>
          <Text style={{color: 'black'}}>{post?.described}</Text>
        </View>
        <View style={styles.media}>{showImage}</View>
        <View style={styles.action}>
          <AntDesign
            name="hearto"
            size={25}
            onPress={() => {
              // setIsLike(!isLike);
              props.likePost(props.token, post._id);
            }}
            color={post?.isLike ? 'red' : 'black'}
          />
          <Text style={{marginLeft: 5, marginRight: 20, fontSize: 16}}>
            {post?.like?.length}
          </Text>
          <FontAwesome name="commenting-o" size={25} />
          <Text style={{marginLeft: 5, fontSize: 15}}>
            {post?.countComments}
          </Text>
        </View>
        <Modal
          transparent={true}
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
                    toast.show("Delete post successfully", {
                      type: "normal",
                      placement: "top",
                      duration: 4000,
                      offset: 30,
                      animationType: "slide-in",
                    });
                  }}>
                  Detele Post
                </Text>
                <Text
                  onPress={() => {
                    setIsModalPost(false);
                    setIsModalReport(true);
                  }}
                  style={{fontSize: 15, paddingVertical: 15, color: 'black'}}>
                  Report post
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>
        <Modal
          transparent={true}
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
                <View style={{paddingVertical: 10}}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      borderBottomWidth: 1,
                    }}>
                    Reason
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    createReport(post._id, 'Sensitive content', '');
                    toast.show("Report post successfully", {
                      type: "normal",
                      placement: "top",
                      duration: 4000,
                      offset: 30,
                      animationType: "slide-in",
                    });
                    setIsModalReport(false);
                  }}>
                  <Text style={{fontSize: 18, paddingVertical: 10}}>
                    Sensitive content
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    createReport(post._id, 'Bother', '');
                    toast.show("Report post successfully", {
                      type: "normal",
                      placement: "top",
                      duration: 4000,
                      offset: 30,
                      animationType: "slide-in",
                    });
                    setIsModalReport(false);
                  }}>
                  <Text style={{fontSize: 18, paddingVertical: 10}}>
                    Bother
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    createReport(post._id, 'Unrelated', '');
                    toast.show("Report post successfully", {
                      type: "normal",
                      placement: "top",
                      duration: 4000,
                      offset: 30,
                      animationType: "slide-in",
                    });
                    setIsModalReport(false);
                  }}>
                  <Text style={{fontSize: 18, paddingVertical: 10}}>
                    Unrelated
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setIsModalReportDetail(true);
                    setIsModalReport(false);
                  }}>
                  <Text style={{fontSize: 18, paddingVertical: 10}}>
                    Other Reason
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>
        <Modal
          isVisible={isModalReportDetail}
          style={{margin: 0}}
          swipeDirection="down">
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              setIsModalReportDetail(false);
            }}
            style={styles.modalContainer}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.modalreportdetail}>
                <View style={{paddingVertical: 10}}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      borderBottomWidth: 1,
                    }}>
                    Other Reason
                  </Text>
                </View>
                <TextInput
                  style={{flex: 1, paddingHorizontal: 10}}
                  value={detail}
                  onChangeText={detail => setDetail(detail)}
                  placeholder="Type.."
                />
                <Button title="Send" onPress={() => {
                  createReport(post._id, "Other Reason", detail);
                  toast.show("Report post successfully", {
                    type: "normal",
                    placement: "top",
                    duration: 4000,
                    offset: 30,
                    animationType: "slide-in",
                  });
                  setIsModalReportDetail(false);
                }}/>
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
  modalreport: {
    width: '60%',
    height: 230,
    backgroundColor: 'white',
    paddingBottom: 0,
    alignItems: 'center',
    position: 'absolute',
    bottom: 300,
    left: 100,
  },
  modalreportdetail: {
    width: '100%',
    height: 150,
    backgroundColor: 'white',
    paddingBottom: 0,
    alignItems: 'center',
    position: 'absolute',
    bottom: 200
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
  
};

export default connect(mapStateToProp, mapDispatchToProp)(PostSingle);
