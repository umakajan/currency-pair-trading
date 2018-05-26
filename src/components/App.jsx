import React from 'react';

const SYMBOL = 'btcusd'
const config = {
  accountBalance: {
    USD: 156.12,
    BTC: 0,
  },
  symbol: SYMBOL,
}

class App extends React.Component {
  constructor(props) {
    super(props);

    // Your account is pre-funded with $156.12 USD. User can trade with any amount
    this.state = {
      accountBalance: config.accountBalance,
      lastPrice: {
        [SYMBOL]: null,
      },
      amount: 0,
      quote: 0,
    };

    this.handleTradeInput = this.handleTradeInput.bind(this);
  }

  componentWillMount() {
    this.fetchLastPrice();
  }

  /**
   * Calculate the quote based on the price of Bitcoin and the amount entered by the user
   * 
   * @returns {Number}
   */
  getQuote(amount) {
    const { lastPrice } = this.state;

    return lastPrice[config.symbol] && lastPrice[config.symbol] * amount;
  }

  
  /**
   * fetchLastPrice will fetch the market price of Bitcoin of provided symbol
   * @param {String} symbol 
   */
  fetchLastPrice() {
    fetch(`/api/${config.symbol}`)
      .then(response => response.json())
      .then(({ last_price: lastPrice }) =>
        this.setState({
          lastPrice: {
            [config.symbol]: lastPrice,
          }
        })
      )
  }

  handleTradeInput(event) {
    // TODO fetch lastest price
    
    this.setState({
      amount: event.target.value,
      quote: this.getQuote(event.target.value),
    });

  }



  render() {
    const { accountBalance: { USD, BTC }, quote, amount } = this.state;

    return (
      <div>
        <p>Currency Pair Trading</p>
        <p>Account Balance</p>
        <div>
          <span>USD </span>
          <span>{USD}</span>
        </div>
        <div>
          <span>BTC </span>
          <span>{BTC}</span>
        </div>

        <h4>Trade</h4>
        <div>
          <input value="USD" readOnly disabled />
          <input
            value={amount}
            placeholder="Enter your amount"
            onChange={this.handleTradeInput}
          />
        </div>
        
        <h4>For</h4>
        <div>
          <input value="BTC" readOnly disabled />
          <input value={quote} placeholder="Display Quote" />
        </div>

        <button onClick={this.handleTradeButton}>Trade</button>
      </div>

    )
  }
}

export default App;
