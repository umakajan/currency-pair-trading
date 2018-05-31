import React from 'react';
import PropTypes from 'prop-types';

class CurrencyPairTrading extends React.Component {
  constructor(props) {
    super(props);

    // Your account is pre-funded with $156.12 USD. User can trade with any amount
    this.state = {
      accountBalance: {
        USD: 156.12,
        BTC: 0,
      },
      amount: '',
      quote: '',
    };

    this.handleTradeInput = this.handleTradeInput.bind(this);
    this.handleTradeButton = this.handleTradeButton.bind(this);
  }

  componentWillMount() {
    const { fetchLastPrice, symbol } = this.props;
    
    fetchLastPrice(symbol);
  }

  /**
   * Calculate the quote based on the price of Bitcoin and the amount entered by the user
   * 
   * @returns {Number}
   */
  getQuote(amount) {
    const { lastPrice } = this.props;

    return lastPrice && amount / lastPrice;
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

CurrencyPairTrading.propTypes = {
  fetchLastPrice: PropTypes.func.isRequired,
  symbol: PropTypes.string.isRequired,
  lastPrice: PropTypes.number.isRequired,
}

export default CurrencyPairTrading;
