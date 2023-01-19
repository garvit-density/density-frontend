import React from "react";

import { Grid, Typography } from "@mui/material";

import PropTypes from "prop-types";
import { ORDERFORM_CONSTANTS } from "../../frontend-BL/businessHooks/ORDER_FORM/Constants/Orderform_const";

const MaximumBuyingPower = ({ leverageFromServer, balanceSettlementCurrency, pricePrecisionValue, settlementCurrencyType }) => {
  return (
        <Grid container mt="2%" mb="-2%" display="flex" justifyContent="space-between" >
        <Grid item container>
          <Grid xs={6} item display={"flex"}>
            <Typography variant= {"Regular_12"} color="#FBFAFB">{ORDERFORM_CONSTANTS.MAX_BUYING_POWER_LABEL}</Typography>
          </Grid>
          <Grid xs={6} item display={"flex"} justifyContent={"right"}>
            <Typography variant={"SemiBold_12"} color="#FBFAFB">{((leverageFromServer * balanceSettlementCurrency) || 0).toFixed(pricePrecisionValue) + " " + settlementCurrencyType}</Typography>
          </Grid>
        </Grid>
      </Grid>
  );
};

MaximumBuyingPower.propTypes = {
  leverageFromServer: PropTypes.number,
  balanceSettlementCurrency: PropTypes.number,
  pricePrecisionValue: PropTypes.number,
  settlementCurrencyType: PropTypes.string
};

export default React.memo(MaximumBuyingPower);
