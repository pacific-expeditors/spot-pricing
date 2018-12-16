import React, { Component } from 'react';
import './App.css';
import firebase from './firebase';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prices: []
    };
  }

  componentDidMount() {
    const itemsRef = firebase.database().ref('prices');
    itemsRef.push({price: 10});
    itemsRef.on('value', (snapshot) => {
      console.log(snapshot);
      let prices = snapshot.val();
      console.log(prices);
      let newState = [];
      for (let price in prices) {
        newState.push({
          price: prices[price].price,
        });
      }
      this.setState({
        prices: newState
      });
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Prices</h1>
        <ul>
          {this.state.prices.map((price, index) => {
            return (
              <li key={index}>{price.price}</li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default App;
