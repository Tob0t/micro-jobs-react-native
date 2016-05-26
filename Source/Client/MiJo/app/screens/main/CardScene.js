'use strict';

import React, {Alert, StyleSheet, Text, View, Image} from 'react-native'
import SwipeCards from 'react-native-swipe-cards'
import ClientApi from 'MiJo/app/ClientApi'
import Moment from 'moment'

class Card extends React.Component{
  constructor(props){
    super(props);
  }

  render() {
    console.log("New Card", this.props);

    return (
      <View style={styles.card}>
        <Image style={styles.thumbnail} source={{uri: this.props.image}} />
        <Text style={styles.text_title}> {this.props.title}</Text>
        <View style={styles.submenu}>
          <Text style={styles.text_subtitle}>Job description</Text>
        </View>
        <Text style={styles.text_description}>{this.props.description}</Text>
        <View style={styles.text_container}>
          <Text style={styles.text_subtitle}>Deadline: </Text>
          <Text style={styles.text_subtitle_flat}>{Moment(this.props.deadline).format('L')}</Text>
        </View>
        <View style={styles.text_container}>
          <Text style={styles.text_subtitle}>Payment: </Text>
          <Text style={styles.text_subtitle_flat}>{this.props.payment ? this.props.payment.value : ""}</Text>
        </View>
      </View>
    )
  }
}

class NoMoreCards extends React.Component{
  render() {
    return (
      <View style={styles.noMoreCards}>
        <Text>No more cards</Text>
      </View>
    )
  }
}


const Cards = [
  {name: '1', image: 'https://media.giphy.com/media/GfXFVHUzjlbOg/giphy.gif'},
  {name: '2', image: 'https://media.giphy.com/media/irTuv1L1T34TC/giphy.gif'},
  {name: '3', image: 'https://media.giphy.com/media/LkLL0HJerdXMI/giphy.gif'},
  {name: '4', image: 'https://media.giphy.com/media/fFBmUMzFL5zRS/giphy.gif'},
  {name: '5', image: 'https://media.giphy.com/media/oDLDbBgf0dkis/giphy.gif'},
  {name: '6', image: 'https://media.giphy.com/media/7r4g8V2UkBUcw/giphy.gif'},
  {name: '7', image: 'https://media.giphy.com/media/K6Q7ZCdLy8pCE/giphy.gif'},
  {name: '8', image: 'https://media.giphy.com/media/hEwST9KM0UGti/giphy.gif'},
  {name: '9', image: 'https://media.giphy.com/media/3oEduJbDtIuA2VrtS0/giphy.gif'},
]

const Cards2 = [
  {name: '10', image: 'https://media.giphy.com/media/12b3E4U9aSndxC/giphy.gif'},
  {name: '11', image: 'https://media4.giphy.com/media/6csVEPEmHWhWg/200.gif'},
  {name: '12', image: 'https://media4.giphy.com/media/AA69fOAMCPa4o/200.gif'},
  {name: '13', image: 'https://media.giphy.com/media/OVHFny0I7njuU/giphy.gif'},
]

class CardScene extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loaded: false,
      outOfCards: false,
      cards: []
    }
  }

  componentDidMount() {
    this._getOffers(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this._getOffers(nextProps);
  }

  _getOffers(){
    console.log('Get Offers');

    // Request fo the offer feed
    var lat = 48.346371;
    var lon = 14.510034;
    var max_distance = 20000;
    //This parameters are optional and needed for pagination! --> see swagger spec
    var opts = {
        page: 1,
        perPage: 5,
    };

    var Cards = [];
    const that = this;
    ClientApi().getOffers(lat, lon, max_distance, opts).then(
      (offers) => {
        console.log('Successfully got the offers');
        offers.forEach(function(offer){
          var newCard ={
            id: offer.id,
            title: offer.title,
            deadline : offer.deadline,
            description: offer.description,
            image: offer.image,
            payment: offer.payment
          };
          Cards.push(newCard);
        });
        // Initiate new rendering
        that.setState({
          loaded: true,
          cards: this.state.cards.concat(Cards)
        });
      },(error) => {
        console.error("Error:", error.error_description);
        Alert.alert(
          'Error',
          error.error_description);
      });
  }

  _handleYup (card) {
    console.log("yup");
    ClientApi().createUpVote(card.id).then(
      ()=> {
        console.log("Successfully voted up at Card ID ", card.id);
      },(error) => {
        console.error("Error:", error.error_description);
        Alert.alert(
          'Error',
          error.error_description);
      });
  }

  _handleNope (card) {
    console.log("nope");
    ClientApi().createDownVote(card.id).then(
      ()=> {
        console.log("Successfully voted down at Card ID ", card.id);
      },(error) => {
        console.error("Error:", error.error_description);
        Alert.alert(
          'Error',
          error.error_description);
      });
  }
  _cardRemoved (index) {
    console.log(`The index is ${index}`);

    let CARD_REFRESH_LIMIT = 3

    if (this.state.cards.length - index <= CARD_REFRESH_LIMIT + 1) {
      console.log(`There are only ${this.state.cards.length - index - 1} cards left.`);

      if (!this.state.outOfCards) {
        console.log(`Adding more cards`);

         this._getOffers();

        /*this.setState({
          cards: this.state.cards.concat(Cards2),
          outOfCards: true
        })*/
      }

    }

  }
  render() {
    return (this.state.loaded ? <SwipeCards
        cards={this.state.cards}
        loop={false}

        renderCard={(cardData) => <Card {...cardData} />}
        renderNoMoreCards={() => <NoMoreCards />}
        showYup={true}
        showNope={true}

        handleYup={(card) => this._handleYup(card)}
        handleNope={(card) => this._handleNope(card)}
        cardRemoved={(index) => this._cardRemoved(index)}
      /> : <View></View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    borderColor: 'grey',
    backgroundColor: 'white',
    padding: 15,
    margin: 10,
    borderWidth: 1,
    elevation: 1,
  },
  submenu: {
    width: 300,
    alignItems: 'flex-start',
  },
  thumbnail: {
    width: 300,
    height: 100,
  },
  text_title: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: 'bold',
  },
  text_subtitle: {
    fontSize: 16,
    paddingTop: 10,
    fontWeight: 'bold',
  },
  text_subtitle_flat: {
    fontSize: 16,
    paddingTop: 10,
    paddingLeft: 10,
  },
  text_description: {
    fontSize: 16,
    padding: 10,
    paddingBottom: 10,
  },
  noMoreCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text_container: {
    width: 300,
    flexDirection: 'row',
  }
});

export default CardScene;
