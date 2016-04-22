'use strict';

// imports
import React from 'react-native'
import MK, {MKProgress} from 'react-native-material-kit'
import NavBarStandard from 'MiJo/app/components/navbar/NavBarStandard'
import Database from 'MiJo/app/Database'



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
      {rowHasChanged: (r1, r2) => r1.guid !== r2.guid});
    this.state = {
      ds: Database.getUserRequests(1),
      dataSource:ds,
      }
  }

  componentDidMount(){
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.state.ds),
    })

  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight onPress={() => this.rowPressed(rowData.offerId)}
       underlayColor='#dddddd'>
     <View>
       <View style={styles.rowContainer}>
         <Image style={styles.thumb} source={{ uri: rowData.img_url }} />
         <View  style={styles.textContainer}>
           <Text style={styles.price}>{rowData.title}</Text>
           <Text style={styles.title}
                 numberOfLines={1}>{rowData.owner}</Text>
         </View>
       </View>
       <View style={styles.separator}/>
     </View>
   </TouchableHighlight>
    );
  }

  render() {
    return (
      <View>
        <NavBarStandard title="Your Requests" onPressLeft={() => this.props.navigator.pop()} onPressRight={() => this._createNewOffer()}/>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}/>
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
  fab: {
    marginBottom : 5,
    marginRight : 5,
    alignSelf: 'flex-end'
  }
})

export default UserRequestsScene;
