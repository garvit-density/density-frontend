/* eslint-disable no-unused-vars */
import React from "react";
import { Grid, Typography } from "@mui/material";
import { symbolLogoStyle, symbolNameTypography } from "./MarketTableStyles.js";
import { getCurrencyUrl } from "helpers/CurrencyLogo.js";
import { sxColorUtility } from "helpers/SxColorUtility.js";
import NavigateToTradeScreenWithSelectedSymbol from "helpers/NavigateToTradeScreenWithSelectedSymbol.js";
import typography from "assets/Theme/typography.js";
const USDT = "USDT";
const Trade = "Trade";

const calculateSide = (value) => {
  if (parseFloat(value) >= 0) {
    return "LONG";
  } else {
    return "SHORT";
  }
};

const TradeTypography = {
  ...typography.SemiBold_14,
  color: "primary.main"
};
const tableCellTypography = {
  ...typography.SemiBold_14,
  padding: "8px",
  color: "#BDBDBD"
};

export const columns = [
  {
    field: "Symbol",
    headerName: "Symbol",
    width: 250,
    renderCell: (params) =>
    <>
        <Grid container>
              <Grid item>
                <img
                  src={getCurrencyUrl(params.row.Symbol.replace(USDT, "").toLowerCase())}
                  alt={params.row.Symbol}
                  style={symbolLogoStyle} />
              </Grid>
              <Grid item pt={1}>
                <Typography variant="p" sx={symbolNameTypography} color={"white"}>
                  {params.row.Symbol?.toUpperCase()}
                </Typography>
              </Grid>
        </Grid>
    </>
  },
  {
    field: "Last Traded Price",
    headerName: "Price(USDT)",
    width: 190,
    renderCell: (params) =>
    <>
      <Typography sx={{ ...tableCellTypography, ...(params.row.colorIndicator >= 0 ? { color: "trade.primary" } : { color: "trade.secondary" }) }}>{params.row["Last Traded Price"]}</Typography>
    </>
  },
  {
    field: "24h Change %",
    headerName: "24h Change %",
    width: 190,
    renderCell: (params) =>
    <>
      <Typography sx={sxColorUtility(calculateSide(params.row["24h Change %"]), tableCellTypography)}>{params.row["24h Change %"]}</Typography>
    </>
  },
  {
    field: "24h High",
    headerName: "24h High",
    width: 190,
    renderCell: (params) => <><Typography sx={tableCellTypography}>{params.row["24h High"]}</Typography></>
  },
  {
    field: "24h Low",
    headerName: "24h Low",
    width: 190,
    renderCell: (params) => <><Typography sx={tableCellTypography}>{params.row["24h Low"]}</Typography></>
  },
  {
    field: "24h Volume",
    headerName: "24h Volume (USDT)",
    width: 190,
    renderCell: (params) => <><Typography sx={tableCellTypography}>{params.row["24h Volume"]}</Typography></>
  },
  {
    field: "Trade",
    headerName: "Trade",
    width: 190,
    renderCell: (params) => <><a style={{ textDecoration: "none" }} href="/" target="_blank"><Typography onClick={() => NavigateToTradeScreenWithSelectedSymbol(params.row.Symbol)} sx={TradeTypography}>{Trade}</Typography></a></>
  }
];
