import { Box } from "@mui/material";
import ListView from "../../../../UI/ListViewMweb/ListView";
import { mobileViewActiveBlock } from "components/UI/MWebStyles/MWeb.styles";
import React from "react";
import SelectFiatTab from "../../SelectFiatTab";
import PropTypes from "prop-types";
import { TABS_CONSTANTS } from "frontend-BL/businessHooks/WALLET/Constants/Tabs.const";

const FiatListView = ({ onSelectChange, fiatHistory, filterValue, setFilterValue }) => (
    <Box sx={mobileViewActiveBlock}>
    <ListView
  filterLabel={TABS_CONSTANTS.FILTER_TRANSACTION_FIAT}
  select={
  <SelectFiatTab
  onSelectChange={onSelectChange}
  value={filterValue}
  setValue={setFilterValue}/> }
  filterValue={filterValue}
  setFilterValue={setFilterValue}
  isColored
  title={TABS_CONSTANTS.TRANSACTION_HISTORY_LABEL_FIAT}
  columns={TABS_CONSTANTS.TRANSACTION_HISTORY_COLUMNS}
  rows={fiatHistory} />
  </Box>
);

FiatListView.propTypes = {
  fiatHistory: PropTypes.any,
  filterValue: PropTypes.any,
  setFilterValue: PropTypes.any,
  onSelectChange: PropTypes.any
};

export default FiatListView;
