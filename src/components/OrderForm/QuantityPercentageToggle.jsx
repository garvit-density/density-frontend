import React from "react";

import { ToggleButtonGroup, Grid } from "@mui/material";

import { ToggleButton3 } from "./OrderForm.styled";

import PropTypes from "prop-types";
import { ORDERFORM_CONSTANTS } from "../../frontend-BL/businessHooks/ORDER_FORM/Constants/Orderform_const";

const QuantityPercentageToggle = ({ handleQuantityPercentageChange, quantityPercentage }) => {
  return (
        <Grid item>
            <ToggleButtonGroup id="quantityPercentageSelectToggle" exclusive onChange={handleQuantityPercentageChange} value={quantityPercentage}>
                <ToggleButton3 value={25}>{ORDERFORM_CONSTANTS.PERCENTAGE_LABEL_25}</ToggleButton3>
                <ToggleButton3 value={50}>{ORDERFORM_CONSTANTS.PERCENTAGE_LABEL_50}</ToggleButton3>
                <ToggleButton3 value={75}>{ORDERFORM_CONSTANTS.PERCENTAGE_LABEL_75}</ToggleButton3>
                <ToggleButton3 value={100}>{ORDERFORM_CONSTANTS.PERCENTAGE_LABEL_100}</ToggleButton3>
            </ToggleButtonGroup>
        </Grid>
  );
};

QuantityPercentageToggle.propTypes = {
  handleQuantityPercentageChange: PropTypes.func,
  quantityPercentage: PropTypes.number
};

export default React.memo(QuantityPercentageToggle);
