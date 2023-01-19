import React from "react";

import PropTypes from "prop-types";

import { Select } from "components/UI/Select";

import { TABS_CONSTANTS } from "../../../frontend-BL/businessHooks/WALLET/Constants/Tabs.const";

const SelectFiatTab = ({ onSelectChange, value, setValue }) => {
  return (
        <Select onChangeHandler={onSelectChange} margin values={TABS_CONSTANTS.FIAT_FILTER_VALUES} value={value} setValue={setValue}/>
  );
};
SelectFiatTab.propTypes = {
  onSelectChange: PropTypes.func,
  value: PropTypes.string,
  setValue: PropTypes.func
};

export default React.memo(SelectFiatTab);
