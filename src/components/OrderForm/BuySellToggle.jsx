import React from "react";

import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { ToggleButton } from "./OrderForm.styled";

import PropTypes from "prop-types";

import { ORDERFORM_CONSTANTS } from "../../frontend-BL/businessHooks/ORDER_FORM/Constants/Orderform_const";

const BuySellToggle = ({ handleSideChange, side }) => {
  return (
        <ToggleButtonGroup
        // id="buySellToggle"
        exclusive
        onChange={handleSideChange}
        value={side}
        sx={{
          margin: "0",
          width: "100%",
          background: "rgba(79, 79, 79, 0.15)",
          borderRadius: "0px"
        }}
      >
        <ToggleButton value="BUY" sx={{ fontSize: "12px", color: "#29B57E", fontFamily: "Overpass", height: "32px", borderRadius: "0px", width: "50%", textTransform: "capitalize" }} selectedcolor="#29B57E">
        {ORDERFORM_CONSTANTS.BUY_LONG_LABEL}
        </ToggleButton>
        <ToggleButton value="SELL" sx={{ fontSize: "12px", color: "#F46151", fontFamily: "Overpass", height: "32px", borderRadius: "0px", width: "50%", textTransform: "capitalize" }} selectedcolor="#F46151">
          {ORDERFORM_CONSTANTS.SELL_SHORT_LABEL}
        </ToggleButton>
      </ToggleButtonGroup>
  );
};

BuySellToggle.propTypes = {
  handleSideChange: PropTypes.func,
  side: PropTypes.string
};
export default React.memo(BuySellToggle);
