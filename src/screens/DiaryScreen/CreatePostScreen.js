import React, {useState, useLayoutEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  PermissionsAndroid,
  Image,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import {
  showImagePicker,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {createPost} from '../../redux/actions/post.action';
import {connect} from 'react-redux';
import RNFS from 'react-native-fs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const CreatePostScreen = props => {
  const [images, setImages] = useState(null);
  const [imagelist, setImagelist] = useState(null);
  const [description, setDescription] = useState('');
  const [videos, setVideos] = useState([]);

  const createFormData = (images, videos, description) => {
    console.log('image', images);
    const data = new FormData();
    if (images != null) {
      images.forEach(image => {
        data.append('images', {
          name: image.fileName,
          type: image.type,
          uri:
            Platform.OS === 'ios'
              ? image.uri.replace('file://', '')
              : image.uri,
          size: image.fileSize,
        });
      })
    }
    data.append('described', description);

    // // Object.keys(body).forEach(key => {
    // //   data.append(key, body[key]);
    // // });
    // console.log("data",data);
    return data;
  };
  const cameraLaunch = async () => {
    const grantedcamera = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'App Camera Permission',
        message: 'App needs access to your camera ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    const grantedstorage = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'App Camera Permission',
        message: 'App needs access to your camera ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (
      grantedcamera === PermissionsAndroid.RESULTS.GRANTED &&
      grantedstorage === PermissionsAndroid.RESULTS.GRANTED
    ) {
      let options = {
        storageOptions: {
          skipBackup: true,

          path: 'images',
        },
        base64: true,
      };

      launchCamera(options, res => {
        console.log('Response = ', res);
        if (res.didCancel) {
          console.log('User cancelled image picker');
        } else if (res.error) {
          console.log('ImagePicker Error: ', res.error);
        } else if (res.customButton) {
          console.log('User tapped custom button: ', res.customButton);

          alert(res.customButton);
        } else {
          const source = {uri: res.uri};

          console.log('response', res);
        }
      });
    }
  };

  const mageGalleryLaunch = async type => {
    const grantedcamera = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'App Camera Permission',
        message: 'App needs access to your camera ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    const grantedstorage = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'App Camera Permission',
        message: 'App needs access to your camera ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (
      grantedcamera === PermissionsAndroid.RESULTS.GRANTED &&
      grantedstorage === PermissionsAndroid.RESULTS.GRANTED
    ) {
      let options = {
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
      if (type == 'video') {
        options.mediaType = 'video';
      }
      // let options = {
      //   mediaType: 'video',
      //   storageOptions: {
      //     skipBackup: true,
      //     path: 'images',
      //   },
      // };

      launchImageLibrary(options, res => {
        if (res.didCancel) {
          console.log('User cancelled image picker');
        } else if (res.error) {
          console.log('ImagePicker Error: ', res.error);
        } else if (res.customButton) {
          console.log('User tapped custom button: ', res.customButton);

          alert(res.customButton);
        } else {
          // const source = {uri: res.uri};
          console.log('responsexxxx', res);
          // setPhotos(res.uri);
          // images.push(res.assets[0]);
          if (images) {
            setImages([...images, res.assets[0]]);
          } else {
            setImages([res.assets[0]]);
          }
          // console.log("image", images);
          // console.log('response', res.assets[0].uri);
        }
      });
    }
  };

  const removeImage = uri => {
    let newImage = images.filter(x => {
      return x.uri != uri;
    });
    setImages(newImage);
  };

  const showImage = images?.map?.((image, index) => {
    console.log("image", image)
    return (
      <View style={{width: 120}}>
        <Image
          source={{uri: image.uri}}
          style={{
            width: 100,
            height: 100,
            marginRight: 5,
            marginBottom: 10,
          }}
          key={index}
        />
        <MaterialIcons
          name="cancel"
          size={20}
          onPress={() => {
            removeImage(image.uri);
          }}
        />
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="write post"
        multiline={true}
        numberOfLines={10}
        value={description}
        onChangeText={description => setDescription(description)}
      />
      <View style={styles.image}>{showImage}</View>

      <View style={styles.insert}>
        <View style={styles.icon}>
          <Entypo
            name="image"
            size={36}
            style={styles.icon_image}
            onPress={() => mageGalleryLaunch('image')}
          />
          <AntDesign
            name="camera"
            size={36}
            onPress={() => cameraLaunch()}
            style={styles.icon_image}
          />
          <Feather
            name="youtube"
            size={40}
            onPress={() => mageGalleryLaunch('video')}
          />
        </View>
        <Text
          style={styles.post}
          onPress={() => {
            const data = createFormData(images, videos, description);
            // console.log("aa", data._parts);
            props.createPost(props.token, data);
            props.navigation.navigate('main');
          }}>
          Post
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 3,
    flexDirection: 'row',
  },
  input: {
    flex: 9,
    borderWidth: 1,
    textAlignVertical: 'top',
    fontSize: 15,
  },
  insert: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    flex: 1,
    flexDirection: 'row',
  },
  icon_image: {
    marginHorizontal: 15,
  },
  post: {
    color: 'blue',
    fontSize: 18,
    backgroundColor: 'lightblue',
    padding: 10,
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
  createPost,
};
export default connect(mapStateToProp, mapDispatchToProp)(CreatePostScreen);
