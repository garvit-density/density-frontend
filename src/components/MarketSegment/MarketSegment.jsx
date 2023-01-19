// React hooks
import React, { memo, useCallback, useMemo } from "react";
import { numberWithCommas } from "helpers/commaHelper";
import { SymbolPrecisionHelper } from "helpers";

// MUI
import { Box, Tooltip, Typography, Grid } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import InfoIcon from "@mui/icons-material/Info";

// styles and assets
import { tickerValue, tickerHeader, flexObject, aggPrice, Mark, Index, _24h_High, _24h_Low, twentyfourHr_change, loaderObject, Funding_Countdown, Open_interest, _24hrVolume, marketSegmentBox } from "./MarketSegmentObject";
import { Mark_Price, Funding_Rate, Open_Interest, Index_Price } from "../../assets/strings/tooltip.string";

import { useMarketSegmentData } from "../../frontend-BL/businessHooks";
import SideMenu from "../SideMenu/SideMenu";

const MarketSegment = () => {
  const {
    Change24hGenerator,
    markPrice,
    indexPrice,
    fundingCountDown,
    dayHigh,
    dayLow,
    dayVolume,
    selectedOption,
    isloading,
    openInterest,
    LastPrice,
    colorIndicator,
    aggTrade
  } = useMarketSegmentData();

  const changeMarketSpan = useCallback((price = "-", percent = "-", indicator = "#2FDAAF") => <span style={{ color: indicator }}>
  {price} {percent}%
</span>, [Change24hGenerator, Change24hGenerator?.priceChange, Change24hGenerator?.percentageChange]);

  const selectSymbol = useMemo(() => (
      <>
          <SideMenu />
      </>
  ), [selectedOption]);

  const changeMarketSegmentData = useMemo(() => {
    if (Change24hGenerator !== undefined) {
      return changeMarketSpan(Change24hGenerator.priceChange, Change24hGenerator.percentageChange, Change24hGenerator.indicator);
    }
    return changeMarketSpan();
  }, [Change24hGenerator, Change24hGenerator?.priceChange, Change24hGenerator?.percentageChange]);

  const {
    setDecimalPrecision
  } = SymbolPrecisionHelper(selectedOption.toUpperCase());
  const notionalValue = setDecimalPrecision(openInterest.current * LastPrice.lastprice);

  const marketSegmentData = useMemo(() => (
    <Grid
      container
      justifyContent="center"
      alignItems="center">
      <Grid
        item
        xs={6}
        lg={1}>
          <Typography
              sx={{ ...aggPrice, ...((colorIndicator.current > 0 ? { color: "trade.primary" } : parseInt(colorIndicator.current) === 0 ? { color: "text.regular" } : { color: "trade.secondary" })) }}>
            {setDecimalPrecision(aggTrade)}
          </Typography>
      </Grid>
      <Grid
        item
        xs={6}
        lg={1}
        alignItems="center">
          <Typography sx={tickerHeader}>
            {Mark}
            <Tooltip title={Mark_Price} placement="top">
              <InfoIcon sx={{ fontSize: "small", color: "#4F4F4F", marginBottom: "-3px" }}></InfoIcon>
            </Tooltip>
          </Typography>
          <Typography sx={tickerValue}>{setDecimalPrecision(markPrice)}</Typography>
      </Grid>
      <Grid
        item
        xs={6}
        lg={1}>
          <Typography sx={tickerHeader}>{Index}
            <Tooltip title={Index_Price} placement="top">
              <InfoIcon sx={{ fontSize: "small", color: "#4F4F4F", marginBottom: "-3px", marginLeft: "2px" }}></InfoIcon>
            </Tooltip>
          </Typography>
            <Typography sx={tickerValue}>{setDecimalPrecision(indexPrice)}</Typography>
      </Grid>
      <Grid
        item
        xs={6}
        lg={1.8}>
        <Tooltip title={"Last 24hr change in price and its percent"} placement="top">
          <Typography sx={tickerHeader}>{twentyfourHr_change}</Typography>
        </Tooltip>
        <Typography
          sx={tickerValue}>{changeMarketSegmentData}</Typography>
      </Grid>
      <Grid
        item
        xs={6}
        lg={1}
        alignItems="center">
        <Tooltip title={"Highest of last 24 hr"} placement="top">
          <Typography sx={tickerHeader}>{_24h_High}</Typography>
        </Tooltip>
          <Typography sx={tickerValue}>{setDecimalPrecision(dayHigh)}</Typography>
      </Grid>
      <Grid
        item
        xs={6}
        lg={1}>
          <Tooltip title={"Lowest of last 24 hr"} placement="top">
                <Typography sx={tickerHeader}>{_24h_Low}</Typography>
          </Tooltip>
        <Typography sx={tickerValue}>{setDecimalPrecision(dayLow)}</Typography>
      </Grid>
      <Grid
        item
        xs={6}
        lg={1.7}>
        <Tooltip title={"Total volume of last 24hr"} placement="top">
          <Typography sx={tickerHeader}>{_24hrVolume}</Typography>
        </Tooltip>
        <Typography sx={tickerValue}>{numberWithCommas(parseFloat(dayVolume))}</Typography>
      </Grid>
      <Grid
        item
        xs={6}
        lg={1.7}>
        <Typography sx={tickerHeader}>{Funding_Countdown}
          <Tooltip title={Funding_Rate} placement="top">
              <InfoIcon sx={{ fontSize: "small", color: "#4F4F4F", marginBottom: "-3px" }}></InfoIcon>
          </Tooltip>
        </Typography>
          <Typography sx={tickerValue}>{fundingCountDown}</Typography>
      </Grid>
      <Grid
        item
        xs={6}
        lg={1.8}>
          <Typography sx={tickerHeader}>{Open_interest}
          <Tooltip title={Open_Interest} placement="top">
              <InfoIcon sx={{ fontSize: "small", color: "#4F4F4F", marginBottom: "-3px" }}></InfoIcon>
          </Tooltip>
          </Typography>
        <Typography sx={tickerValue}>{notionalValue}</Typography>
      </Grid>
    </Grid>
  ), [aggTrade,
    markPrice,
    dayHigh,
    indexPrice,
    dayLow,
    fundingCountDown,
    dayVolume,
    Change24hGenerator,
    openInterest.current,
    LastPrice]);

  const loader = useMemo(() => (
    <Box sx={loaderObject}>
      <LinearProgress />
    </Box>
  ));

  const renderComponent = useMemo(() => (
    <>
      {selectSymbol}
      {isloading.current ? loader : marketSegmentData}
    </>
  ), [isloading.current, marketSegmentData]);

  return (
    <Grid sx={marketSegmentBox} container>
      <Grid sx={flexObject} item lg={12}>
        {/* <SelectSymbolDrawer/> */}
         {renderComponent}
      </Grid>
    </Grid>
  );
};
export default memo(MarketSegment);
