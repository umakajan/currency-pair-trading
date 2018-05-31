import React from 'react';
import PropTypes from 'prop-types';

function AccountBalance({ USD, BTC }) {
  return (
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
  )
}

AccountBalance.propTypes = {
  USD: PropTypes.number.isRequired,
  BTC: PropTypes.number.isRequired,
}

export default AccountBalance;
