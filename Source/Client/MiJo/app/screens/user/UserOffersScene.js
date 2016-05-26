'use strict';

// imports
import React from 'react-native'
import MK, {MKColor,MKProgress, MKSwitch} from 'react-native-material-kit'
import NavBarStandard from 'MiJo/app/components/navbar/NavBarStandard'
import MaterialFab from 'MiJo/app/components/buttons/MaterialFab'
import Accordion from'react-native-collapsible/Accordion'
import ClientApi from 'MiJo/app/ClientApi'



// global vars
var {
  Alert,
  AppRegistry,
  Image,
  ListView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} = React;


class UserOffersScene extends React.Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource(
      {rowHasChanged: (r1, r2) => r1.guid !== r2.guid});
    this.state = {
      //ds:Database.getUserOffers(1),
      dataSource:ds,
      loaded: false,
      }
  }

  componentDidMount(){
    this._getOfferInterests();
    /*this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.state.ds),
    })*/
  }

  _getOfferInterests(){
    //This parameters are optional and needed for pagination! --> see swagger spec
    var opts = {
        page: 1,
        perPage: 5,
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
        console.error("Error:", error.error_description);
        Alert.alert(
          'Error',
          error.error_description);
      });
  }
   _renderHeader(rowData) {
    return (
       <View style={styles.rowContainer}>
         <Image style={styles.thumb} source={{ uri: rowData.img_url }} />
         <View  style={styles.textContainer}>
           <Text style={styles.price}>{rowData.offerTitle}</Text>
           <Text style={styles.title}>{rowData.users.length} people interested</Text>
         </View>
      </View>
    );
  }

  _renderContent(rowData) {
    var that = this;
    var interestedPeople = rowData.users;
    var rows = interestedPeople.map(function(interestedPeople,i){
      return (
        <View style={styles.detailRowContainer} key={interestedPeople.id}>
          <View style={styles.personContainer}>
            <Text style={styles.textPerson} >{interestedPeople.prename}</Text>
            <Text style={styles.agePerson} >{interestedPeople.surname} years</Text>
          </View>
            <MKSwitch style={styles.switch}
              //checked={interestedPeople.connected}
              checked={false}
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
    return (
      <View>
        <NavBarStandard title="Your Offers" onPressLeft={() => this.props.navigator.pop()} onPressRight={() => this._createNewOffer()}/>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}/>
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
          'Contact Data of userId '+userId,
          'Tel.:'+contactInfo.phone+'\n'+
          'E-Mail:'+contactInfo.mail);
        //alert("Contact Data of "+userId+": \nTel.: 01/12312323 \nE-Mail: max.mustermann@example.com");
      },(error) => {
        debugger
        console.error("Error:", error.error_description);
        Alert.alert(
          'Error',
          error.error_description);
      });
      
    } else{
      console.log("Attemp to delete connection to: ", id);
      // Database.removeConnection(id);
      alert("connection removed");
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
  textContainer: {
    flex: 1
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
