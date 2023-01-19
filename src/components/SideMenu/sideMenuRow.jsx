import React, { memo, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrencyUrl } from "helpers/CurrencyLogo";
import { selectedSymbol } from "../../frontend-BL/redux/actions/Internal/SetSelectedSymbol.ac";
import { sxColorUtility, SymbolPrecisionHelper } from "helpers";

import PropTypes from "prop-types";
// MUI
import { Grid, Box, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
// Redux, actions and reducers
import { noAuthRemoveFavouriteSymbol, noAuthSetFavouriteSymbol, removeFavouriteSymbol, setFavouriteSymbol } from "../../frontend-BL/redux/actions/User/SetFavouriteSymbol.ac";
// import { removeFavouriteSymbol, setFavouriteSymbol } from "/redux/actions/User/SetFavouriteSymbol.ac";
// import { BINANCE_WS_UNSUBSCRIBE } from "../../frontend-BL/redux/constants/Constants";

// Assets, images, strings and constants
import { Typography, menu, SymbolLogo } from "./sidemenuobject";
// Components and helper components
// Websockets
import NavigateToTradeScreenWithSelectedSymbol from "helpers/NavigateToTradeScreenWithSelectedSymbol";
import { font12, font14 } from "./style";
import { useCheckLoginStatus } from "frontend-BL/services/ThirdPartyServices/SuperTokens/SuperTokenHelper";
// import { useCheckLoginStatus } from "services/ThirdPartyServices/SuperTokens/SuperTokenHelper";
const SideMenuRow = (props) => {
  const { isLoggedIn } = useCheckLoginStatus();
  const { symbol, percentage, lp, cb, sRefSet } = props;
  const dispatch = useDispatch();
  const handleChangeSelect = useCallback(() => {
    cb();
    sRefSet(symbol);
    dispatch(selectedSymbol(symbol.toLowerCase()));
    NavigateToTradeScreenWithSelectedSymbol(symbol);
  }, []);

  const isFavouriteSymbol = useSelector((state) => state.favouriteSymbols && state.favouriteSymbols.favouriteSymbols && state.favouriteSymbols.favouriteSymbols.includes(symbol));
  const handleFavClick = () => {
    switch (isLoggedIn) {
      case true:
        if (isFavouriteSymbol !== undefined && isFavouriteSymbol) {
          dispatch(removeFavouriteSymbol(symbol));
        } else {
          dispatch(setFavouriteSymbol(symbol));
        }
        break;
      case false:
        if (isFavouriteSymbol !== undefined && isFavouriteSymbol) {
          dispatch(noAuthRemoveFavouriteSymbol(symbol));
        } else {
          dispatch(noAuthSetFavouriteSymbol(symbol));
        }

        // code block
        break;
      // code block
    }
  };

  // unnecessary useCallback
  const getSign = useCallback((val) => (Math.sign(val) === 1 ? "+" : ""), []);
  const USDT = "USDT";
  // unnecessary use  memo
  const symbolLogo = useMemo(() => getCurrencyUrl(symbol.replace(USDT, "").toLowerCase()), [symbol]);

  return (
    <>
      <Box sx={{ height: "45px", borderBottom: "1px solid", borderColor: "borderColor.secondary" }}>
        <MenuItem sx={[menu]} value={symbol}>
          <Grid item xs={1.25}>
            <ListItemIcon onClick={handleFavClick}>{isFavouriteSymbol ? <StarIcon sx={{ color: "background.mindaro" }} /> : <StarBorderIcon sx={{ color: "#F2F2F2" }} />}</ListItemIcon>
          </Grid>

          <Grid xs={10.75} container direction="row" justifyContent="space-between" alignItems="center" onClick={(event) => handleChangeSelect()}>
            <Grid item xs={4} sx={{ display: "flex" }}>
              <img style={SymbolLogo} src={symbolLogo} alt={symbol} />

              <ListItemText
                primary={symbol.toLowerCase()}
                primaryTypographyProps={{
                  textTransform: "uppercase",
                  fontSize: font12.fontSize,
                  color: "background.whitemild"
                }}
              />
            </Grid>
            <Grid item xs={2}>
              {
                <ListItemText
                  primary={`$ ${SymbolPrecisionHelper(symbol).setDecimalPrecision(lp)}`}
                  primaryTypographyProps={{
                    fontSize: font14.fontSize,
                    color: "background.whitemild"
                  }}
                />
              }
            </Grid>
            <Grid item xs={2}>
              <ListItemText
                primary={`${getSign(Number(percentage))}${percentage} %`}
                sx={{
                  fontSize: font12.fontSize,
                  textAlign: "right"
                }}
                primaryTypographyProps={sxColorUtility(Number(percentage), Typography)}
              />
            </Grid>
          </Grid>
        </MenuItem>
      </Box>
    </>
  );
};

SideMenuRow.propTypes = {
  percentage: PropTypes.string,
  lp: PropTypes.string,
  symbol: PropTypes.string,
  cb: PropTypes.func,
  name: PropTypes.string,
  sRefSet: PropTypes.func
};

export default memo(SideMenuRow);
