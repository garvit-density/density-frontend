// TODO : Modify this socket, add more resilience

import { BASE_URL } from "../../frontend-api-service/Base";

export default class BinanceWS {
  constructor(base_url, path) {
    this.baseUrl = BASE_URL().binanceWsBase;
    this.tvIntervals = {
      1: "1m",
      3: "3m",
      5: "5m",
      15: "15m",
      30: "30m",
      60: "1h",
      120: "2h",
      240: "4h",
      360: "6h",
      480: "8h",
      720: "12h",
      D: "1d",
      "1D": "1d",
      "3D": "3d",
      W: "1w",
      "1W": "1w",
      M: "1M",
      "1M": "1M"
    };
    this.streams = {}; // e.g: {'BTCUSDT': { paramStr: '', data:{}, listener:  } }
    this._createSocket();
  }

  _createSocket() {
    this._ws = new WebSocket(this.baseUrl);
    this._ws.onopen = (e) => {
      console.info(e);
      console.info(`Binance WS Open`);
      localStorage.setItem("wsStatus", 1);
    };

    this._ws.onclose = () => {
      console.warn("Binance WS Closed");
      localStorage.setItem("wsStatus", 0);
    };

    this._ws.onerror = (err) => {
      console.warn("WS Error", err);
      localStorage.setItem("wsStatus", 0);
    };

    this._ws.onmessage = (msg) => {
      if (!msg?.data) return;
      const sData = JSON.parse(msg.data);
      try {
        if (sData.data && sData.data.k) {
          const { s } = sData.data;
          const { o, h, l, v, c, T, t } = sData.data.k;
          // Update data
          const lastSocketData = {
            time: t,
            close: parseFloat(c),
            open: parseFloat(o),
            high: parseFloat(h),
            low: parseFloat(l),
            volume: parseFloat(v),
            closeTime: T,
            openTime: t
          };
          if (Object.keys(this.streams).length) {
            this.streams[s].data = lastSocketData;
            this.streams[s].listener(lastSocketData);
          }
        }
      } catch (e) {
        console.error(e);
      }
    };
  }

  async subscribeOnStream(symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback, lastDailyBar) {
    try {
      const paramStr = `${symbolInfo.name.toLowerCase()}@kline_${this.tvIntervals[resolution]}`;
      const obj = {
        method: "SUBSCRIBE",
        params: [
          paramStr
        ],
        id: 1
      };
      setTimeout(() => {
        if (this._ws.readyState === 1) {
          this._ws.send(JSON.stringify(obj));
          this.streams[symbolInfo.name] = { // register multiple streams in streams object
            paramStr,
            listener: onRealtimeCallback
          };
        }
      });
    } catch (e) {
      console.error(e);
    }
  }

  unsubscribeFromStream(subscriberUID) {
    try {
      const id = subscriberUID.split("_")[0];
      const obj = {
        method: "UNSUBSCRIBE",
        params: [
          this.streams[id].paramStr
        ],
        id: 1
      };
      delete this.streams[id];
      if (this._ws.readyState === 1) {
        this._ws.send(JSON.stringify(obj));
      }
    } catch (e) {
      console.error(e);
    }
  }
}
