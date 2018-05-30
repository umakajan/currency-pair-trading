import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from './actions';

import CurrencyPairTrading from '../../components/App';

function mapStateToProps(state, ownProps) {
  const { trade } = state;

  const { isLoading, lastPrice } = trade;

  return {
    isLoading,
    lastPrice: lastPrice[ownProps.symbol],
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyPairTrading);