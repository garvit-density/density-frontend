import React from "react";

import { PropTypes } from "prop-types";

import { Grid, Slider, Tooltip, Button } from "@mui/material";

import { confirmLeverage } from "assets/strings/tooltip.string";

const LeverageSlider = ({ handleLeverageChange, leverage, isLeverageBtnDisabled, confirm_leverage_change }) => {
  return (
        <Grid container spacing={1}>
        <Grid xs={9} sx={{ width: 100, display: "flex" }} id={leverage <= 5 ? "leverageSliderGreen" : "leverageSliderRed"} >
          <Slider
            marks={[{ value: 1, label: 1 }, { value: 10, label: 10 }]}
            sx={{
              width: 100,
              marginLeft: 1,
              marginRight: 1,
              marginTop: 0.5,
              // marginBottom: 0.5,
              height: "6px"
            }}
            min={1}
            max={10}
            size="small"
            valueLabelDisplay="auto"
            value={leverage}
            onChange={handleLeverageChange}>
          </Slider>
        </Grid>
        <Grid item xs={3}>
        <Tooltip title={confirmLeverage} placement="top-start">
          <Button
            id={isLeverageBtnDisabled ? "leverageSliderBtnDisabled" : "leverageSliderBtnEnabled"}
            disabled={isLeverageBtnDisabled}
            sx={{ ":disabled": { opacity: "0.5" } }}
            onClick={() => { confirm_leverage_change(); } }>
            confirm
          </Button>
        </Tooltip>
        </Grid>
      </Grid>
  );
};

LeverageSlider.propTypes = {
  handleLeverageChange: PropTypes.func,
  leverage: PropTypes.number,
  isLeverageBtnDisabled: PropTypes.bool,
  confirm_leverage_change: PropTypes.func

};

export default React.memo(LeverageSlider);
