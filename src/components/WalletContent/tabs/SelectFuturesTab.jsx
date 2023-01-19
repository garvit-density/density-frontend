import React from "react";

import { Select } from "components/UI/Select";

import PropTypes from "prop-types";

import { TABS_CONSTANTS } from "../../../frontend-BL/businessHooks/WALLET/Constants/Tabs.const";

const SelectFuturesTab = ({ onSelectChange, value, setValue }) => {
  return (
        <Select onChangeHandler={onSelectChange} margin values={TABS_CONSTANTS.FUTURES_FILTER_VALUES} value={value} setValue={setValue}/>
  );
};

SelectFuturesTab.propTypes = {
  onSelectChange: PropTypes.func,
  value: PropTypes.string,
  setValue: PropTypes.func
};

export default SelectFuturesTab;
