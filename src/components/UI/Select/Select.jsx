import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import MuiSelect from "@mui/material/Select";
import { Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PropTypes from "prop-types";
import "./Select.scss";
import { MenuItemSx, MuiSelectSx } from "./Select.styled";

const Select = ({ onChangeHandler, label, values, value, setValue, margin }) => {
  const handleChange = (event) => {
    setValue(event.target.value);
    if (onChangeHandler) onChangeHandler(event);
  };

  return (
    <FormControl fullWidth margin={margin ? "normal" : "none"}>
      <Typography sx={{ mb: "0.2rem" }}>{label}</Typography>
      <MuiSelect
        sx={MuiSelectSx}
        value={value}
        onChange={handleChange}
        IconComponent={() => <KeyboardArrowDownIcon htmlColor="#FCFCFC" />}
      >
        {values.map(({ name, val }) => (
          <MenuItem
            key={val}
            value={val}
            sx={MenuItemSx}
            dense="true"
          >
            {name}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
};

Select.propTypes = {
  label: PropTypes.string,
  values: PropTypes.array,
  value: PropTypes.any,
  setValue: PropTypes.any,
  margin: PropTypes.bool,
  onChangeHandler: PropTypes.func
};

export default Select;
