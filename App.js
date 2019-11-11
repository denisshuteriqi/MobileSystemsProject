import decks from './flashcards';
import * as React from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import Constants from 'expo-constants';

export default class App extends React.Component {
    render() {
        return <DeckPicker decksList={decks}/>
      }
  }
  
  
class DeckPicker extends React.Component {
    
    constructor(props){
    super(props);
    this.state = {selectedDeck: null,
                  count:0,
                  increment: props.increment?props.increment:1
             }
    }    
    selectedDeck = deck => this.setState({selectedDeck: deck})
             
     increment() {
    this.setState({count: this.state.count + this.state.increment});}

   decrement() {
    this.setState({count: this.state.count - this.state.increment});}
  //  I saw no need to add this <Button title = "previous" onPress={() => this.decrement()}/>
  render() {
    return (this.state.selectedDeck?
    (<View style = {styles.container}>
    <SelectDeck deck={this.state.selectedDeck} countIt= {this.state.count}/>
    <Button title = "next" onPress={() => this.increment()}/>
    <Button title = "restart" onPress={() => this.setState({selectedDeck: null, count:0})}/>
    </View>):
    <ButtonList list={this.props.decksList} onSelect={this.selectedDeck}/>)
  }
}

class CardFlipper extends React.Component {

  state = {cardFlipped: false,
           rightAnswers:[],
           wrongAnswers:[]}

    rightClick() {
    const positiveCards = this.state.rightAnswers;
    positiveCards.push(this.props.pleaseWork);
    this.setState({rightAnswers: positiveCards});
    console.log(positiveCards);
    Alert.alert("Click on go back then on next");
    }

    wrongClick() {
    const negativeCards = this.state.wrongAnswers;
    negativeCards.push(this.props.pleaseWork);
    this.setState({wrongAnswers: negativeCards});
    console.log(negativeCards);
    Alert.alert("Click on go back then on next");
    }

  render(){

    if(typeof this.props.pleaseWork === 'undefined'){
      return  <View> <Ending rights = {this.state.rightAnswers} wrongs = {this.state.wrongAnswers}/> </View>} else {
      return(this.state.cardFlipped?
    (<View> 
     <CardBack card = {this.props.pleaseWork}/>
     <Button title = "GO BACK" onPress = {() => this.setState({cardFlipped:false})}/>
      <Button title = "My answer was right" onPress = {() => this.rightClick()}/>
      <Button title = "My answer was wrong" onPress = {() => this.wrongClick()}/>
     </View>):
     (<View>
     
    <CardFront card = {this.props.pleaseWork}/>
    <Button title = "LOOK AT THE ANSWER" onPress = {() => this.setState({cardFlipped:true})}/>
    </View>)
    ) } } }



 const ButtonList = props => {
    const deckToButton = (deck) =>
   ( <Button title={deck.name} onPress={() => props.onSelect(deck)}/>)
 
    return (<View style = {styles.container}>
            {props.list.map(deckToButton)}   
            </View>)
  }

const CardFront = props => (
 <Text>
 {props.card.front}
 </Text>
)

const CardBack = props => (
 <Text>
 {props.card.back}
 </Text>
)

const Ending = props => (
 <Text>
 You made it until the end.
 You have {props.rights.length} right answer(s) and {props.wrongs.length} wrong answer(s). Click on RESTART.
 </Text>
)

 const SelectDeck = props => (<View>
  <Text>
  There are {props.deck.cards.length} {props.deck.name} cards. This is card number {props.countIt + 1}.
  
  </Text>
  <CardFlipper pleaseWork = {props.deck.cards[props.countIt]}/>
  </View>)


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingTop: Constants.statusBarHeight,
      backgroundColor: '#ecf0f1',
      padding: 8,
    },
    paragraph: {
      margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });