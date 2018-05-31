import types from '../actions/types';

const defaultState = {
  isLoading: false,
  lastPrice: {},
};

export default function tradeReducer(state = defaultState, action) {
  switch(action.type) {
    case types.TRADE_SET_IS_LOADING: {
      return {...state, isLoading: action.isLoading };
    }

    case types.TRADE_SET_LAST_PRICE: {
      return {
        ...state,
        lastPrice: {
          ...state.lastPrice,
          [action.symbol]: action.lastPrice
        },
      }
    }

    default:
      return state;
  }
}