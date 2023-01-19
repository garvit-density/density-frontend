import React from "react";

import { ToggleButtonGroup, Grid } from "@mui/material";

import { ToggleButton3 } from "./OrderForm.styled";

import PropTypes from "prop-types";
import { ORDERFORM_CONSTANTS } from "../../frontend-BL/businessHooks/ORDER_FORM/Constants/Orderform_const";

const LeverageToggleSelect = ({ handleLeverageChange, leverage }) => {
  return (
        <Grid item>
            <ToggleButtonGroup id="leverageSelectToggle" exclusive onChange={handleLeverageChange} value={leverage}>
                <ToggleButton3 id="unitLeverageChange" value={1}>
                    1x
                </ToggleButton3>
                <ToggleButton3 value={2}>{ORDERFORM_CONSTANTS.LEVERAGE_2X}</ToggleButton3>
                <ToggleButton3 value={3}>{ORDERFORM_CONSTANTS.LEVERAGE_3X}</ToggleButton3>
                <ToggleButton3 value={5}>{ORDERFORM_CONSTANTS.LEVERAGE_5X}</ToggleButton3>
                <ToggleButton3 value={10}>{ORDERFORM_CONSTANTS.LEVERAGE_10X}</ToggleButton3>
            </ToggleButtonGroup>
        </Grid>
  );
};

LeverageToggleSelect.propTypes = {
  handleLeverageChange: PropTypes.func,
  leverage: PropTypes.number
};

export default React.memo(LeverageToggleSelect);
