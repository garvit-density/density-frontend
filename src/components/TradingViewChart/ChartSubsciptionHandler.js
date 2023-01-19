import {
  BINANCE_WS_SUBSCRIBE,
  BINANCE_WS_UNSUBSCRIBE,
  UPDATE_KLINES_DATA
} from "redux/constants/Constants";
import { BINANCE_SUBSCRIBTION_SERVICE, SUB_SRC_MAP } from "services/BinanceWebSocketService/Constants";
import createStore from "../../redux/store/configureStore";

const sendSubscribtionToSocket = (symbol, resolution) =>
  createStore.dispatch({
    type: BINANCE_WS_SUBSCRIBE,
    payload: {
      symbol,
      methods: [BINANCE_SUBSCRIBTION_SERVICE.klines],
      source: SUB_SRC_MAP.MS,
      res: resolution
    }
  });

export const subscribeOnStream = (symbolInfo, resolution, onRealtimeCallback) => {
  sendSubscribtionToSocket(symbolInfo.name.toLowerCase(), resolution);
  createStore.subscribe(() => {
    const kLinesData = createStore.getState().BinanceStreamData.klines;
    if (kLinesData !== undefined && Object.keys(kLinesData).length !== 0) {
      onRealtimeCallback(kLinesData);
    }
  });
};

export const unsubscribeOnStream = (sym, chartRes) => {
  createStore.dispatch({
    type: BINANCE_WS_UNSUBSCRIBE,
    payload: {
      symbol: sym,
      methods: [BINANCE_SUBSCRIBTION_SERVICE.klines],
      source: SUB_SRC_MAP.MS,
      res: chartRes
    }
  });
};

export const clearKlines = () => createStore.dispatch({ type: UPDATE_KLINES_DATA });
