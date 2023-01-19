import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";

import { useSelector, useDispatch } from "react-redux";

import { Box, Button, Drawer, Grid, InputLabel, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";

// import { addRemoveMarginApi } from "../../frontend-api-service/Api";

import { GLOBAL_ERROR_ADD, GLOBAL_ERROR_REMOVE, ADD_REMOVE_MARGIN_SUCCESS, ADD_REMOVE_MARGIN_FAIL, UPDATE_ISOLATED_WALLET_POS_RISK } from "../../../frontend-BL/redux/constants/Constants";
// import { GLOBAL_ERROR_ADD, GLOBAL_ERROR_REMOVE, ADD_REMOVE_MARGIN_SUCCESS, ADD_REMOVE_MARGIN_FAIL, UPDATE_ISOLATED_WALLET_POS_RISK } from "redux/constants/Constants";
import { availableBalanceAction } from "../../../frontend-BL/redux/actions/User/AvailableBalance.ac";
import { BORDERBOTTOM, CONFIRMBUTTON, header, TOGGLEBUTTONBACKGROUND, TOGGLEBUTTONBORDER, TOGGLEBUTTONWRAPPER } from "./AddMarginModelm.style";
import { addRemoveMarginApi } from "frontend-api-service/Api";
const ADDMARGIN = "Add Margin";
const REMOVEMARGIN = "Remove Margin";
const AddMarginModalm = ({ isOpen, close, symbol }) => {
  const [selectedDropDownValue, setSelectedDropDownValue] = useState(ADDMARGIN);
  const [marginValue, setMarginValue] = useState("");
  const [maximumMarginPermissible, setMaximumMarginPermissible] = useState("-");
  // available balance rounded to 3 decimal places
  const availableBalance = parseFloat(useSelector((state) => state.availableBalance.availableBalance).toFixed(3));
  const marginUsedForContract = useSelector((state) => state.activePositions && state.activePositions.isolatedWallet.find((position) => position.sym === symbol));
  const marginUsed = marginUsedForContract && marginUsedForContract.isolatedWallet;
  const selectedPositionAuxiliary = useSelector((state) => state.currentPositions.currentPositions.find((position) => position.sym === symbol));
  const maintenanceMarginRate = selectedPositionAuxiliary && selectedPositionAuxiliary.mmr;
  const cumulative = selectedPositionAuxiliary && selectedPositionAuxiliary.cum;
  const selectedPositionForMarginUpdation = useSelector((state) => state.activePositions.currentPositions.find((position) => position.sym === symbol));
  const isolatedWalletForSelectedPosition = parseFloat(useSelector((state) => state.activePositions.isolatedWallet.find((position) => position.sym === symbol).isolatedWallet));
  const leverageForSelectedPosition = parseFloat(useSelector((state) => state.activePositions.leverage.find((position) => position.sym === symbol).leverage));
  const [helperText, setHelperText] = useState("");
  const dispatch = useDispatch();
  const [estimatedLiquidationPrice, setEstimatedLiquidationPrice] = useState("-");
  const SelectedAddMarginButton = [selectedDropDownValue === ADDMARGIN ? TOGGLEBUTTONBACKGROUND : TOGGLEBUTTONBORDER];
  const SelectRemoveMarginButton = [selectedDropDownValue === REMOVEMARGIN ? TOGGLEBUTTONBACKGROUND : TOGGLEBUTTONBORDER];
  useEffect(() => {
    if (selectedDropDownValue === ADDMARGIN) {
      let maxAddableMargin = parseFloat(availableBalance);
      maxAddableMargin = Math.trunc(maxAddableMargin * 0.98 * 100) / 100;
      setMaximumMarginPermissible(maxAddableMargin);
    } else {
      let maxRemovableMargin = isolatedWalletForSelectedPosition - parseFloat(selectedPositionAuxiliary.size) / parseFloat(leverageForSelectedPosition);
      maxRemovableMargin = Math.trunc(maxRemovableMargin * 0.98 * 100) / 100;
      setMaximumMarginPermissible(maxRemovableMargin > 0 ? maxRemovableMargin : "-");
    }
  }, [selectedDropDownValue, selectedPositionAuxiliary]);

  useEffect(() => {
    const effectiveMargin = parseFloat(marginUsed) + (selectedDropDownValue === ADDMARGIN ? 1 : -1) * parseFloat(marginValue || 0);
    const liquidationPriceUpdated =
      (effectiveMargin + cumulative - selectedPositionForMarginUpdation.posAmt * selectedPositionForMarginUpdation.entryPrice) /
      (Math.abs(selectedPositionForMarginUpdation.posAmt) * maintenanceMarginRate - selectedPositionForMarginUpdation.posAmt);
    setEstimatedLiquidationPrice(liquidationPriceUpdated > 0 ? liquidationPriceUpdated : "-");
  }, [marginValue]);

  const handleSubmitForMarginChange = (event) => {
    event.preventDefault();
    if (marginValue === "") {
      setHelperText("Value cannot be empty");
      return;
    } else if (marginValue > maximumMarginPermissible) {
      setHelperText("Value greater than the maximum permissible value");
      return;
    } else if (marginValue < 0) {
      setHelperText("Value cannot be negative");
      return;
    } else {
      setHelperText("");
    }
    addRemoveMarginApi(selectedPositionForMarginUpdation.sym, marginValue, selectedDropDownValue === ADDMARGIN ? "1" : "2")
      .then(() => {
        dispatch(availableBalanceAction());
        close();
        setMarginValue("");
        dispatch({
          type: GLOBAL_ERROR_ADD,
          payload: {
            src: ADD_REMOVE_MARGIN_SUCCESS,
            errorMessage: "Margin updated successfully!",
            dialogType: "success",
            errorUi: "SNACKBAR",
            errorHandlerForReduxStateUpdation: () => dispatch({ type: GLOBAL_ERROR_REMOVE, payload: { src: ADD_REMOVE_MARGIN_SUCCESS } })
          }
        });
        dispatch({
          type: UPDATE_ISOLATED_WALLET_POS_RISK,
          payload: {
            sym: selectedPositionForMarginUpdation.sym,
            isolatedWallet: parseFloat(marginUsed) + (selectedDropDownValue === ADDMARGIN ? 1 : -1) * parseFloat(marginValue || 0)
          }
        });
      })
      .catch((errorResponse) => {
        dispatch({
          type: GLOBAL_ERROR_ADD,
          payload: {
            src: ADD_REMOVE_MARGIN_FAIL,
            errorMessage: errorResponse.response.data.message,
            errorCode: errorResponse.response.status,
            dialogType: "failure",
            errorUi: "SNACKBAR",
            errorHandlerForReduxStateUpdation: () => dispatch({ type: GLOBAL_ERROR_REMOVE, payload: { src: ADD_REMOVE_MARGIN_FAIL } })
          }
        });
      });
  };
  return (
    <Drawer anchor="bottom" open={isOpen} onClose={close}>
      <Box sx={{ p: 2.5 }}>
        <Box sx={header}>
          <Typography variant="h4" sx={[{ fontSize: "22px" }, BORDERBOTTOM]}>
            {selectedDropDownValue}
          </Typography>
        </Box>
        <form onSubmit={(event) => handleSubmitForMarginChange(event)}>
          <Grid sx={{ mt: "25px" }} justifyContent="center" gap={"20px"} container>
            <Box>
              <Grid xs={12} display="flex" justifyContent={"space-between"}>
                <Typography>Margin Used for {symbol} position</Typography>
                <Typography>{marginUsed && parseFloat(marginUsed).toFixed(3)}</Typography>
              </Grid>

              <Grid xs={12} display="flex" justifyContent={"space-between"}>
                {selectedDropDownValue === ADDMARGIN ? <Typography>Maximum Addable Margin</Typography> : <Typography>Maximum Removable Margin</Typography>}{" "}
                <Typography>{maximumMarginPermissible}</Typography>
              </Grid>

              <Grid xs={12} display="flex" justifyContent={"space-between"}>
                <Typography>Estimated Liquidation Price after Margin Modification</Typography>
                <Typography>{(typeof estimatedLiquidationPrice === "number" && parseFloat(estimatedLiquidationPrice).toFixed(3)) || "-"}</Typography>
              </Grid>
            </Box>

            <Box sx={TOGGLEBUTTONWRAPPER}></Box>
            <Grid item xs={5.5}>
              <Button onClick={() => setSelectedDropDownValue(ADDMARGIN)} sx={SelectedAddMarginButton} fullWidth>
                Add
              </Button>
            </Grid>

            <Grid item xs={5.5}>
              <Button sx={SelectRemoveMarginButton} onClick={() => setSelectedDropDownValue(REMOVEMARGIN)} fullWidth>
                Remove
              </Button>
            </Grid>
            <Grid xs={12}>
              <InputLabel htmlFor="my-input">Amount (USDT)</InputLabel>
              <TextField
                fullWidth
                helperText={helperText}
                error={!!helperText}
                value={marginValue}
                onChange={(event) => {
                  setMarginValue(event.target.value);
                  setHelperText("");
                }}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                variant="filled"
                type="number"
              ></TextField>
            </Grid>

            <Grid xs={12}>
              <Button sx={CONFIRMBUTTON} fullWidth type="submit">
                Confirm
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Drawer>
  );
};

AddMarginModalm.propTypes = {
  isOpen: PropTypes.bool,
  close: PropTypes.func,
  symbol: PropTypes.string
};

export default AddMarginModalm;
