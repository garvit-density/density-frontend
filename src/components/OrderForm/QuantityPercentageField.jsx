import React from "react";

import { Grid, Typography, InputAdornment, TextField } from "@mui/material";

import PropTypes from "prop-types";
import { ORDERFORM_CONSTANTS } from "../../frontend-BL/businessHooks/ORDER_FORM/Constants/Orderform_const";

const QuantityPercentageField = ({ quantityPercentage, handleQuantityPercentageChange }) => {
  return (
        <Grid item mt={1}>
            <TextField
                type="number"
                value={quantityPercentage}
                placeholder={ORDERFORM_CONSTANTS.PERCENTAGE_LABEL}
                onChange={handleQuantityPercentageChange}
                InputProps={{
                  inputProps: {
                    max: 100,
                    min: 0
                  },
                  startAdornment: (
                    <InputAdornment onClick={() => handleQuantityPercentageChange({ target: { value: quantityPercentage - 1 } })} position="start">
                    <Typography color="#ffffff" sx={{ cursor: "pointer" }}>-</Typography>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment onClick={() => handleQuantityPercentageChange({ target: { value: quantityPercentage + 1 } })} position="end">
                    <Typography color="#ffffff" sx={{ cursor: "pointer" }}>+</Typography>
                    </InputAdornment>
                  )
                }}
            />
        </Grid>
  );
};

QuantityPercentageField.propTypes = {
  handleQuantityPercentageChange: PropTypes.func,
  quantityPercentage: PropTypes.number
};

export default React.memo(QuantityPercentageField);
