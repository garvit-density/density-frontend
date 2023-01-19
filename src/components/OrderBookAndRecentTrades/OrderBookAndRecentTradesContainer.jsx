import React, { useEffect } from "react";
// Mui lib
// import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Grid, Typography } from "@mui/material";
// components and helper components
import Trades from "./Trades/Trades";
import OrderBook from "./OrderBook/OrderBook";
// Assets,style, strings, constants objects
import { orderbookContainerBox } from "./OrderBookAndRecentTrades.style";

import { useDispatch } from "react-redux";

import { BINANCE_WS_CONNECT, BINANCE_WS_DISCONNECT } from "../../frontend-BL/redux/constants/Constants";

import { getTradableCoins } from "../../frontend-BL/redux/actions/Futures/GetTradableCoins.ac";
import LTPAndMPCounter from "./OrderBook/LTPAndMPCounter";
import { useParams } from "react-router-dom";
import { selectedSymbol } from "frontend-BL/redux/actions/Internal/SetSelectedSymbol.ac";

export default function OrderBookAndRecentTradesContainer() {
  const dispatch = useDispatch();
  const { symbol } = useParams();
  useEffect(() => {
    dispatch(selectedSymbol(symbol.toLowerCase()));
    dispatch({ type: BINANCE_WS_CONNECT });
    dispatch(getTradableCoins());
    return () => dispatch({ type: BINANCE_WS_DISCONNECT });
  }, [dispatch]);

  return (
    <Box mt={2} sx={orderbookContainerBox} id="box">
      <Grid container>
        <Grid item lg={12} sx={{ my: 2 }}>
          <LTPAndMPCounter />
        </Grid>
        <Grid item lg={6}>
          <Typography sx={{ textAlign: "center", padding: "5px" }}>OrderBook</Typography>
          <OrderBook />
        </Grid>
        <Grid item lg={6}>
          <Typography sx={{ textAlign: "center", padding: "5px" }}>Recent trades</Typography>
          <Trades />
        </Grid>
      </Grid>
    </Box>
  );
}
