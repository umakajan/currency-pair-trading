import React from 'react';

class App extends React.Component {
  constructor(props){
    super(props);

    // Your account is pre-funded with $156.12 USD. User can trade with any amount
    this.state = {
      amount: '156.12',
    };
  }

  componentWillMount() {
    fetch('https://api.bitfinex.com/v1/pubticker/btcusd', {
      method: 'get',
      mode: 'no-cors'
    })
      // Check for status 200
      .then(response => response.json())
      .then(response => console.log(response));

  }

  render() {

    return (
      <p>Currency Pair Trading</p>
    )
  }
}

export default App;
