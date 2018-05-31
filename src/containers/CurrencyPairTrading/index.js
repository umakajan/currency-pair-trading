import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from './actions';

import CurrencyPairTrading from './CurrencyPairTrading';

import './styles.scss';

function mapStateToProps(state, ownProps) {
  const { trade } = state;

  const { isLoading, lastPrice } = trade;

  return {
    isLoading,
    symbol: ownProps.symbol,
    lastPrice: lastPrice[ownProps.symbol] || 0,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyPairTrading);
