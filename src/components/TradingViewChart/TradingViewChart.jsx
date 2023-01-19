/* eslint-disable new-cap */
import React, { useEffect, useMemo } from "react";
import "./TradingViewChart.scss";
import { useSelector } from "react-redux";
import { utcToZonedTime } from "date-fns-tz";
import { SetSelectedSymbolHelper } from "helpers/SetSelectedSymbolHelper";
import BinanceAPI from "./ChartHandler";
import { TRADING_VIEW_CONSTANTS } from "./TradingView_Constants";
import { GetAppURL } from "../../frontend-api-service/Base";

const TradingViewChart = () => {
  const selectedOption = useSelector((state) => state.selectSymbol.selectedSymbol);
  const symbolData = useSelector((state) => state.tradablesymbolList.tradablesymbolList);
  const currentSymbolData = useMemo(() => {
    if (symbolData.length !== 0) return symbolData.filter((data) => data.symbol === selectedOption.toUpperCase());
    return [];
  }, [symbolData, selectedOption]);

  const date = new Date();

  const currentDate = new Date(date.valueOf() + date.getTimezoneOffset() * 60000);

  function timeToTz(currentDate, timeZone) {
    const zonedDate = utcToZonedTime(new Date(currentDate * 1000), timeZone);
    return zonedDate.getTime() / 1000;
  }

  const chartData = useMemo(() => {
    if (selectedOption.length > 0) {
      return new BinanceAPI({ debug: false, selectedSymbol: selectedOption, selectedSymbolData: currentSymbolData });
    }
  }, [selectedOption]);
  const widgetOptions = {
    locale: navigator.language.split("-")[0] || "en-IN",
    debug: false,
    fullscreen: false,
    symbol: selectedOption ? selectedOption.toUpperCase() : SetSelectedSymbolHelper(),
    interval: "60",
    theme: "dark",
    toolbar_bg: "#2c2c34",
    allow_symbol_change: true,
    timezone: timeToTz(currentDate, Intl.DateTimeFormat().resolvedOptions().timeZone),
    autosize: true,
    container_id: "chart_container",
    datafeed: chartData,
    library_path: "/scripts/charting_library/",
    custom_css_url: "/css/my-custom-css.css",
    disabled_features: ["timeframes_toolbar", "header_undo_redo", "header_symbol_search", "symbol_search_hot_key"],
    overrides: {
      "paneProperties.backgroundType": "solid",
      "paneProperties.background": "#2c2c34",
      "paneProperties.textColor": "#101010",
      "paneProperties.vertGridProperties.color": "#454545",
      "paneProperties.horzGridProperties.color": "#454545",
      "paneProperties.crossHairProperties.color": "#ffffff",
      "mainSeriesProperties.candleStyle.borderUpColor": "#29B57E",
      "mainSeriesProperties.candleStyle.borderDownColor": "#F46151",
      "mainSeriesProperties.candleStyle.borderColor": "#29B57E",
      "mainSeriesProperties.candleStyle.upColor": "#29B57E",
      "mainSeriesProperties.candleStyle.downColor": "#F46151",
      "mainSeriesProperties.candleStyle.wickColor": "#29B57E",
      "mainSeriesProperties.candleStyle.wickUpColor": "#29B57E",
      "mainSeriesProperties.candleStyle.wickDownColor": "#F46151",
      "scalesProperties.textColor": "white",
      "scalesProperties.backgroundColor": "#171717",
      "symbolWatermarkProperties.color": "rgba(0, 0, 0, 0.00)",
      "symbolWatermarkProperties.visibility": false
    }
  };

  useEffect(() => {
    if (currentSymbolData.length > 0) {
      let tradingViewWidget = [];
      tradingViewWidget = window.tvWidget = new window.TradingView.widget(widgetOptions);
      if (tradingViewWidget) {
        tradingViewWidget.onChartReady(() => {
          const depthButton = tradingViewWidget.createButton();
          depthButton.style = "cursor:pointer";
          depthButton.addEventListener("click", () => window.open(GetAppURL() + `/orderbook/${currentSymbolData[0].symbol}`));
          depthButton.innerHTML = TRADING_VIEW_CONSTANTS.DEPTH_BOOK_LABEL;
          TradingViewChart.chartObject = tradingViewWidget.activeChart();
          tradingViewWidget.chart();
        });
      }
    }
  }, [currentSymbolData.length, selectedOption, currentSymbolData]);
  return <div id="chart_container"></div>;
};

export default TradingViewChart;
