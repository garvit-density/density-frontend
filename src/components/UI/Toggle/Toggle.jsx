import * as React from "react";
import PropTypes from "prop-types";
import { StyledToggleButton, StyledToggleButtonGroup } from "./Toggle.styled.js";

const Toggle = ({ values, value, setValue }) => {
  const handleChange = (_, newValue) => {
    if (newValue !== null && newValue !== undefined) {
      setValue(newValue);
    }
  };

  return (
    <StyledToggleButtonGroup value={value} exclusive onChange={handleChange}>
      {values.map(({ name, index }) => (
        <StyledToggleButton sx={{ borderRadius: 0 }} key={index} value={index}>
          {name}
        </StyledToggleButton>
      ))}
    </StyledToggleButtonGroup>
  );
};

Toggle.propTypes = {
  values: PropTypes.array,
  value: PropTypes.number,
  setValue: PropTypes.any
};

export default Toggle;
