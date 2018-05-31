import React from 'react';
import PropTypes from 'prop-types';

import AccountBalance from './components/AccountBalance';
import TradeForm from './components/TradeForm';

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
    const { accountBalance, quote, amount } = this.state;

    return (
      <div className="tradeWrapper">
        <AccountBalance {...accountBalance} />
        <TradeForm
          quote={quote}
          amount={amount}
          onTradeCurrencyChange={this.handleTradeInput}
          onTradeButtonClick={this.handleTradeButton}
        />
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
