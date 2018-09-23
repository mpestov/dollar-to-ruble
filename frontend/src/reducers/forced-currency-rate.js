import * as forcedCurrencyRateActions from '../actions/forced-currency-rate';

const forcedCurrencyRate = (state = {
  item: {
    rate: null,
    expires: null,
  },
}, action) => {
  switch (action.type) {
    case forcedCurrencyRateActions.FORCEDCURRENCYRATE_REQUEST_ITEM:
      return {
        ...state,
      };
    case forcedCurrencyRateActions.FORCEDCURRENCYRATE_RECEIVE_ITEM:
      return {
        ...state,
        item: action.item,
      };
    default:
      return state;
  }
};

export default forcedCurrencyRate;
