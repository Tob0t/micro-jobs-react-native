'use strict';

// imports
import React from 'react-native'
import MK, {MKProgress} from 'react-native-material-kit'
import NavBarStandard from 'MiJo/app/components/navbar/NavBarStandard'
import Database from 'MiJo/app/Database'
import ClientApi from 'MiJo/app/ClientApi'



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


class UserRequestsScene extends React.Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource(
      {rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      //ds: Database.getUserRequests(1),
      dataSource:ds,
      loaded: false,
      }
  }

  componentDidMount(){
    this._getMatchedRequests();
  }
  componentWillReceiveProps() {
    this._getMatchedRequests();
  }

  _getMatchedRequests(){
    //This parameters are optional and needed for pagination! --> see swagger spec
    var opts = {
        page: 1,
        perPage: 10,
    };

    ClientApi().getMatchedRequests(opts).then(
      (requests) => {
        console.log('Successfully got the requests: ', requests);
        // Initiate new rendering
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(requests),
          loaded: true,
        });
      },(error) => {
        console.error("Error:", error.error_description);
        Alert.alert(
          'Error',
          error.error_description);
      });
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight onPress={() => this._rowPressed(rowData.offerId)}
       underlayColor='#dddddd'>
     <View>
       <View style={styles.rowContainer}>
         <Image style={styles.offerPicture} source={{ uri: rowData.offerImage }} />
         <View  style={styles.textContainer}>
           <Text style={styles.price}>{rowData.offerTitle}</Text>
           <Text style={styles.title}
                 numberOfLines={1}>{rowData.offerer.prename} {rowData.offerer.surname.charAt(0)}.</Text>
         </View>
       </View>
       <View style={styles.separator}/>
     </View>
   </TouchableHighlight>
    );
  }
  _rowPressed(offerId){
    console.log('Offer pressed');
    this.props.navigator.push({
      id: 'DetailOffer',
      passProps: {
        offerId: offerId
      }
    });
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
        <NavBarStandard title="Your Requests" onPressLeft={() => this.props.navigator.pop()} onPressRight={() => this._createNewOffer()}/>
        {this.state.loaded ? list : loading}
      </View>
    );
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
    marginLeft: 10,
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
  fab: {
    marginBottom : 5,
    marginRight : 5,
    alignSelf: 'flex-end'
  }
})

export default UserRequestsScene;
