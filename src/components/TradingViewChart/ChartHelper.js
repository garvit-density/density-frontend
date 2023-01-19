/* eslint-disable n/no-callback-literal */
import { BASE_URL } from "api-server/Base";
import { clearKlines, subscribeOnStream, unsubscribeOnStream } from "./ChartSubsciptionHandler";
export default class ChartHelper {
  constructor(options) {
    this.binanceHost = BASE_URL().chartUrlBase;
    this.selectedSymbol = options.selectedSymbol;
    this.symbols = options.selectedSymbolData;
    this.resolution = "";
    this.chartIntervals = {
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
    this.apiCall = false;
    this.chartData = [];
  }

  async getKlinesData(symbol, interval, limit, startTime, endTime) {
    const url = `${this.binanceHost}/fapi/v1/klines?symbol=${symbol}&interval=${interval}${startTime ? `&startTime=${startTime}` : ""}${endTime ? `&endTime=${endTime}` : ""}${
      limit ? `&limit=${limit}` : ""
    }`;
    const res = await fetch(url);
    this.apiCall = true;
    const json = await res.json();
    clearKlines();
    return json;
  };

  async binanceKlines(symbol, interval, limit, startTime, endTime) {
    try {
      const resp = await this.getKlinesData(symbol, interval, limit, startTime, endTime);
      return resp;
    } catch (e) {
      console.error("Error in Binance Klines", e);
    }
  };

  onReady(callback) {
    requestAnimationFrame(() => {
      callback({
        supports_marks: false,
        supports_timescale_marks: false,
        supports_time: true,
        supported_resolutions: ["1", "3", "5", "15", "30", "60", "120", "240", "360", "480", "720", "1D", "3D", "1W", "1M"]
      });
    });
  }

  resolveSymbol(symbolName, onSymbolResolvedCallback, onResolveErrorCallback) {
    const comps = symbolName.split(":");
    symbolName = (comps.length > 1 ? comps[1] : symbolName).toUpperCase();

    function pricescale(symbol) {
      for (const filter of symbol.filters) {
        if (filter.filterType === "PRICE_FILTER") {
          return Math.round(1 / parseFloat(filter.tickSize));
        }
      }
      return 1;
    }

    for (const symbol of this.symbols) {
      if (symbol.symbol === symbolName) {
        requestAnimationFrame(() => {
          onSymbolResolvedCallback({
            name: symbol.symbol,
            description: symbol.baseAsset + " / " + symbol.quoteAsset,
            ticker: symbol.symbol,
            exchange: "Density",
            listed_exchange: "Density",
            type: "crypto",
            session: "24x7",
            minmov: 1,
            pricescale: pricescale(symbol),
            // timezone: 'UTC',
            has_intraday: true,
            has_daily: true,
            has_weekly_and_monthly: true,
            currency_code: symbol.quoteAsset
          });
        });
        return;
      }
    }
    // minmov/pricescale will give the value of decimal places that will be shown on y-axis of the chart
    //
    onResolveErrorCallback("not found");
  }

  getBars(symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) {
    const interval = this.chartIntervals[resolution];
    if (!interval) {
      onErrorCallback("Invalid interval");
    }

    let totalKlines = [];
    const kLinesLimit = 500;
    const finishKlines = () => {
      if (totalKlines.length === 0) {
        onHistoryCallback([], { noData: true });
      } else {
        const historyCBArray = totalKlines.map((kline) => ({
          time: kline[0],
          open: parseFloat(kline[1]),
          high: parseFloat(kline[2]),
          low: parseFloat(kline[3]),
          close: parseFloat(kline[4]),
          volume: parseFloat(kline[5])
        }));
        onHistoryCallback(historyCBArray, { noData: false });
      }
    };

    const getKlines = async (from, to) => {
      try {
        const data = await this.binanceKlines(symbolInfo.name, interval, kLinesLimit, from, to);
        totalKlines = totalKlines.concat(data);
        if (data !== undefined && data.length === kLinesLimit) {
          from = data[data.length - 1][0] + 1;
          getKlines(from, to);
        } else {
          finishKlines();
        }
      } catch (e) {
        console.error(e);
        onErrorCallback(`Error in 'getKlines' func`);
      }
    };

    from *= 1000;
    to *= 1000;
    getKlines(from, to);
  }

  subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) {
    subscribeOnStream(symbolInfo, resolution, onRealtimeCallback);
    this.resolution = resolution;
  }

  unsubscribeBars(subscriberUID) {
    unsubscribeOnStream(this.selectedSymbol, this.resolution);
  }
}
