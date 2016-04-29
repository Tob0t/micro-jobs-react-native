'use strict';

// imports
import React from 'react-native'
import MK, {MKColor,MKProgress, MKSwitch} from 'react-native-material-kit'
import NavBarStandard from 'MiJo/app/components/navbar/NavBarStandard'
import MaterialFab from 'MiJo/app/components/buttons/MaterialFab'
import Database from 'MiJo/app/Database'
import Accordion from'react-native-collapsible/Accordion'



// global vars
var {
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
      ds:Database.getUserOffers(1),
      dataSource:ds,
      }
  }

  componentDidMount(){
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.state.ds),
    })

  }
   _renderHeader(rowData) {
    return (
       <View style={styles.rowContainer}>
         <Image style={styles.thumb} source={{ uri: rowData.img_url }} />
         <View  style={styles.textContainer}>
           <Text style={styles.price}>{rowData.title}</Text>
           <Text style={styles.title}>{rowData.interestedPeople.length} people interested</Text>
         </View>
      </View>
    );
  }

  _renderContent(rowData) {
    var that = this;
    var interestedPeople = rowData.interestedPeople;
    var rows = interestedPeople.map(function(interestedPeople,i){
      return (
        <View style={styles.detailRowContainer} key={interestedPeople.id}>
          <View style={styles.personContainer}>
            <Text style={styles.textPerson} >{interestedPeople.name}</Text>
            <Text style={styles.agePerson} >{interestedPeople.age} years</Text>
          </View>
            <MKSwitch style={styles.switch}
              checked={interestedPeople.connected}
              onPress={() => console.log('orange switch pressed')}
              onCheckedChange={(e) => that._changeConnection(interestedPeople.id,e)}
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

  _changeConnection(id,e){
    if(e.checked){
      console.log("Attemp to create connection to: ", id);
      // Database.createConnection(id);
      // Database.getContactInformation(id);
      alert("Contact Data of "+id+": \nTel.: 01/12312323 \nE-Mail: max.mustermann@example.com");
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
