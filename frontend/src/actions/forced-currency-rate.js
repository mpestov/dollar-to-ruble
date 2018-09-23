import axios from 'axios';

export const FORCEDCURRENCYRATE_CREATE = 'FORCEDCURRENCYRATE_CREATE';
export const FORCEDCURRENCYRATE_REQUEST_ITEM = 'FORCEDCURRENCYRATE_REQUEST_ITEM';
export const FORCEDCURRENCYRATE_RECEIVE_ITEM = 'FORCEDCURRENCYRATE_RECEIVE_ITEM';

export const create = data => () => {
  axios.post('/api/web/v1/forced_currency_rates', {
    data: {
      attributes: data,
    },
  });
};

export const receiveItem = json => ({
  type: FORCEDCURRENCYRATE_RECEIVE_ITEM,
  item: json.data.attributes,
});

export const requestItem = id => (dispatch) => {
  axios.get(`/api/web/v1/forced_currency_rates/${id}`)
    .then((response) => {
      if (response.data.data === null) {
        return null;
      }
      dispatch(receiveItem(response.data));
    });
};
