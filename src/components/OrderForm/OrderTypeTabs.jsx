import React from "react";

import { StyledTab } from "./OrderForm.styled";

import { Tabs } from "@mui/material";

import { PropTypes } from "prop-types";

import { TYPESELECT } from "./style";
import { ORDERFORM_CONSTANTS } from "../../frontend-BL/businessHooks/ORDER_FORM/Constants/Orderform_const";

const OrderTypeTabs = ({ handleTypeChange, type }) => {
  return (
        <Tabs
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          id="typeTab"
          sx={{
            mt: "3%",
            color: "white",
            border: "0.5px solid #6b6b6f",
            minHeight: "initial"
          }}
          TabIndicatorProps={{
            style: {
              backgroundColor: "white",
              height: "0px"
            }
          }}
          MuiButtonBase={{
            opacity: 1
          }}
          value={type}
          onChange={handleTypeChange}
        >
          <StyledTab sx={TYPESELECT} selectedcolor="white" label={ORDERFORM_CONSTANTS.MARKET_TYPE_LABEL}/>
          <StyledTab sx={TYPESELECT} selectedcolor="white" label={ORDERFORM_CONSTANTS.LIMIT_TYPE_LABEL} />
          <StyledTab sx={TYPESELECT} selectedcolor="white" label={ORDERFORM_CONSTANTS.STOP_MARKET_LABEL} />
          <StyledTab sx={TYPESELECT} selectedcolor="white" label={ORDERFORM_CONSTANTS.STOP_LIMIT_LABEL} />
        </Tabs>
  );
};

OrderTypeTabs.propTypes = {
  handleTypeChange: PropTypes.func,
  type: PropTypes.number
};

export default React.memo(OrderTypeTabs);
