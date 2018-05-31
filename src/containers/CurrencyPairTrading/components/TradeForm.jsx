import React from 'react';
import PropTypes from 'prop-types';

class TradeForm extends React.Component {
  constructor(props) {
    super(props);

    this.onTradeCurrencyChange = this.onTradeCurrencyChange.bind(this);
    this.onTradeButtonClick = this.onTradeButtonClick.bind(this);
  }

  onTradeCurrencyChange(event) {
    this.props.onTradeCurrencyChange(event);
  }

  onTradeButtonClick() {
    this.props.onTradeButtonClick();
  }

  render() {
    const { quote, amount } = this.props;

    return (
      <div className="tradeForm">
        <div>
          <div>Trade</div>
          <input
            className="tradeForm-currency"
            value="USD"
            readOnly
            disabled
          />
          <input
            id="amount"
            value={amount}
            placeholder="Enter your amount"
            onChange={this.onTradeCurrencyChange}
          />

          <div>For</div>
          <input
            className="tradeForm-currency"
            value="BTC"
            readOnly
            disabled
          />
          <input
            id="quote"
            value={quote || ''}
            placeholder="Display Quote"
          />
        </div>

        <button
          className="tradeForm-tradeButton"
          onClick={this.onTradeButtonClick}
        >
          Trade
        </button>
      </div>
    )
  }
}

TradeForm.propTypes = {
  amount: PropTypes.number.isRequired,
  quote: PropTypes.number.isRequired,
  onTradeCurrencyChange: PropTypes.func.isRequired,
  onTradeButtonClick: PropTypes.func.isRequired,
}

export default TradeForm;
