import * as websocketActions from '../actions/websocket';

let websocket;

const onMessage = (ws, store) => (event) => {
  const message = JSON.parse(event.data);

  if (message.type === 'ping') {
    return;
  }

  const websocketStatus = store.getState().websocket.status;

  switch (websocketStatus) {
    case websocketActions.WEBSOCKET_OPENING: {
      if (message.type === 'welcome') {
        store.dispatch(websocketActions.subscribe());
      }
      break;
    }
    case websocketActions.WEBSOCKET_SUBSCRIBING: {
      if (message.type === 'confirm_subscription') {
        store.dispatch(websocketActions.ready());
      }
      break;
    }
    case websocketActions.WEBSOCKET_READY: {
      store.dispatch(websocketActions.message(message.message));
      break;
    }
    default:
  }
};

export default store => next => (action) => {
  switch (action.type) {
    case websocketActions.WEBSOCKET_OPEN: {
      if (websocket) {
        websocket.close();
      }
      websocket = new WebSocket(`ws://${process.env.REACT_APP_API_HOST}/api/web/v1/ws`);
      websocket.onmessage = onMessage(websocket, store);

      store.dispatch(websocketActions.opening());
      break;
    }
    case websocketActions.WEBSOCKET_SUBSCRIBE: {
      const subscribeMessage = {
        command: 'subscribe',
        identifier: JSON.stringify({
          channel: 'CurrencyRateChannel',
        }),
      };
      websocket.send(JSON.stringify(subscribeMessage));

      store.dispatch(websocketActions.subscribing());
      break;
    }
    default: {
      next(action);
    }
  }
};
