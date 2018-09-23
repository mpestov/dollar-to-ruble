import * as websocketActions from '../actions/websocket';

const websocket = (state = {
  status: websocketActions.WEBSOCKET_CLOSED,
  message: {},
}, action) => {
  switch (action.type) {
    case websocketActions.WEBSOCKET_OPENING:
      return {
        ...state,
        status: websocketActions.WEBSOCKET_OPENING,
      };
    case websocketActions.WEBSOCKET_SUBSCRIBING:
      return {
        ...state,
        status: websocketActions.WEBSOCKET_SUBSCRIBING,
      };
    case websocketActions.WEBSOCKET_READY:
      return {
        ...state,
        status: websocketActions.WEBSOCKET_READY,
      };
    case websocketActions.WEBSOCKET_MESSAGE:
      return {
        ...state,
        message: action.message,
      };
    default:
      return state;
  }
};

export default websocket;
