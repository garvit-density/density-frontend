import React from "react";

import { Grid, Typography, Switch, TextField, Box } from "@mui/material";

import PropTypes from "prop-types";
import { TAKEPRICESTOPLOSSTOGGLE } from "./style";
import { ORDERFORM_CONSTANTS } from "../../frontend-BL/businessHooks/ORDER_FORM/Constants/Orderform_const";

const TP_SL_InputFields = ({ isTakeProfit, setIsTakeProfit, takeProfitValue, setTakeProfitValue, emptyTakeProfitErrorText, isStopLoss, setIsStopLoss, stopLossValue, setStopLossValue, emptyStopLossErrorText, clearValidation, convertToPrecisionValueForPrice }) => {
  return (
    <Box sx={TAKEPRICESTOPLOSSTOGGLE}>
       <Grid container spacing={1} mt="0px" display="flex" justifyContent="center">
            <Grid xs={6} item>
                <Grid container>
                    <Grid xs={6} item display= "flex" alignItems= "center" justifyContent="center">
                    <Typography variant="p" color="white">
                        Take Profit
                    </Typography>
                    </Grid>
                    <Grid xs={6} item>
                    <Switch
                        size="small"
                        checked={isTakeProfit}
                        onChange={(event) => {
                          setIsTakeProfit(event.target.checked);
                          clearValidation();
                        }}
                    ></Switch>
                    </Grid>
                    <Grid xs={12} item id={!isTakeProfit ? "disableTakeProfitField" : "takeProfitField"}>
                <TextField
                    value={takeProfitValue}
                    placeholder={ORDERFORM_CONSTANTS.ENTER_TP_LABEL}
                    id="tpv"
                    error={!!emptyTakeProfitErrorText}
                    helperText={emptyTakeProfitErrorText}
                    required
                    InputLabelProps={{ fontFamily: "Overpass", fontSize: "13px" }}
                    sx={{
                      background: "rgba(79, 79, 79, 0.25)",
                      borderRadius: "0px",
                      marginTop: "10px",
                      border: "1px solid #4F4F4F",
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        border: "1px solid lightblue"
                      }
                    }}
                    onChange={(event) => {
                      setTakeProfitValue(convertToPrecisionValueForPrice(event.target.value));
                      clearValidation();
                    }}
                    type="number"
                    disabled={!isTakeProfit}></TextField>
                </Grid>
                </Grid>
                </Grid>
                <Grid xs={6} item>
                <Grid container>
                    <Grid xs={6} item display= "flex" alignItems= "center" justifyContent="center">
                    <Typography variant="p" color="white">
                        Stop Loss
                    </Typography>
                    </Grid>
                    <Grid xs={6} item>
                    <Switch
                        size="small"
                        checked={isStopLoss}
                        onChange={(event) => {
                          setIsStopLoss(event.target.checked);
                          clearValidation();
                        }}
                    ></Switch>
                    </Grid>
                    <Grid xs={12} item id={!isStopLoss ? "disableStopLossField" : "stopLossField"}>
                    <TextField
                        required
                        id="spv"
                        placeholder={ORDERFORM_CONSTANTS.ENTER_SL_LABEL}
                        error={!!emptyStopLossErrorText}
                        helperText={emptyStopLossErrorText}
                        sx={{
                          background: "rgba(79, 79, 79, 0.25)",
                          marginTop: "10px",
                          borderRadius: "6px",
                          border: "1px solid #4F4F4F",
                          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            border: "1px solid lightblue"
                          }
                        }}
                        value={stopLossValue}
                        onChange={(event) => {
                          setStopLossValue(convertToPrecisionValueForPrice(event.target.value));
                          clearValidation();
                        }}
                        type="number"
                        disabled={!isStopLoss}
                    ></TextField>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Box>
  );
};

TP_SL_InputFields.propTypes = {
  isTakeProfit: PropTypes.bool,
  setIsTakeProfit: PropTypes.func,
  takeProfitValue: PropTypes.number,
  setTakeProfitValue: PropTypes.func,
  emptyTakeProfitErrorText: PropTypes.string,
  isStopLoss: PropTypes.bool,
  setIsStopLoss: PropTypes.func,
  stopLossValue: PropTypes.number,
  setStopLossValue: PropTypes.func,
  emptyStopLossErrorText: PropTypes.string,
  clearValidation: PropTypes.func,
  convertToPrecisionValueForPrice: PropTypes.func

};

export default React.memo(TP_SL_InputFields);
