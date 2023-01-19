import React from "react";

import { Grid, Typography, Tooltip } from "@mui/material";

import InfoIcon from "@mui/icons-material/Info";

import { Leverage } from "assets/strings/tooltip.string";

import { ORDERFORM_CONSTANTS } from "../../frontend-BL/businessHooks/ORDER_FORM/Constants/Orderform_const";

const LeverageLabel = () => {
  return (
        <Grid container display= "flex" alignItems="center">
              <Grid
              // sx={{ marginTop: "-7px" }}
               item>
                <Typography variant={"SemiBold_12"} component="p" color="#fff">
                  {ORDERFORM_CONSTANTS.LEVERAGE_LABEL}
                </Typography>
              </Grid>
              <Grid item display="flex">
                <Tooltip title={Leverage} placement="top-start">
                  <InfoIcon sx={{ fontSize: "17px", marginLeft: "4px", color: "text.darkliver" }}></InfoIcon>
                </Tooltip>
              </Grid>
            </Grid>
  );
};

export default React.memo(LeverageLabel);
