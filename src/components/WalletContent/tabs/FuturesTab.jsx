import { Box, Divider, Avatar, CardHeader } from "@mui/material";
import React, { useState } from "react";
import { TabSection } from "../../UI/TabSection";
import { TabStatistic } from "../../UI/TabStatistic";
import "./FuturesTab.scss";
import FuturesTabSectionMobile from "../tabs/MwebTabs/MwebFutures/FuturesTabSectionMobile";
import { AssetsTable, HistoryTable } from "components/Tables";

import { styles } from "./FuturesTab.styled";

import { useFuturesTab } from "../../../frontend-BL/businessHooks";

import SelectFuturesTab from "./SelectFuturesTab";

import { mobileViewActiveBlock, WebViewActiveBlock } from "components/UI/MWebStyles/MWeb.styles";
import FuturesListView from "./MwebTabs/MwebFutures/FuturesListView";
import MwebAccordion from "./MwebTabs/MwebAssetTable/MwebAccordion";
import { TABS_CONSTANTS } from "../../../frontend-BL/businessHooks/WALLET/Constants/Tabs.const";

const FuturesTab = () => {
  const [buy, setBuy] = useState(false);
  const [sell, setSell] = useState(false);

  const [filterValue, setFilterValue] = useState(TABS_CONSTANTS.FILTER_VALUE_DEFAULT);

  const { totalMarginBalance, freeMarginBalance, realisedPnl24h, transactionHistory, assets, onSelectChange } = useFuturesTab();

  return (
    <>
    {/* Web View Active */}
    <Box sx={WebViewActiveBlock}>
    <TabSection>
        <Box sx={styles.header}>
          <Box sx={styles.headerTop}>
            <TabStatistic {...{
              name: TABS_CONSTANTS.MARGIN_BALANCE_LABEL,
              value: totalMarginBalance && Math.trunc(totalMarginBalance * 100) / 100
            }} />
          </Box>
          <Divider flexItem />
          <Box sx={styles.headerBtm}>
            <TabStatistic {...{
              name: TABS_CONSTANTS.FREE_MARGIN_LABEL,
              value: freeMarginBalance && Math.trunc(freeMarginBalance * 100) / 100
            }} />
            <Divider orientation="vertical" />
            <TabStatistic {...{
              name: TABS_CONSTANTS.REALIZED_PNL_LABEL,
              value: realisedPnl24h && Math.trunc(realisedPnl24h * 100) / 100,
              colorIndicator: true
            }} />
          </Box>
        </Box>
      </TabSection>
    </Box>

      {/* Mobile View Active */}
      <FuturesTabSectionMobile totalMarginBalance={totalMarginBalance} freeMarginBalance={freeMarginBalance} realisedPnl24h={realisedPnl24h} />
      {/* Common Screen Component */}
      <Box sx={[{ m: 0, p: 0 }, WebViewActiveBlock]}>
      <AssetsTable buy={buy} setBuy={setBuy} sell={sell} setSell={setSell} selectedWalletFromTabs={TABS_CONSTANTS.FUTURES_WALLET} title={TABS_CONSTANTS.ASSETS_LABEL} columns={TABS_CONSTANTS.ASSETS_HISTORY_COLUMNS_LABEL} rows={assets && assets.map((asset) => [<CardHeader
        key={asset.asset}
        className="assetContainer"
        sx={{ paddingLeft: 0 }}
        avatar={
          <Avatar
            src={"https://static-dev.density.exchange/icons/" + asset.asset.toLowerCase() + ".svg"}
            sx={{ width: 23, height: 23 }}
          />
        }
        title={asset.asset}
        />, asset.marginBalance && Math.trunc(asset.marginBalance * 100) / 100, asset.unrealizedProfit && Math.trunc(asset.unrealizedProfit * 100) / 100, asset.availableBalance && Math.trunc(asset.availableBalance * 100) / 100, asset.maxWithdrawAmount && Math.trunc(asset.maxWithdrawAmount * 100) / 100])}/>
        </Box>
{/* Mobile View */}
<Box component="div" sx={mobileViewActiveBlock}>
<MwebAccordion buy={buy} setBuy={setBuy} sell={sell} setSell={setSell} selectedWalletFromTabs={TABS_CONSTANTS.FUTURES_WALLET}
title={TABS_CONSTANTS.ASSETS_LABEL}
rows={assets}/>
        </Box>

{/* Web View */}
              <Box component="div" sx={WebViewActiveBlock}>
              <HistoryTable
        filterLabel={TABS_CONSTANTS.FILTER_TRANSACTION_FUTURES}
        select={<SelectFuturesTab value={filterValue} setValue={setFilterValue} onSelectChange={onSelectChange}/>}
        filterValue={filterValue}
        setFilterValue={setFilterValue}
        isColored title={TABS_CONSTANTS.TRANSACTION_HISTORY_LABEL_FUTURES}
        rows={transactionHistory && transactionHistory.map((transaction) => {
          const transactionDateObject = new Date(transaction.time);
          return [[transactionDateObject.getDate(),
            transactionDateObject.getMonth() + 1,
            transactionDateObject.getFullYear()].join("/") + " " +
         [transactionDateObject.getHours(),
           transactionDateObject.getMinutes(),
           transactionDateObject.getSeconds()].join(":"),
          transaction.incomeType, parseFloat(transaction.income),
          transaction.asset, transaction.symbol || TABS_CONSTANTS.NOT_APPLICABLE_LABEL];
        })} columns={TABS_CONSTANTS.ASSETS_TYPE_COLUMNS_LABEL} />
          </Box>

          {/* Mobile View */}

          <FuturesListView filterValue={filterValue} onSelectChange={onSelectChange} setFilterValue={setFilterValue} transactionHistory={transactionHistory} />

    </>
  );
};

export default FuturesTab;
