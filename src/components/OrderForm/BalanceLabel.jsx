import React from "react";

import { Grid, Typography } from "@mui/material";

import { numberWithCommas } from "helpers/commaHelper";

import PropTypes from "prop-types";

import { Box } from "@mui/system";
import { ORDERFORM_CONSTANTS } from "../../frontend-BL/businessHooks/ORDER_FORM/Constants/Orderform_const";

const BalanceLabel = ({ balanceSettlementCurrency, settlementCurrencyType, type, xsf }) => {
  return (
        <Grid container mt="5%" display="flex" justifyContent="space-between">
          <Grid item container>
            <Grid xs={6} item display="flex" justifyContent="left">
              <Typography variant={"SemiBold_12"} color="#FBFAFB"> {ORDERFORM_CONSTANTS.AVAILABLE_BALANCE_LABEL}
             <Box sx={{ display: "none" }}>{(type === 1 || type === 2) ? (xsf = 12) : (xsf = 6)}</Box>
              </Typography>
            </Grid>
            <Grid xs={6} item display="flex" justifyContent="right">
              <Typography variant={"SemiBold_12"} color="#FBFAFB" >{numberWithCommas(balanceSettlementCurrency) + " " + settlementCurrencyType}</Typography>
            </Grid>
          </Grid>
        </Grid>
  );
};

BalanceLabel.propTypes = {
  balanceSettlementCurrency: PropTypes.number,
  settlementCurrencyType: PropTypes.string,
  type: PropTypes.number,
  xsf: PropTypes.number
};

export default React.memo(BalanceLabel);
