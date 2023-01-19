import { Box } from "@mui/material";
import ListView from "../../../../UI/ListViewMweb/ListView";
import { mobileViewActiveBlock } from "components/UI/MWebStyles/MWeb.styles";
import React from "react";
import SelectFuturesTab from "../../SelectFuturesTab";
import PropTypes from "prop-types";
import { TABS_CONSTANTS } from "frontend-BL/businessHooks/WALLET/Constants/Tabs.const";

const FuturesListView = ({ filterValue, onSelectChange, setFilterValue, transactionHistory }) => (
    <Box sx={mobileViewActiveBlock}>
    <ListView
  filterLabel={TABS_CONSTANTS.FILTER_TRANSACTION_FUTURES}
  walletType="USDT"
  select={<SelectFuturesTab value={filterValue} setValue={setFilterValue} onSelectChange={onSelectChange}/>}
  filterValue={filterValue}
  setFilterValue={setFilterValue}
  isColored title={TABS_CONSTANTS.TRANSACTION_HISTORY_LABEL_FUTURES}
  rows={transactionHistory && transactionHistory.map((transaction) => {
    const transactionDateObject = new Date(transaction.time);
    return {
      date: [transactionDateObject.getDate(),
        transactionDateObject.getMonth() + 1,
        transactionDateObject.getFullYear()].join("/") + " " +
  [transactionDateObject.getHours(),
    transactionDateObject.getMinutes(),
    transactionDateObject.getSeconds()].join(":"),
      income_type: transaction.incomeType,
      income: parseFloat(transaction.income),
      asset: transaction.asset,
      symbol: transaction.symbol || TABS_CONSTANTS.NOT_APPLICABLE_LABEL
    };
  })} columns={TABS_CONSTANTS.ASSETS_TYPE_COLUMNS_LABEL} />
  </Box>
);
FuturesListView.propTypes = {
  filterValue: PropTypes.any,
  realisedPnl24h: PropTypes.any,
  setFilterValue: PropTypes.any,
  transactionHistory: PropTypes.any,
  onSelectChange: PropTypes.any
};

export default FuturesListView;
