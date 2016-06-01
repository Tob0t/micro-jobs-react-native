'use strict';

import React, {StyleSheet, Text, View, Image} from 'react-native'
import SwipeCards from 'react-native-swipe-cards'
import ClientApi from 'MiJo/app/ClientApi'
import Moment from 'moment'
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader'

import LocationManager from 'MiJo/app/util/location/LocationGPSManager'
import SettingsManager from 'MiJo/app/util/settings/SettingsManager'


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
        <Text>No more offers available!</Text>
      </View>
    )
  }
}


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
    //var loc = LocationManager.getLastKnownLocation();
    LocationManager().getLastKnownLocationPromise().then(
      (location) => {
        console.log('Successfully got location ', location);

        var lat = location.coords.latitude || 48.346371;
        var lon = location.coords.longitude || 14.510034;

        var max_distance = SettingsManager().getOffers().maxDistance;
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
            console.error("Error:", error);
          });
      }, (error) => {
        console.error("Error:", error);
      }
    )
  }

  _handleYup (card) {
    console.log("yup");
    ClientApi().createUpVote(card.id).then(
      ()=> {
        console.log("Successfully voted up at Card ID ", card.id);
      },(error) => {
        console.error("Error:", error);
      });
  }

  _handleNope (card) {
    console.log("nope");
    ClientApi().createDownVote(card.id).then(
      ()=> {
        console.log("Successfully voted down at Card ID ", card.id);
      },(error) => {
        console.error("Error:", error);
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
    var cards =
      <SwipeCards
        cards={this.state.cards}
        loop={false}

        renderCard={(cardData) => <Card {...cardData} />}
        renderNoMoreCards={() => <NoMoreCards />}
        showYup={true}
        showNope={true}

        handleYup={(card) => this._handleYup(card)}
        handleNope={(card) => this._handleNope(card)}
        cardRemoved={(index) => this._cardRemoved(index)}
      />;
      
    var loading =
         <View style={styles.noMoreCards}>
          <Pulse size={40} color="#52AB42"/>
          <Text>Looking for GPS ...</Text>
        </View>;
    
    return (
      this.state.loaded ? cards : loading
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
    backgroundColor: 'white'
  }
});

export default CardScene;
