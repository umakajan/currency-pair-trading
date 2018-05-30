import { combineReducers } from 'redux';

import tradeReducer from '../containers/CurrencyPairTrading/reducer';

const rootReducer = combineReducers({
  trade: tradeReducer
});

export default rootReducer;