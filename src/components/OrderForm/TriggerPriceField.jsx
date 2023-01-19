import React from "react";

import { Grid, Typography, TextField, InputAdornment } from "@mui/material";

import PropTypes from "prop-types";

import { dd } from "./OrderForm.styled";
import { ORDERFORM_CONSTANTS } from "../../frontend-BL/businessHooks/ORDER_FORM/Constants/Orderform_const";

const TriggerPriceField = ({ triggerPrice, setTriggerPrice, emptyTriggerPriceText, handleLastButtonForTriggerPrice, settlementCurrencyType }) => {
  return (
    <>
      <Grid
        container
        item
        xs={12}
        mt="4%"
        mb="2%"
        fontSize="12px"
        // id="triggerPriceLabel"
        key="TriggerPriceLabel"
      >
        <Typography variant="p" color="white">
          Trigger Price ({settlementCurrencyType})
        </Typography>
      </Grid>
      <TextField
        required
        key="PriceField"
        autoComplete="off"
        placeholder={ORDERFORM_CONSTANTS.ENTER_TRIGGER_PRICE_LABEL}
        error={!!emptyTriggerPriceText}
        helperText={emptyTriggerPriceText}
        value={triggerPrice}
        onChange={() => setTriggerPrice(event.target.value)}
        type="number"
        sx={dd}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Typography onClick={handleLastButtonForTriggerPrice} sx={{ marginLeft: "0px", marginRight: "2px", fontSize: "11px" }} variant="p" mx={2} color="#2FDAAF">
                Last
              </Typography>
            </InputAdornment>
          )
        }}
      />
    </>
  );
};

TriggerPriceField.propTypes = {
  triggerPrice: PropTypes.number,
  setTriggerPrice: PropTypes.func,
  emptyTriggerPriceText: PropTypes.string,
  handleLastButtonForTriggerPrice: PropTypes.func,
  settlementCurrencyType: PropTypes.string
};

export default React.memo(TriggerPriceField);
