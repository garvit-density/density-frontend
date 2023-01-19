import React from "react";
import "./Button.scss";

import PropTypes from "prop-types";

const CommonButton = ({ label, className, onClick, type, disabled }) => {
  return (
    <button type={type} disabled={disabled} className={`buttonCommon ${className}`} onClick={onClick}>
      {label}
    </button>
  );
};

CommonButton.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
  disabled: PropTypes.bool
};

export default CommonButton;
