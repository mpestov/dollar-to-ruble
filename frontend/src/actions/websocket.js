export const WEBSOCKET_OPEN = 'WEBSOCKET_OPEN';
export const WEBSOCKET_OPENING = 'WEBSOCKET_OPENING';
export const WEBSOCKET_SUBSCRIBE = 'WEBSOCKET_SUBSCRIBE';
export const WEBSOCKET_SUBSCRIBING = 'WEBSOCKET_SUBSCRIBING';
export const WEBSOCKET_READY = 'WEBSOCKET_READY';
export const WEBSOCKET_CLOSED = 'WEBSOCKET_CLOSED';
export const WEBSOCKET_MESSAGE = 'WEBSOCKET_MESSAGE';

export function open() {
  return {
    type: WEBSOCKET_OPEN,
  };
}

export function opening() {
  return {
    type: WEBSOCKET_OPENING,
  };
}

export function subscribe() {
  return {
    type: WEBSOCKET_SUBSCRIBE,
  };
}

export function subscribing() {
  return {
    type: WEBSOCKET_SUBSCRIBING,
  };
}

export function ready() {
  return {
    type: WEBSOCKET_READY,
  };
}

export function message(data) {
  return {
    type: WEBSOCKET_MESSAGE,
    message: data,
  };
}
