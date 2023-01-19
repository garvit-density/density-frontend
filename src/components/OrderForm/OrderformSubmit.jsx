import React from "react";

import PropTypes from "prop-types";

import { Grid, Button } from "@mui/material";

import { ORDERFORM_CONSTANTS } from "../../frontend-BL/businessHooks/ORDER_FORM/Constants/Orderform_const";

const OrderformSubmit = ({ handleSubmitOrderForm, side }) => {
  return (
    <Grid xs={12} container>
        <Button
            type="submit"
            onClick={handleSubmitOrderForm}
            id="buySellAction"
            sx={side === "BUY" ? { backgroundColor: "#29B57E !important", color: "#FFF !important", borderRadius: "0px" } : { backgroundColor: "#F46151 !important", color: "#FFF !important", borderRadius: "0px" }}
        >
            {side === "BUY" ? ORDERFORM_CONSTANTS.BUY_LONG_LABEL : ORDERFORM_CONSTANTS.SELL_SHORT_LABEL}
        </Button>
    </Grid>
  );
};

OrderformSubmit.propTypes = {
  handleSubmitOrderForm: PropTypes.func,
  side: PropTypes.string
};

export default React.memo(OrderformSubmit);
