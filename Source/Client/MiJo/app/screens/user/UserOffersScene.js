'use strict';

// imports
import React from 'react-native'
import MK, {MKColor,MKProgress, MKSwitch} from 'react-native-material-kit'
import NavBarAddItem from 'MiJo/app/components/navbar/NavBarAddItem'
import MaterialFab from 'MiJo/app/components/buttons/MaterialFab'
import Accordion from'react-native-collapsible/Accordion'
import ClientApi from 'MiJo/app/ClientApi'
import IconFont from 'react-native-vector-icons/FontAwesome'
import ActionButton from 'react-native-action-button'

var imageTemplate = 'data:image/png;base64,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';

// global vars
var {
  Alert,
  Animated,
  AppRegistry,
  Image,
  ListView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  View,
} = React;

class UserOffersScene extends React.Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource(
      {rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource:ds,
      loaded: false,
    }
    this._renderContent = this._renderContent.bind(this);
  }

  componentDidMount(){
    this._getOfferInterests();
  }

  componentWillReceiveProps() {
    this._getOfferInterests();
  }

  _getOfferInterests(){
    //This parameters are optional and needed for pagination! --> see swagger spec
    var opts = {
        page: 1,
        perPage: 10,
    };

    ClientApi().getOfferInterests(opts).then(
      (offers) => {
        console.log('Successfully got the offers: ', offers);
        // Initiate new rendering
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(offers),
          loaded: true,
        });
      },(error) => {
        //debugger
        console.error("Error:", error);
      });
  }

  _editOffer(offerId){
    console.log('Edit Offer pressed');
    console.log(offerId);
    this.props.navigator.push({
      id: 'EditOffer',
      passProps: {
        offerId: offerId
      }
    });
  }

   _renderHeader(rowData) {
    return (
       <View style={styles.rowContainer}>
         <Image style={styles.offerPicture} source={{ uri: rowData.offerImage }} />
         <View  style={styles.textContainer}>
           <Text style={styles.price}>{rowData.offerTitle}</Text>
           <Text style={styles.title}>{rowData.takers.length} people interested</Text>
         </View>

           <View style={styles.colIcon}>
             <TouchableOpacity onPress={() => this._editOffer(rowData.offerId)}>
             <IconFont name="edit" size={24}/>
             </TouchableOpacity>
           </View>

      </View>
    );
  }

  _renderContent(rowData) {
    var that = this;
    var checked = false;
    var interestedPeople = rowData.takers;
    var rows = interestedPeople.map(function(interestedPeople,i){
      if (interestedPeople.status === 'ACCEPTED'){
        checked = true;
      }
      return (
        <View style={styles.detailRowContainer} key={interestedPeople.id}>
          <Image style={styles.profilePicture} source={{uri: interestedPeople.image || imageTemplate}}/>
          <View style={styles.personContainer}>
            <Text style={styles.textPerson} >{interestedPeople.prename} {interestedPeople.surname.charAt(0)}.</Text>
            <Text style={styles.agePerson} >{interestedPeople.age} years</Text>
          </View>

          <MKSwitch style={styles.switch}
            checked={checked}
            onPress={() => console.log('orange switch pressed')}
            onCheckedChange={(e) => that._changeConnection(rowData.offerId, interestedPeople.id,e)}
            />
        </View>


        );
    });

    return (
      <View>
        {rows}
      </View>
    );
  }

  renderRow(rowData, sectionID, rowID) {
    return (
    <View>
      <Accordion
        sections={['Section']}
        renderHeader={() => this._renderHeader(rowData)}
        renderContent={() => this._renderContent(rowData)}
      />
      <View style={styles.separator}/>
    </View>


    );
  }

  render() {
    var list =
      <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}/>;
    var loading =
          <View style={styles.col}>
            <MKProgress.Indeterminate style={styles.progress}/>
          </View>;
    return (
      <View style={{flex:1}}>
        <NavBarAddItem title="Your Offers" onPressLeft={() => this.props.navigator.pop()} onPressRight={() => this._createNewOffer()}/>
        {this.state.loaded ? list : loading}
        {
          // Show only Action button on android
          Platform.OS === 'android' &&
          <ActionButton
            buttonColor="rgba(231,76,60,1)"
            onPress={() => this._createNewOffer()}
            offsetX={10}
            offsetY={10}
          />
        }
      </View>
    );
  }

  _changeConnection(offerId, userId,e){
    if(e.checked){
      console.log("Attemp to create connection to user: ", userId);
      console.log("Attemp to create connection with offerId: ", offerId);
      ClientApi().createMatch(offerId, userId).then(
      (contactInfo) => {
        console.log('Successfully created match: ', contactInfo);
        Alert.alert(
          'Contact Data of user',
          'Tel.: '+(contactInfo.phone || '+43 677 123 456 78')+'\n'+
          'E-Mail: '+contactInfo.mail);
        //alert("Contact Data of "+userId+": \nTel.: 01/12312323 \nE-Mail: max.mustermann@example.com");
      },(error) => {
        console.error("Error:", error);
      });

    } else{
      console.log("Attemp to delete connection to: ", userId);
      ClientApi().declineUserForOffer(offerId, userId).then(
      (status) => {
        console.log('Successfully removed match: ', status);
      },(error) => {
        debugger
        console.error("Error:", error);
      });
    }
  }

  _createNewOffer() {
    console.log('Create new offer pressed');
      this.props.navigator.push({
        id: 'CreateOffer',
      });

  }
}

var styles = StyleSheet.create({
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 24,
    resizeMode: 'contain',
  },
  offerPicture:{
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
  },
  textContainer: {
    flex: 4,
    marginLeft: 10
  },
  colIcon:{
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#48BBEC'
  },
  title: {
    fontSize: 20,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  },
  detailRowContainer: {
    flexDirection: 'row',
    padding: 10,
    paddingRight: 20,
  },
  personContainer:{
    flex: 1,
    paddingLeft: 15,
    padding: 5,
  },
  profilePicture:{
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
  },
  textPerson:{
    fontSize: 18,
    fontWeight: 'bold',
  },
  agePerson:{
    fontSize: 14,
  },
  logo:{
    width: 30,
    height: 30,
    alignSelf: 'flex-end',
  },
  fab: {
    position: 'absolute', bottom: 25, right: 25,
                  width:56, height:56
  }
})

export default UserOffersScene;
