import React from "react";

import { Grid, Switch, Tooltip, Typography, Box } from "@mui/material";

import InfoIcon from "@mui/icons-material/Info";

import { Reduce_Only } from "../../assets/strings/tooltip.string";

import PropTypes from "prop-types";
import { REDUCEONY } from "./style";
import { ORDERFORM_CONSTANTS } from "../../frontend-BL/businessHooks/ORDER_FORM/Constants/Orderform_const";

const ReduceOnlySwitch = ({ isReduceOnly, setIsReduceOnly, setIsTakeProfit, setIsStopLoss }) => {
  return (
        <Box sx={REDUCEONY}>
        <Grid container>
            <Grid xs={6} item>
            <Switch size="small" checked={isReduceOnly} onChange={(event) => {
              setIsReduceOnly(event.target.checked);
              if (event.target.checked) {
                setIsTakeProfit(false);
                setIsStopLoss(false);
              }
            }}>
            </Switch>
                <Typography sx={{ fontSize: "12px", fontFamily: "Overpass" }} variant="p" color="white">
                    {" "}
                    {ORDERFORM_CONSTANTS.REDUCE_ONLY_LABEL}
                </Typography>
            <Tooltip title={Reduce_Only} placement="top">
                <InfoIcon sx={{ fontSize: "small", color: "#4F4F4F", marginBottom: "-5px" }}></InfoIcon>
            </Tooltip>
            </Grid>
        </Grid>
        </Box>
  );
};

ReduceOnlySwitch.propTypes = {
  isReduceOnly: PropTypes.bool,
  setIsReduceOnly: PropTypes.func,
  setIsTakeProfit: PropTypes.func,
  setIsStopLoss: PropTypes.func
};

export default React.memo(ReduceOnlySwitch);
