import React, { useEffect, useState } from "react";
import { Modal } from "../../UI/Modal";
import PropTypes from "prop-types";

import { useSelector, useDispatch } from "react-redux";

import { Box, FormControl, Grid, MenuItem, Select, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
// import { formControlStyles, menuItemOverride, selectOverrideStyles, TextFieldStyles, title } from "./AddMarginModal.styles";
// import { ADD, ESTIMATED_LIQUIDATION_PRICE, MAX_ADDABLE_MARGIN, MAX_REMOVABLE_MARGIN, REMOVE } from "./AddMarginModalConstants";
// import { GLOBAL_ERROR_ADD, GLOBAL_ERROR_REMOVE, ADD_REMOVE_MARGIN_SUCCESS, ADD_REMOVE_MARGIN_FAIL, UPDATE_ISOLATED_WALLET_POS_RISK } from "../../frontend-BL/redux/constants/Constants";
// import { availableBalanceAction } from "../../frontend-BL/redux/actions/User/AvailableBalance.ac";
import { addRemoveMarginApi } from "frontend-api-service/Api";
import { ADD_REMOVE_MARGIN_FAIL, ADD_REMOVE_MARGIN_SUCCESS, GLOBAL_ERROR_ADD, GLOBAL_ERROR_REMOVE, UPDATE_ISOLATED_WALLET_POS_RISK } from "frontend-BL/redux/constants/Constants";
import { formControlStyles, menuItemOverride, selectOverrideStyles, TextFieldStyles, title } from "./AddMarginModal.styles";
import { ADD, ESTIMATED_LIQUIDATION_PRICE, MAX_ADDABLE_MARGIN, MAX_REMOVABLE_MARGIN, REMOVE } from "./AddMarginModalConstants";
import { availableBalanceAction } from "frontend-BL/redux/actions/User/AvailableBalance.ac";

const AddMarginModal = ({ isOpen, close, symbol }) => {
  const [selectedDropDownValue, setSelectedDropDownValue] = useState("Add Margin");
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

  useEffect(() => {
    if (selectedDropDownValue === "Add Margin") {
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
    const effectiveMargin = parseFloat(marginUsed) + (selectedDropDownValue === "Add Margin" ? 1 : -1) * parseFloat(marginValue || 0);
    const liquidationPriceUpdated =
      (effectiveMargin + cumulative - selectedPositionForMarginUpdation.posAmt * selectedPositionForMarginUpdation.entryPrice) /
      (Math.abs(selectedPositionForMarginUpdation.posAmt) * maintenanceMarginRate - selectedPositionForMarginUpdation.posAmt);
    setEstimatedLiquidationPrice(liquidationPriceUpdated > 0 ? liquidationPriceUpdated : "-");
  }, [marginValue]);

  function handleSubmitForMarginChange() {
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
    addRemoveMarginApi(selectedPositionForMarginUpdation.sym, marginValue, selectedDropDownValue === "Add Margin" ? "1" : "2")
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
            isolatedWallet: parseFloat(marginUsed) + (selectedDropDownValue === "Add Margin" ? 1 : -1) * parseFloat(marginValue || 0)
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
  }

  return (
    <Modal isOpen={isOpen} sx={title} close={close} title={"Add/Remove Margin"} actionText={"Confirm"} action={handleSubmitForMarginChange}>
      <Box component="form" noValidate autoComplete="off">
        <Grid sx={{ mt: 3 }} container justifyContent={"space-between"}>
          <Grid xs={6}>
            <FormControl variant="filled" sx={formControlStyles}>
              <Select
                sx={selectOverrideStyles}
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={selectedDropDownValue}
                onChange={(event) => setSelectedDropDownValue(event.target.value)}
              >
                <MenuItem sx={menuItemOverride} value={"Add Margin"}>
                  {ADD}
                </MenuItem>
                <MenuItem sx={menuItemOverride} value={"Remove Margin"}>
                  {REMOVE}
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={6}>
            <TextField
              sx={TextFieldStyles}
              helperText={helperText}
              error={!!helperText}
              label="Margin"
              value={marginValue}
              onChange={(event) => {
                setMarginValue(event.target.value);
                setHelperText("");
              }}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              InputLabelProps={{
                sx: {
                  // set the color of the label when not shrinked
                  color: "text.primary"
                }
              }}
              variant="filled"
              type="number"
            ></TextField>
          </Grid>
          <Grid xs={8}>
            <Typography>Margin Used for {symbol} position</Typography>
          </Grid>
          <Grid xs={4}>
            <Typography>{marginUsed && parseFloat(marginUsed).toFixed(3)}</Typography>
          </Grid>
          <Grid xs={8}>{selectedDropDownValue === "Add Margin" ? <Typography>{MAX_ADDABLE_MARGIN}</Typography> : <Typography>{MAX_REMOVABLE_MARGIN}</Typography>}</Grid>
          <Grid xs={4}>
            <Typography>{maximumMarginPermissible}</Typography>
          </Grid>
          <Grid xs={8}>
            <Typography>{ESTIMATED_LIQUIDATION_PRICE}</Typography>
          </Grid>
          <Grid xs={4}>
            {/* Rounding the Liquidation Price to 3 digits */}
            <Typography>{(typeof estimatedLiquidationPrice === "number" && parseFloat(estimatedLiquidationPrice).toFixed(3)) || "-"}</Typography>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

AddMarginModal.propTypes = {
  isOpen: PropTypes.bool,
  close: PropTypes.func,
  symbol: PropTypes.string
};

export default AddMarginModal;
