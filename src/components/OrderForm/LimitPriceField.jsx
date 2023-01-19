import React from "react";

import { Grid, Typography, InputAdornment, TextField } from "@mui/material";

import PropTypes from "prop-types";
import { ORDERFORM_CONSTANTS } from "../../frontend-BL/businessHooks/ORDER_FORM/Constants/Orderform_const";

const LimitPriceField = ({ limitPriceContractAsset, handleLimitPriceContractAsset, emptyPriceErrorText, settlementCurrencyType, handleLastButton }) => {
  return (
        <>
            <Grid
            container
            item
            xs={12}
            sx={{ margin: "4% 0 2%", fontSize: "12px" }}
            // id="priceLabel"
            key="PriceLabel">
            <Typography variant="p" color="white">
            Limit Price ({settlementCurrencyType})
            </Typography>
            </Grid>
            <TextField
                required
                key="PriceField"
                autoComplete="off"
                placeholder={ORDERFORM_CONSTANTS.ENTER_LIMIT_PRICE_LABEL}
                error={!!emptyPriceErrorText}
                helperText={emptyPriceErrorText}
                value={limitPriceContractAsset}
                onChange={handleLimitPriceContractAsset}
                type="number"
                sx={{
                  background: "rgba(79, 79, 79, 0.25)",
                  borderRadius: "6px",
                  border: "1px solid #4F4F4F",
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid lightblue"
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                        <Typography onClick={handleLastButton} variant="p" sx={{ marginLeft: "0px", marginRight: "2px", fontSize: "11px" }} mx={2} color="#2FDAAF">
                        Last
                        </Typography>
                    </InputAdornment>
                  )
                }}
            />
        </>
  );
};

LimitPriceField.propTypes = {
  limitPriceContractAsset: PropTypes.number,
  handleLimitPriceContractAsset: PropTypes.func,
  emptyPriceErrorText: PropTypes.string,
  settlementCurrencyType: PropTypes.string,
  handleLastButton: PropTypes.func
};

export default React.memo(LimitPriceField);
