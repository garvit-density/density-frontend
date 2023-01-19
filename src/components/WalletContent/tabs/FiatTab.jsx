import { Box } from "@mui/material";
import React, { useState } from "react";
import { TabSection } from "../../UI/TabSection";
import { TabStatistic } from "../../UI/TabStatistic";
import { HistoryTable } from "components/Tables";

import SelectFiatTab from "./SelectFiatTab";

import { useFiatTab } from "../../../frontend-BL/businessHooks";

import { TABS_CONSTANTS } from "../../../frontend-BL/businessHooks/WALLET/Constants/Tabs.const";
import { WebViewActiveBlock } from "components/UI/MWebStyles/MWeb.styles";
import FiatTabStatMobile from "./MwebTabs/MwebFiat/FiatTabStatMobile";
import FiatListView from "./MwebTabs/MwebFiat/FiatListView";

const FiatTab = () => {
  const [filterValue, setFilterValue] = useState(TABS_CONSTANTS.FILTER_VALUE_DEFAULT);

  const { fiatbalance, fiatHistory, onSelectChange } = useFiatTab();

  return (
    <>
      <TabSection>
        {/* Web View Active */}
        <Box sx={[WebViewActiveBlock, {
          gap: 12,
          display: "flex"
        }]}>
          <TabStatistic {...{ name: TABS_CONSTANTS.TOTAL_BALANCE_LABEL, value: fiatbalance }} />
        </Box>
        {/* Mobile View Active */}
        <FiatTabStatMobile fiatbalance={fiatbalance} />
        </TabSection>

      {/* Web View */}
      <Box component="div" sx={WebViewActiveBlock}>
      <HistoryTable
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

          {/* Mobile View */}
          <FiatListView onSelectChange={onSelectChange} fiatHistory={fiatHistory} filterValue={filterValue} setFilterValue={setFilterValue} />
    </>
  );
};

export default FiatTab;
