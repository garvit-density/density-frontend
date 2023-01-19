/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Container, Grid, Typography } from "@mui/material";

import "./RecentTradesList.scss";
import { recentTradesListContainer, recentTypography, contractAssetTypography, settlementCurrencyTypeTypography, tradeValueTypography, timestampTypography } from "./RecentTradesList.style";
import contractAssetLogo from "cryptocurrency-icons/svg/color/btc.svg"; // take contractAsset value from global state

import { userTradesApi } from "../../../api-server/Api/Futures";

import { useSelector, useDispatch } from "react-redux";

import { setRecentUserTrades } from "../../../redux/actions/Futures/GetRecentUserTrades.ac";

import Avatar from "@mui/material/Avatar";

function RecentTradesList() {
  const recentTradesList = useSelector((state) => state.userRecentTrades.recentUserTrades);
  recentTradesList.reverse();

  const dispatch = useDispatch();
  let contractAsset = "";
  let settlementCurrencyType = "";
  const getSymbolList = useSelector((state) => state.tradablesymbolList.tradablesymbolList);
  const selectedSymbol = useSelector((state) => state.selectSymbol && state.selectSymbol.selectedSymbol);
  if (getSymbolList.length && selectedSymbol.length) {
    const selectedContract = getSymbolList.filter((contract) => contract.symbol.toLowerCase() === selectedSymbol);
    contractAsset = selectedContract[0].baseAsset;
    settlementCurrencyType = selectedContract[0].quoteAsset;
  }

  useEffect(() => {
    if (contractAsset.length && settlementCurrencyType.length) {
      userTradesApi(contractAsset + settlementCurrencyType)
        .then((successResponse) => {
          dispatch(setRecentUserTrades(true, successResponse));
        })
        .catch((errorMessage) => {
          dispatch(setRecentUserTrades(false, errorMessage));
        });
    }
  }, [contractAsset, settlementCurrencyType]);

  function formatTimefromTimestamp(timestamp) {
    return [timestamp.getDate(),
      timestamp.getMonth() + 1,
      timestamp.getFullYear()].join("/") + " " +
     [timestamp.getHours(),
       timestamp.getMinutes(),
       timestamp.getSeconds()].join(":");
  }

  return (
    <Container id="recentTradesListContainer" sx={recentTradesListContainer}>
      <Grid py={1}>
        <Typography variant="p" sx={recentTypography}>
          {"Recent Trades"}
        </Typography>
      </Grid>
      <Grid id="recentTradesHolder">
        {(recentTradesList.length === 0) && <Typography sx={{ marginTop: "25px" }} variant="p" color="white">
          {"No records found"}
        </Typography> }
        {recentTradesList.map((trade) => {
          return (
            <Grid key={trade.id} className="executedTrade">
              <Grid container className="tradeLabel">
                <Grid item container className="contractIdentifier">
                  <Grid item className="contractAssetImage">
                    <Avatar src={"https://static-dev.density.exchange/icons/" + contractAsset.toLowerCase() + ".svg"} sx={{ width: 20, height: 20 }} />
                  </Grid>
                  <Grid item className="contractAsset">
                    <Typography variant="p" sx={contractAssetTypography}>
                      {contractAsset}
                    </Typography>
                  </Grid>
                  <Grid item className="settlementCurrencyType">
                    <Typography varaint="p" sx={settlementCurrencyTypeTypography}>
                      {settlementCurrencyType}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item className="tradeStatus">
                  <Typography varaint="p" sx={settlementCurrencyTypeTypography}>
                    {trade.status}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container className="tradeValue">
                <Grid item className="tradeQuantity">
                  <Typography variant="p" sx={tradeValueTypography}>
                    {(trade.origQty * trade.avgPrice).toFixed(3) + " " + settlementCurrencyType}
                  </Typography>
                </Grid>
                <Grid item className="tradePosition">
                  <Typography variant="p" sx={tradeValueTypography}>
                    {trade.side === "BUY" ? "Long" : "Sell"}
                  </Typography>
                </Grid>
              </Grid>
              <Typography varaint="p" sx={timestampTypography}>
                  {formatTimefromTimestamp(new Date(trade.time))}
                </Typography>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}

// eslint-disable-next-line react/display-name
const ContractAssetImage = React.memo(() => {
  return <img className="contractAssetLogo" src={contractAssetLogo} alt="contract-asset-logo" />;
});

export default RecentTradesList;
