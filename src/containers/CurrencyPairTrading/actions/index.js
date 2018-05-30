import types from './types';

function setIsLoading(isLoading) {
  return {
    type: types.TRADE_SET_IS_LOADING,
    isLoading,
  }
}

function setLastPrice(symbol, lastPrice) {
  return {
    type: types.TRADE_SET_LAST_PRICE,
    symbol,
    lastPrice,
  }
}

/**
 * fetchLastPrice will fetch the market price of Bitcoin of provided symbol
 */
function fetchLastPrice(symbol) {
  return function(dispatch) {
    dispatch(setIsLoading(true));

    return fetch(`/api/${symbol}`)
      .then(response => response.json())
      .then(({ last_price: lastPrice }) => dispatch(setLastPrice(symbol, lastPrice)))
      .then(() => dispatch(setIsLoading(false)))
  }
}

export default {
  setIsLoading,
  fetchLastPrice,
};
