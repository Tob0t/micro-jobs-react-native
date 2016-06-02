'use strict';

// imports
import React from 'react-native'
import MK, {MKProgress, MKTextField} from 'react-native-material-kit'
import NavBarStandard from 'MiJo/app/components/navbar/NavBarStandard'
import ClientApi from 'MiJo/app/ClientApi'
import SettingsList from 'react-native-settings-list'
import Prompt from 'react-native-prompt'
import SettingsManager from 'MiJo/app/util/settings/SettingsManager'

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


class GeneralSettingsScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        maxDistance: SettingsManager().getRequests().maxDistance,
        category: SettingsManager().getRequests().category,
        type: SettingsManager().getRequests().type,
        minimumAge: SettingsManager().getOffers().minimumAge,
        maximumAge: SettingsManager().getOffers().maximumAge,
        promptVisible: false,
        promptTitle: '',
        promptValue:'',
    };
  }

  componentDidMount(){
  }

  render() {
    var that = this;
    return (
      <View>
        <NavBarStandard title="Settings" onPressLeft={() => this.props.navigator.pop()}/>
        <View style={styles.container}>
           <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
             <SettingsList.Header headerText='Request Settings' headerStyle={{color:'black'}}/>
             <SettingsList.Item
               title='Maximal Distance'
               hasNavArrow={false}
               titleInfo={String(this.state.maxDistance)}
               titleStyle={{fontSize:16}}
               onPress={() => this.setState({
                 promptVisible: true,
                 promptTitle: 'Maximal Distance',
                 promptValue: this.state.maxDistance,
                 promptKey: 'maxDistance'
               })}
             />
             <SettingsList.Item
               title='Category'
               hasNavArrow={false}
               titleInfo={this.state.category}
               titleStyle={{fontSize:16}}
               onPress={() => this.setState({
                 promptVisible: true,
                 promptTitle: 'Category',
                 promptValue: this.state.category,
                 promptKey: 'category'
               })}
             />
             <SettingsList.Item
               title='Type'
               hasNavArrow={false}
               titleInfo={this.state.type}
               titleStyle={{fontSize:16}}
               onPress={() => this.setState({
                 promptVisible: true,
                 promptTitle: 'Type',
                 promptValue: this.state.type,
                 promptKey: 'type'
               })}
             />
           <SettingsList.Header headerText='Offer Settings' headerStyle={{color:'black'}}/>
             <SettingsList.Item
               title='Minimum Age'
               hasNavArrow={false}
               titleInfo={String(this.state.minimumAge)}
               titleStyle={{fontSize:16}}
               onPress={() => this.setState({
                 promptVisible: true,
                 promptTitle: 'Minimum Distance',
                 promptValue: this.state.minimumAge,
                 promptKey: 'minimumAge'
               })}
             />
             <SettingsList.Item
               title='Maximum Age'
               hasNavArrow={false}
               titleInfo={String(this.state.maximumAge)}
               titleStyle={{fontSize:16}}
               onPress={() => this.setState({
                 promptVisible: true,
                 promptTitle: 'Maximum Age',
                 promptValue: this.state.maximumAge,
                 promptKey: 'maximumAge'
               })}
             />
          </SettingsList>
         </View>
         <Prompt
            title={that.state.promptTitle}
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


      var newSettings ={
        'requests':{
          'maxDistance': Number(this.state.maxDistance),
          'category': this.state.category,
          'type' : this.state.type
        },
        'offers':{
          'minimumAge': Number(this.state.minimumAge),
          'maximumAge': Number(this.state.maximumAge),
        }
      }

      SettingsManager().updateSettings(newSettings);
  }
}

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white'
  },
})

export default GeneralSettingsScene;
