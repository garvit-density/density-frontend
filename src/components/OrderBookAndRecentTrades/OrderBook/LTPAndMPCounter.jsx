/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useRef, useState } from "react";
// import { Chip, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { SymbolPrecisionHelper } from "helpers";
// import typography from "assets/Theme/typography";
import { BINANCE_SUBSCRIBTION_SERVICE, SUB_SRC_MAP } from "../../../frontend-BL/services/BinanceWebSocketService/Constants";
import { BINANCE_WS_SUBSCRIBE, BINANCE_WS_UNSUBSCRIBE } from "../../../frontend-BL/redux/constants/Constants";
import { Chip, Grid, Typography } from "@mui/material";
import typography from "assets/Theme/typography";
import AutocompleteSearch from "components/UI/AutoCompleteSearch/AutoCompleteSearch";
import { getTradableCoins } from "frontend-BL/redux/actions/Futures/GetTradableCoins.ac";
import { selectedSymbol } from "frontend-BL/redux/actions/Internal/SetSelectedSymbol.ac";

const LTPAndMPCounter = () => {
  const colorIndicator = useRef(0);
  const previousLastTradedPrice = useRef(0);
  const getSelectSymbol = useSelector((state) => state.selectSymbol.selectedSymbol);

  const { setDecimalPrecision } = SymbolPrecisionHelper(getSelectSymbol || window.localStorage.selectedSymbolAuxiliary);
  const binanceWsStatus = useSelector((state) => state.wsConnection.binance.opened);
  const getTradableSymbolListFromServer = useSelector((state) => state.tradablesymbolList.tradablesymbolList);
  const dispatch = useDispatch();

  let ltp = useSelector((state) => state.BinanceStreamData.ltp);

  // ltp = ltp.length && ltp[0].ltp;

  // ALways get latest ltp price
  ltp = ltp.length && ltp[ltp.length - 1].ltp;

  const SELECTEDSYMBOL = useCallback(
    (value) => {
      if (value !== null) {
        dispatch(selectedSymbol(value.toLowerCase()));
      }
    },
    [getSelectSymbol]
  );

  useEffect(() => {
    dispatch(getTradableCoins());
  }, []);
  useEffect(() => {
    if (binanceWsStatus) {
      dispatch({
        type: BINANCE_WS_SUBSCRIBE,
        payload: {
          symbol: getSelectSymbol || window.localStorage.selectedSymbolAuxiliary,
          methods: [BINANCE_SUBSCRIBTION_SERVICE.ltp],
          source: SUB_SRC_MAP.RT,
          res: ""
        }
      });
    }
    if (ltp) {
      if (previousLastTradedPrice.current === 0) previousLastTradedPrice.current = ltp;
      parseFloat(ltp) - parseFloat(previousLastTradedPrice.current) > 0
        ? (colorIndicator.current = 1)
        : parseFloat(ltp) - parseFloat(previousLastTradedPrice.current) < 0
          ? (colorIndicator.current = -1)
          : (colorIndicator.current = 0);
      previousLastTradedPrice.current = ltp;
    }
    return () =>
      dispatch({
        type: BINANCE_WS_UNSUBSCRIBE,
        payload: {
          symbol: getSelectSymbol || window.localStorage.selectedSymbolAuxiliary.toUpperCase(),
          methods: [BINANCE_SUBSCRIBTION_SERVICE.ltp],
          source: SUB_SRC_MAP.RT,
          res: ""
        }
      });
  }, [ltp, getSelectSymbol]);

  return (
    <>
      <Grid container>
        <Grid container justifyContent={"flex-end"} alignItems={"center"} xs={6}>
          <Chip sx={{ textTransform: "uppercase" }} label={getSelectSymbol}></Chip>
          <Typography
            variant="h6"
            sx={{
              ...(colorIndicator.current > 0 ? { color: "trade.primary" } : parseInt(colorIndicator.current) === 0 ? { color: "text.primary" } : { color: "trade.secondary" }),
              padding: "8px",
              textAlign: "center",
              ...typography.Regular_16
            }}
          >
            {setDecimalPrecision(ltp)}
          </Typography>
        </Grid>
        <Grid container justifyContent={"center"} xs={6}>
          <AutocompleteSearch options={getTradableSymbolListFromServer} onchange={SELECTEDSYMBOL} />
        </Grid>
      </Grid>
    </>
  );
};

export default React.memo(LTPAndMPCounter);
