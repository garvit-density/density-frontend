import React from "react";
import { Grid, Typography, Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import PropTypes from "prop-types";
import { Margin_Ratio } from "assets/strings/tooltip.string";
import { MINSIZELABEL, MINSIZEVALUE } from "./style";
import { ORDERFORM_CONSTANTS } from "../../frontend-BL/businessHooks/ORDER_FORM/Constants/Orderform_const";

const ContractAndOrderPlacementDetails = ({ minimumNotionalValue, settlementCurrencyType, contractAssetPrecision, contractAsset, costValue, pricePrecisionValue, type, lastTradedPrice, limitPriceContractAsset }) => {
  return (
        <Grid container mt="5%">
        <Grid container item>
          <Grid item container>
            <Grid xs={4} item>
              <Typography sx={MINSIZELABEL}>{ORDERFORM_CONSTANTS.MINIMUM_QUANTITY_LABEL}</Typography>
            </Grid>
            <Grid xs={8} item display="flex" alignItems="center" justifyContent="right">
              <Typography sx={MINSIZEVALUE}>{" > " + minimumNotionalValue + " " + settlementCurrencyType}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container item>
          <Grid item container>
            <Grid xs={4} item >
              <Typography sx={MINSIZELABEL}>{ORDERFORM_CONSTANTS.STEP_SIZE_LABEL}</Typography>
            </Grid>
            <Grid xs={8} item display="flex" alignItems="center" justifyContent="right">
              <Typography sx={MINSIZEVALUE}>{Math.pow(10, -contractAssetPrecision) + " " + contractAsset + " (" + (Math.pow(10, -contractAssetPrecision) * ((type === 0 || type === 2) ? lastTradedPrice : limitPriceContractAsset)).toFixed(pricePrecisionValue) + " " + settlementCurrencyType + ")"}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container item id="tradingFeeContainer" display="flex" alignItems="center">
          <Grid xs={5} item display="flex">
            <Typography variant={"Regular_12"} color="#FBFAFB" sx={{ display: "flex", alignItems: "center" }}>
              {ORDERFORM_CONSTANTS.MARGIN_USED_LABEL}
              <Tooltip title={Margin_Ratio} placement="top-start">
                <InfoIcon sx={{ fontSize: "small", color: "text.darkliver" }}></InfoIcon>
              </Tooltip>
              </Typography>
          </Grid>
          <Grid xs={7} item>
            <Typography variant={"SemiBold_12"} sx={MINSIZEVALUE}>{(costValue || 0).toFixed(pricePrecisionValue) + " " + settlementCurrencyType}</Typography>
          </Grid>
        </Grid>
        </Grid>
  );
};

ContractAndOrderPlacementDetails.propTypes = {
  minimumNotionalValue: PropTypes.string,
  settlementCurrencyType: PropTypes.string,
  contractAssetPrecision: PropTypes.number,
  contractAsset: PropTypes.string,
  costValue: PropTypes.number,
  pricePrecisionValue: PropTypes.number,
  type: PropTypes.number,
  lastTradedPrice: PropTypes.number,
  limitPriceContractAsset: PropTypes.number

};

export default React.memo(ContractAndOrderPlacementDetails);
