import React from "react";
import { Grid, Typography, Tooltip, TextField, InputAdornment } from "@mui/material";
// import InfoIcon from "@mui/icons-material/Info";
import { Size_Order_form } from "../../assets/strings/tooltip.string";
import PropTypes from "prop-types";

import { ORDERFORM_CONSTANTS } from "../../frontend-BL/businessHooks/ORDER_FORM/Constants/Orderform_const";

const SizeField = ({ quantityValue, emptySizeErrorText, handleQuantityFieldChange, setQuantityPercentage, settlementCurrencyType, contractAsset, sizeInContractAsset, handleSizeInContractAssetChange }) => {
  return (
        <>
            {/* <Grid sx={{ marginTop: "1px" }} xs={12} item>
                <Typography id="maxBuyingPowerLabel">{ORDERFORM_CONSTANTS.SIZE_LABEL}
                <Tooltip title={Size_Order_form} placement="top">
                    <InfoIcon sx={{ fontSize: "small", color: "#4F4F4F" }}></InfoIcon>
                </Tooltip>
                </Typography>
            </Grid> */}
            <Grid sx={{ paddingTop: "12px" }} item xs={6}>
            <Tooltip title={Size_Order_form} placement="top">
                <TextField
                    // id="sizeField"
                    // variant={"Regular_12"}
                    placeholder={ORDERFORM_CONSTANTS.ENTER_SIZE_IN_USDT_LABEL}
                    required
                    autoComplete="off"
                    error={!!emptySizeErrorText}
                    helperText={emptySizeErrorText}
                    type="number"
                    value={quantityValue}
                    sx={{
                      background: "rgba(79, 79, 79, 0.25)",
                      border: "1px solid #4F4F4F",
                      // borderRadius: "0px",
                      // fontFamily: "Overpass",
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        border: "1px solid white",
                        // fontFamily: "Overpass",
                        fontSize: "12px"
                      }
                    }}
                    onClick={() => setQuantityPercentage("")}
                    onChange={handleQuantityFieldChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                        <Typography variant= {"Regular_11"} component="h4" color="#BDBDBD">
                            {settlementCurrencyType}
                        </Typography>
                        </InputAdornment>
                      )
                    }}
                ></TextField>
                                </Tooltip>

            </Grid>
            <Grid sx={{ paddingTop: "0px" }} item xs={6}>
                <TextField
                    // id="sizeFieldContract"
                    placeholder={ORDERFORM_CONSTANTS.ENTER_SIZE_IN_LABEL + contractAsset}
                    autoComplete="off"
                    type="number"
                    onChange={(event) => { handleSizeInContractAssetChange(event); }}
                    value={sizeInContractAsset}
                    sx={{
                      background: "rgba(79, 79, 79, 0.25)",
                      // borderRadius: "0px",
                      // fontFamily: "Overpass",
                      border: "1px solid #4F4F4F",
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        border: "1px solid white",
                        // fontFamily: "Overpass",
                        fontSize: "10px"
                      }
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                        <Typography variant={"Regular_11"} component="h4" color="#BDBDBD">
                            {contractAsset}
                        </Typography>
                        </InputAdornment>
                      )
                    }}
                ></TextField>
            </Grid>
        </>
  );
};
SizeField.propTypes = {
  quantityValue: PropTypes.number,
  emptySizeErrorText: PropTypes.string,
  handleQuantityFieldChange: PropTypes.func,
  setQuantityPercentage: PropTypes.func,
  settlementCurrencyType: PropTypes.string,
  contractAsset: PropTypes.string,
  sizeInContractAsset: PropTypes.number,
  handleSizeInContractAssetChange: PropTypes.func
};

export default React.memo(SizeField);
