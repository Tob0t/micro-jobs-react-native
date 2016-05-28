'use strict';

// imports
import React from 'react-native'
import MK, {MKProgress, MKTextField} from 'react-native-material-kit'
import NavBarStandard from 'MiJo/app/components/navbar/NavBarStandard'
import ClientApi from 'MiJo/app/ClientApi'
import SettingsList from 'react-native-settings-list'
import Prompt from 'react-native-prompt'

var ImagePickerManager = require('NativeModules').ImagePickerManager;
var imageTemplate = 'data:image/png;base64,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';
// global vars
var {
  Alert,
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Image,
  ScrollView,
} = React;


class UserSettingsScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        image: imageTemplate,
        prename: '',
        surname: '',
        age: '',
        mail: '',
        phone: '',
        switchValue: false,
        promptVisible: false,
        promptTitle: '',
        promptValue:'',
    };
    this._pickImage = this._pickImage.bind(this);
  }

  componentDidMount(){
    this._getUserProfile();
  }

  _getUserProfile(){
    ClientApi().getUserProfile().then(
      (user) => {
        console.log('Successfully got the user: ', user);
        // Initiate new rendering
        this.setState({
          image: user.image,
          prename: user.prename,
          surname: user.surname,
          age: user.age,
          mail: user.contactInformation.mail,
          phone: user.phone,
          loaded: true,
        });
      },(error) => {
        debugger
        console.error("Error:", error.error_description);
        Alert.alert(
          'Error',
          error.error_description);
      });
  }

  _pickImage() {
    //var that = this;
    var options = {
      title: 'Select Profile Picture', // specify null or empty string to remove the title
      cancelButtonTitle: 'Cancel',
      takePhotoButtonTitle: 'Take Photo...', // specify null or empty string to remove this button
      chooseFromLibraryButtonTitle: 'Choose from Library...', // specify null or empty string to remove this button
      cameraType: 'back', // 'front' or 'back'
      mediaType: 'photo', // 'photo' or 'video'
      videoQuality: 'high', // 'low', 'medium', or 'high'
      durationLimit: 10, // video recording max time in seconds
      maxWidth: 500, // photos only
      maxHeight: 500, // photos only
      aspectX: 2, // android only - aspectX:aspectY, the cropping image's ratio of width to height
      aspectY: 1, // android only - aspectX:aspectY, the cropping image's ratio of width to height
      quality: 0.5, // 0 to 1, photos only
      angle: 0, // android only, photos only
      allowsEditing: true, // Built in functionality to resize/reposition the image after selection
      noData: false, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
      storageOptions: { // if this key is provided, the image will get saved in the documents directory on ios, and the pictures directory on android (rather than a temporary directory)
        skipBackup: true, // ios only - image will NOT be backed up to icloud
        path: 'images' // ios only - will save image at /Documents/images rather than the root
      }
    };

    ImagePickerManager.showImagePicker(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.error) {
            console.log('ImagePickerManager Error: ', response.error);
        } else {
            // You can display the image using either data:
            const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
            this.setState({
                promptKey: 'image'
            });
            this._updateValue(source.uri);
        }
    });
  }

  render() {
    var that = this;
    return (
      <View>
        <NavBarStandard title="Settings" onPressLeft={() => this.props.navigator.pop()}/>
        <View style={styles.container}>
          <TouchableHighlight onPress={this._pickImage}>
            <Image style={styles.thumbnail} source={{uri: this.state.image}}/>
          </TouchableHighlight>
           <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
             <SettingsList.Header headerText='Account Settings' headerStyle={{color:'black'}}/>
             <SettingsList.Item
               title='Prename'
               hasNavArrow={false}
               titleInfo={this.state.prename}
               titleStyle={{fontSize:16}}
               onPress={() => this.setState({
                 promptVisible: true,
                 promptTitle: 'Your Prename',
                 promptValue: this.state.prename,
                 promptKey: 'prename'
               })}
             />
             <SettingsList.Item
               title='Surname'
               hasNavArrow={false}
               titleInfo={this.state.surname}
               titleStyle={{fontSize:16}}
               onPress={() => this.setState({
                 promptVisible: true,
                 promptTitle: 'Your Surname',
                 promptValue: this.state.surname,
                 promptKey: 'surname'
               })}
             />
             <SettingsList.Item
               title='Age'
               hasNavArrow={false}
               titleInfo={String(this.state.age)}
               titleStyle={{fontSize:16}}
               onPress={() => this.setState({
                 promptVisible: true,
                 promptTitle: 'Your Age',
                 promptValue: this.state.age,
                 promptKey: 'age'
               })}
             />
           <SettingsList.Header headerText='Contact Information' headerStyle={{color:'black'}}/>
             <SettingsList.Item
               title='E-Mail'
               hasNavArrow={false}
               titleInfo={this.state.mail}
               titleStyle={{fontSize:16}}
               onPress={() => this.setState({
                 promptVisible: true,
                 promptTitle: 'Your E-Mail',
                 promptValue: this.state.mail,
                 promptKey: 'mail'
               })}
             />
             <SettingsList.Item
               title='Phone Number'
               hasNavArrow={false}
               titleInfo={this.state.phone}
               titleStyle={{fontSize:16}}
               onPress={() => this.setState({
                 promptVisible: true,
                 promptTitle: 'Your Phone number',
                 promptValue: this.state.phone,
                 promptKey: 'phone'
               })}
             />
          </SettingsList>
         </View>
         <Prompt
            title={this.state.promptTitle}
            placeholder={this.state.promptTitle}
            defaultValue={String(this.state.promptValue)}
            visible={this.state.promptVisible}
            onCancel={() => this.setState({ promptVisible: false})}
            onSubmit={(value) => this._updateValue(value)}/>
       </View>
    );


  }
  _updateValue(value){
    var promptKey = this.state.promptKey;
    this.setState({
      promptVisible: false,
      [promptKey]: value
    });


      var userProfile ={
        'image': this.state.image,
        'prename': this.state.prename,
        'surname': this.state.surname,
        'age': Number(this.state.age),
        'contactInformation': {
          'mail': this.state.mail,
          'phone': this.state.phone,
        }
      }
      console.log("Send user to Api: ", userProfile);

      ClientApi().updateUserProfile(userProfile).then(
        ()=> {
          console.log("User updated succesfully!");
        },(error) => {
          debugger
          console.error("Error:", error);
          Alert.alert(
            'Error',
            error.message);
      });
  }
}

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    marginTop: 10,
    backgroundColor: 'white'
  },
  thumbnail: {
      alignSelf: 'center',
      width: 100,
      height: 100,
      borderRadius: 50,
  },
})

export default UserSettingsScene;
