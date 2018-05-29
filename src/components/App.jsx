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
      amount: '',
      quote: '',
    };

    this.handleTradeInput = this.handleTradeInput.bind(this);
    this.handleTradeButton = this.handleTradeButton.bind(this);
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

    return lastPrice[config.symbol] && amount / lastPrice[config.symbol];
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
      quote: event.target.value ? this.getQuote(event.target.value).toFixed(8) : '',
    });

  }

  /**
   * Execute the trade and update with the new currency and BTC account balance
   */
  handleTradeButton() {
    const { accountBalance: { USD, BTC }, amount } = this.state;

    const calculatedAmount = this.getQuote(amount);

    if (USD >= amount) {
      this.setState({
        accountBalance: {
          USD: USD - amount,
          BTC: BTC + calculatedAmount,
        },
        amount: '',
        quote: '',
      });
    }
  }

  render() {
    const { accountBalance: { USD, BTC }, quote, amount } = this.state;

    return (
      <div className="tradeWrapper">
        <div className="accountBalance">
          <p>Account Balance</p>
          <div className="accountBalance-currency">
            <label htmlFor="currency-USD">USD
              <span id="currency-USD">{USD}</span>
            </label>
          </div>
          <div className="accountBalance-currency">
            <label htmlFor="currency-BTC">BTC
              <span id="currency-BTC">{BTC.toFixed(8)}</span>
            </label>
          </div>
        </div>

        <div className="tradeForm">
          <div>
            <div>Trade</div>
            <input className="tradeForm-currency" value="USD" readOnly disabled />
            <input
              id="amount"
              value={amount}
              placeholder="Enter your amount"
              onChange={this.handleTradeInput}
            />

            <div>For</div>
            <input className="tradeForm-currency" value="BTC" readOnly disabled />
            <input
              id="quote"
              value={quote || ''}
              placeholder="Display Quote"
              onChange={this.handleTradeInput}
            />
          </div>

          <button
            className="tradeForm-tradeButton"
            onClick={this.handleTradeButton}
          >
            Trade
          </button>
        </div>
      </div>
    )
  }
}

export default App;
