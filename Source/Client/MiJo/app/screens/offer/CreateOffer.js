'use strict';

// imports
import React from 'react-native'
import GlobalStyle from './GlobalStyle'
import MaterialButton from 'MiJo/app/components/buttons/MaterialButton'
import NavBarStandard from 'MiJo/app/components/navbar/NavBarStandard'
import MK, {MKColor, MKTextField} from 'react-native-material-kit'
import LoginButton from 'MiJo/app/components/buttons/LoginButton'



// global vars
var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableHighlight,
} = React;


var ImagePickerManager = require('NativeModules').ImagePickerManager;

var options = {
  title: 'Select Avatar', // specify null or empty string to remove the title
  cancelButtonTitle: 'Cancel',
  takePhotoButtonTitle: 'Take Photo...', // specify null or empty string to remove this button
  chooseFromLibraryButtonTitle: 'Choose from Library...', // specify null or empty string to remove this button
  customButtons: {
    'Choose Photo from Facebook': 'fb', // [Button Text] : [String returned upon selection]
  },
  cameraType: 'back', // 'front' or 'back'
  mediaType: 'photo', // 'photo' or 'video'
  videoQuality: 'high', // 'low', 'medium', or 'high'
  durationLimit: 10, // video recording max time in seconds
  maxWidth: 100, // photos only
  maxHeight: 100, // photos only
  aspectX: 2, // android only - aspectX:aspectY, the cropping image's ratio of width to height
  aspectY: 1, // android only - aspectX:aspectY, the cropping image's ratio of width to height
  quality: 0.2, // 0 to 1, photos only
  angle: 0, // android only, photos only
  allowsEditing: false, // Built in functionality to resize/reposition the image after selection
  noData: false, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
  storageOptions: { // if this key is provided, the image will get saved in the documents directory on ios, and the pictures directory on android (rather than a temporary directory)
    skipBackup: true, // ios only - image will NOT be backed up to icloud
    path: 'images' // ios only - will save image at /Documents/images rather than the root
  }
};

class CreateOffer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView style={styles.scrollView}
          contentContainerStyle={styles.container}>
        <View style={styles.row}>
          <View style={styles.col}>
            <NavBarStandard title="Create new offer" onPress={() => this.props.navigator.pop()}/>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.buttonText} onPress={() => this._pickImage()}>Choose an Image</Text>
            <View style={styles.header}>
              <TouchableHighlight onPress={this._pickImage}>
                <Image style={styles.mark} source={require('./img/jobnig.jpg')} />
              </TouchableHighlight>
            </View>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.buttonText}>Job Title</Text>
            <MKTextField style={styles.textFieldTitle} placeholder="Enter a title for the job"/>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.buttonText}>Job Description</Text>
            <MKTextField style={styles.textFieldDescr} placeholder="Enter a description for the job"/>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.buttonText}>Deadline</Text>
            <MKTextField style={styles.textFieldTitle} placeholder="MM.DD.YYYY"/>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.buttonText}>Payment</Text>
            <MKTextField style={styles.textFieldLastOnPage} placeholder="e.g. 20$ per hour"/>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <LoginButton onPress={() => this._createNewOffer()} text="Create offer"/>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.buttonText}></Text>
          </View>
        </View>
      </ScrollView>
    );


  }

  _pickImage() {
    ImagePickerManager.showImagePicker(options, (response) => {
  console.log('Response = ', response);

  if (response.didCancel) {
    console.log('User cancelled image picker');
  }
  else if (response.error) {
    console.log('ImagePickerManager Error: ', response.error);
  }
  else if (response.customButton) {
    console.log('User tapped custom button: ', response.customButton);
  }
  else {
    // You can display the image using either data:
    // const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

    // uri (on iOS)
    const source = {uri: response.uri.replace('file://', ''), isStatic: true};
    // uri (on android)
    // const source = {uri: response.uri, isStatic: true};

    this.setState({
      avatarSource: source
    });
  }
});
  }

  _createNewOffer() {
    console.log('New offer created');

      this.props.navigator.pop();

  }

}

var styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: .5,
    backgroundColor: 'transparent'
  },
  innerContainer: {
    flexDirection: 'column',
    flex: 0.05,
    backgroundColor: 'transparent',
    marginTop: 5
  },
  buttonText: {
   fontSize: 14,
   fontWeight: 'bold',
   color: 'black',
   alignItems: 'center',
   margin: 15,
 },
 mark: {
   height: 150,
   width: 250,
 },
 textFieldTitle: {
   height: 20,
   paddingLeft: 15,
 },
 textFieldDescr: {
   height: 150,
   paddingLeft: 15,
 },
 textFieldLastOnPage: {
   height: 45,
   paddingLeft: 15,
   paddingBottom: 25,
 },
})

export default CreateOffer;
