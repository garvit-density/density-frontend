/* eslint-disable no-unused-vars */
import axiosWithApiServer from "../../frontend-api-service/Utils/axiosHelpers/axiosWithApiServer";
import { GLOBAL_ERROR_REMOVE, GLOBAL_ERROR_ADD, ORDER_CREATION_SUCESS, ORDER_CREATION_FAIL, ORDER_CREATION_TP_SL_SUCESS, ORDER_CREATION_TP_SL_FAIL } from "../../frontend-BL/redux/constants/Constants";

export const createOrder = (params, dispatch) => {
  if (!params.takeProfitEnabled && !params.stopLossEnabled) {
    const axiosWithApiServerPromise = axiosWithApiServer({
      method: "post",
      url:
        "/fapi/v1/order?" +
        "symbol=" +
        params.symbol +
        "&side=" +
        params.side +
        "&type=" +
        (returnOrderType(params)) +
        "&quantity=" +
        params.quantity +
        ((params.type === 2 || params.type === 3)
          ? (("&stopPrice=") + params.triggerPrice)
          : "") +
        ((params.type === 1 || params.type === 3) ? "&price=" + params.price : "") +
        ((params.type === 1 || params.type === 3) ? "&timeInForce=GTC" : "") +
        (params.reduceOnly === true ? "&reduceOnly=true" : ""),
      headers: JSON.stringify({ accept: "*/*" })
    });
    axiosWithApiServerPromise
      .then((response) => {
        dispatch({
          type: GLOBAL_ERROR_ADD,
          payload: {
            src: ORDER_CREATION_SUCESS,
            errorMessage: "Your order has been created successfully",
            errorCode: response.status,
            errorUi: "SNACKBAR",
            dialogType: "success",
            errorHandlerForReduxStateUpdation: () => dispatch({ type: GLOBAL_ERROR_REMOVE, payload: { src: ORDER_CREATION_SUCESS } })
          }
        });
      })
      .catch((err) => {
        dispatch({
          type: GLOBAL_ERROR_ADD,
          payload: {
            src: ORDER_CREATION_FAIL,
            errorMessage: err.response.data.detail,
            errorCode: err.response.status,
            errorUi: "SNACKBAR",
            dialogType: "failure",
            errorHandlerForReduxStateUpdation: () => dispatch({ type: GLOBAL_ERROR_REMOVE, payload: { src: ORDER_CREATION_FAIL } })
          }
        });
      });
  } else if (params.takeProfitEnabled && params.stopLossEnabled) {
    const axiosWithApiServerPromise = axiosWithApiServer({
      method: "post",
      url:
        "/fapi/v1/order?" +
        "symbol=" +
        params.symbol +
        "&side=" +
        params.side +
        "&type=" +
        (returnOrderType(params)) +
        "&quantity=" +
        params.quantity +
        ((params.type === 2 || params.type === 3)
          ? (("&stopPrice=") + params.triggerPrice)
          : "") +
        ((params.type === 1 || params.type === 3) ? "&price=" + params.price : "") +
        ((params.type === 1 || params.type === 3) ? "&timeInForce=GTC" : "") +
        (params.reduceOnly === true ? "&reduceOnly=true" : ""),
      headers: JSON.stringify({ accept: "*/*" })
    });
    axiosWithApiServerPromise
      .then((response) => {
        const batchOrders = JSON.stringify([
          {
            symbol: params.symbol,
            side: params.side === "BUY" ? "SELL" : "BUY",
            type: "TAKE_PROFIT_MARKET",
            quantity: String(params.quantity),
            timeInForce: "GTE_GTC",
            reduceOnly: "true",
            stopPrice: String(params.takeProfit)
          },
          {
            symbol: params.symbol,
            side: params.side === "BUY" ? "SELL" : "BUY",
            type: "STOP_MARKET",
            quantity: String(params.quantity),
            timeInForce: "GTE_GTC",
            reduceOnly: "true",
            stopPrice: String(params.stopLoss)
          }
        ]);
        const axiosWithApiServerPromise = axiosWithApiServer({
          method: "post",
          url: "/fapi/v1/batchOrders?batchOrders=" + batchOrders,
          headers: JSON.stringify({ accept: "*/*" })
        });
        axiosWithApiServerPromise
          .then((response) => {
            dispatch({
              type: GLOBAL_ERROR_ADD,
              payload: {
                src: ORDER_CREATION_TP_SL_SUCESS,
                dialogType: "success",
                errorMessage: "Your TP/SL order has been created successfully",
                errorCode: 200,
                errorUi: "SNACKBAR",
                errorHandlerForReduxStateUpdation: () => dispatch({ type: GLOBAL_ERROR_REMOVE, payload: { src: ORDER_CREATION_TP_SL_SUCESS } })
              }
            });
          })
          .catch((err) => {
            dispatch({
              type: GLOBAL_ERROR_ADD,
              payload: {
                src: ORDER_CREATION_TP_SL_FAIL,
                errorMessage: err.response.data.detail,
                errorCode: err.response.status,
                errorUi: "SNACKBAR",
                dialogType: "failure",
                errorHandlerForReduxStateUpdation: () => dispatch({ type: GLOBAL_ERROR_REMOVE, payload: { src: ORDER_CREATION_TP_SL_FAIL } })
              }
            });
          });
      })
      .catch((err) => {
        dispatch({
          type: GLOBAL_ERROR_ADD,
          payload: {
            src: ORDER_CREATION_FAIL,
            errorMessage: err.response.data.detail,
            errorCode: err.response.status,
            errorUi: "SNACKBAR",
            dialogType: "failure",
            errorHandlerForReduxStateUpdation: () => dispatch({ type: GLOBAL_ERROR_REMOVE, payload: { src: ORDER_CREATION_FAIL } })
          }
        });
      });
  } else {
    const subOrderType = (params.takeProfitEnabled === true ? "TAKE_PROFIT_MARKET" : "STOP_MARKET");
    const subOrderStopPrice = params.takeProfitEnabled === true ? params.takeProfit : params.stopLoss;
    const axiosWithApiServerPromise = axiosWithApiServer({
      method: "post",
      url:
        "/fapi/v1/order?" +
        "symbol=" +
        params.symbol +
        "&side=" +
        params.side +
        "&type=" +
        (returnOrderType(params)) +
        "&quantity=" +
        params.quantity +
        ((params.type === 2 || params.type === 3)
          ? (("&stopPrice=") + params.triggerPrice)
          : "") +
        ((params.type === 1 || params.type === 3) ? "&price=" + params.price : "") +
        ((params.type === 1 || params.type === 3) ? "&timeInForce=GTC" : "") +
        (params.reduceOnly === true ? "&reduceOnly=true" : ""),
      headers: JSON.stringify({ accept: "*/*" })
    });
    axiosWithApiServerPromise
      .then((response) => {
        const axiosWithApiServerPromise = axiosWithApiServer({
          method: "post",
          url:
            "/fapi/v1/order?" +
            "symbol=" +
            params.symbol +
            "&side=" +
            (params.side === "BUY" ? "SELL" : "BUY") +
            "&type=" +
            subOrderType +
            "&quantity=" +
            params.quantity +
            ((params.type === 1 || params.type === 3) ? "&timeInForce=GTE_GTC" : "") +
            ("&reduceOnly=true&stopPrice=" + subOrderStopPrice),
          headers: JSON.stringify({ accept: "*/*" })
        });
        axiosWithApiServerPromise
          .then((response) => {
            dispatch({
              type: GLOBAL_ERROR_ADD,
              payload: {
                src: ORDER_CREATION_TP_SL_SUCESS,
                errorMessage: "Your TP/SL order has been created successfully",
                errorCode: 200,
                errorUi: "SNACKBAR",
                dialogType: "success",
                errorHandlerForReduxStateUpdation: () => dispatch({ type: GLOBAL_ERROR_REMOVE, payload: { src: ORDER_CREATION_TP_SL_SUCESS } })
              }
            });
          })
          .catch((err) => {
            dispatch({
              type: GLOBAL_ERROR_ADD,
              payload: {
                src: ORDER_CREATION_TP_SL_FAIL,
                errorMessage: err.response.data.detail,
                errorCode: err.response.status,
                errorUi: "SNACKBAR",
                dialogType: "failure",
                errorHandlerForReduxStateUpdation: () => dispatch({ type: GLOBAL_ERROR_REMOVE, payload: { src: ORDER_CREATION_TP_SL_FAIL } })
              }
            });
          });
      })
      .catch((err) => {
        dispatch({
          type: GLOBAL_ERROR_ADD,
          payload: {
            src: ORDER_CREATION_FAIL,
            errorMessage: err.response.data.detail,
            errorCode: err.response.status,
            errorUi: "SNACKBAR",
            dialogType: "failure",
            errorHandlerForReduxStateUpdation: () => dispatch({ type: GLOBAL_ERROR_REMOVE, payload: { src: ORDER_CREATION_FAIL } })
          }
        });
      });
  }
};

const returnOrderType = (params) => {
  if (params.type === 0) return "MARKET";
  if (params.type === 1) return "LIMIT";
  if (params.type === 2) {
    if (params.side === "BUY") {
      if (params.triggerPrice >= params.lastTradedPrice) { return "STOP_MARKET"; } else { return "TAKE_PROFIT_MARKET"; };
    } else if (params.side === "SELL") {
      if (params.triggerPrice <= params.lastTradedPrice) { return "STOP_MARKET"; } else { return "TAKE_PROFIT_MARKET"; };
    }
  }
  if (params.type === 3) {
    if (params.side === "BUY") {
      if (params.triggerPrice >= params.lastTradedPrice) { return "STOP"; } else { return "TAKE_PROFIT"; };
    } else if (params.side === "SELL") {
      if (params.triggerPrice <= params.lastTradedPrice) { return "STOP"; } else { return "TAKE_PROFIT"; };
    }
  }
};
