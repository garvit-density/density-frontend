/* eslint-disable react/jsx-key */
import React, { useState, useRef } from "react";
import { Divider, InputAdornment, Grid, Box, TableCell, Typography, Button, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { Modal } from "../UI/Modal";
import { LabelInfo } from "../UI/LabelInfo";
import PropTypes from "prop-types";
import { Field } from "components/UI/Field";

import {
  positionSubHeader,
  singleGridStyle,
  tablePositionCategoryStyle1,
  singleGrid1,
  singleGrid,
  tablePositionCategoryStyle2,
  CLOSE_POSITIONS_SX
} from "components/UserActivities/UserTabs/UserTabs.style";
import { Format, truncateString } from "helpers";

import { useSelector } from "react-redux";

import { cancelOrderApi } from "../../frontend-api-service/Api";

import { styles } from "./ExitLimitMarketModal.styled";

import { openOrderListHeaders, BUY_SELL_MAP, EXIT_LIMIT_MARKET_CONSTANTS } from "./ExitMarketModal.const";

import { useExitLimitMarketModal } from "../../frontend-BL/businessHooks";

const ExitLimitMarketModal = ({ isOpen, close, positionEntry, orderType, symbol }) => {
  const [limitPrice, setLimitPrice] = useState("");
  const [size, setSize] = useState("");

  const [helperTextForPrice, setHelperTextForPrice] = useState("");
  const [helperTextForSize, setHelperTextForSize] = useState("");

  const [toggleSize, setToggleSize] = useState(100);

  const isValidationSuccessful = useRef(true);
  const [OrgSize, setOrgSize] = useState("");

  const getTradableSymbolListFromServer = useSelector((state) => state.tradablesymbolList.tradablesymbolList);
  const selectedContract = getTradableSymbolListFromServer.length && getTradableSymbolListFromServer.filter((contract) => contract.symbol === symbol);
  const contractAssetPrecision = selectedContract[0] && selectedContract[0].quantityPrecision;
  const pricePrecisionValue = selectedContract[0] && selectedContract[0].pricePrecision;
  const openOrdersApiData = useSelector((state) => state.futures.openOrders).filter(
    (openOrder) => openOrder.symbol === positionEntry.symbol && openOrder.side !== BUY_SELL_MAP[positionEntry.getPositionSide]
  );
  const openOrdersSocketData = useSelector((state) => state.OpenOrdersStream.OpenOrdersStream).filter(
    (openOrder) => openOrder.s === positionEntry.symbol && openOrder.S !== BUY_SELL_MAP[positionEntry.getPositionSide]
  );
  const [maxSize, setMaxSize] = useState(0);
  const [estimatedPnL, setEstimatedPnL] = useState(0);
  const { handleSizeChange, handleSubmit, handleLimitPriceChange } = useExitLimitMarketModal({
    size,
    setSize,
    setHelperTextForSize,
    setToggleSize,
    limitPrice,
    setLimitPrice,
    setHelperTextForPrice,
    isValidationSuccessful,
    maxSize,
    setMaxSize,
    isOpen,
    close,
    orderType,
    positionEntry,
    setEstimatedPnL,
    contractAssetPrecision,
    pricePrecisionValue,
    openOrdersApiData,
    openOrdersSocketData,
    symbol,
    OrgSize,
    setOrgSize
  });
  const modalTitle = orderType === EXIT_LIMIT_MARKET_CONSTANTS.ORDER_TYPE_MARKET ? EXIT_LIMIT_MARKET_CONSTANTS.EXIT_MARKET_ORDER_TITLE : EXIT_LIMIT_MARKET_CONSTANTS.EXIT_LIMIT_ORDER_TITLE;

  return (
    <Modal
      action={handleSubmit}
      isOpen={isOpen}
      close={close}
      title={modalTitle}
      secondaryActionTitle={EXIT_LIMIT_MARKET_CONSTANTS.CANCEL_LABEL}
      isSecondaryActionVisible={true}
      secondaryAction={close}
    >
      {openOrdersApiData.length || openOrdersSocketData.length
        ? (
            [
          <Typography>{EXIT_LIMIT_MARKET_CONSTANTS.AVAILABLE_EXIT_ORDERS}</Typography>,
          <Box sx={{ mb: 4 }}>
            <Grid container sx={positionSubHeader} spacing={3}>
              {openOrderListHeaders.map((headerData, i) => (
                <Grid key={i} sx={singleGridStyle} xs={headerData.gridSize}>
                  <TableCell sx={tablePositionCategoryStyle1}>{headerData.name}</TableCell>
                </Grid>
              ))}
            </Grid>
            {openOrdersApiData.map((openOrder) => (
              <Grid container sx={styles.gridContainer}>
                <Grid sx={singleGrid1} xs={2}>
                  <Typography sx={tablePositionCategoryStyle1}>{openOrder.symbol}</Typography>
                </Grid>
                <Grid sx={singleGrid1} xs={2}>
                  <Typography sx={tablePositionCategoryStyle1}>{openOrder.side}</Typography>
                </Grid>
                <Grid sx={singleGrid1} xs={2}>
                  <Typography sx={tablePositionCategoryStyle1}>{openOrder.origQty + " " + positionEntry.symbolBaseAsset}</Typography>
                </Grid>
                <Grid sx={singleGrid1} xs={2}>
                  <Typography sx={tablePositionCategoryStyle1}>{parseFloat(openOrder.price) ? parseFloat(openOrder.price) + EXIT_LIMIT_MARKET_CONSTANTS.QUOTE_ASSET_LABEL : "-"}</Typography>
                </Grid>
                <Grid sx={singleGrid1} xs={2}>
                  <Typography sx={{ ...tablePositionCategoryStyle1, textOverflow: "ellipsis" }}>{truncateString(String(openOrder.orderId), 8)}</Typography>
                </Grid>
                <Grid sx={singleGrid} xs={2}>
                  <TableCell sx={tablePositionCategoryStyle2}>
                    <Button onClick={() => cancelOrderApi(openOrder.symbol, openOrder.orderId)} sx={CLOSE_POSITIONS_SX} variant="contained">
                      {EXIT_LIMIT_MARKET_CONSTANTS.CLOSE_LABEL}d
                    </Button>
                  </TableCell>
                </Grid>
              </Grid>
            ))}
            {openOrdersSocketData.map((openOrder) => (
              <Grid container sx={styles.gridContainer}>
                <Grid sx={singleGrid1} xs={2}>
                  <Typography sx={tablePositionCategoryStyle1}>{openOrder.s}</Typography>
                </Grid>
                <Grid sx={singleGrid1} xs={2}>
                  <Typography sx={tablePositionCategoryStyle1}>{openOrder.S}</Typography>
                </Grid>
                <Grid sx={singleGrid1} xs={2}>
                  <Typography sx={tablePositionCategoryStyle1}>{openOrder.q + " " + positionEntry.symbolBaseAsset}</Typography>
                </Grid>
                <Grid sx={singleGrid1} xs={2}>
                  <Typography sx={tablePositionCategoryStyle1}>{parseFloat(openOrder.p) ? parseFloat(openOrder.p) + EXIT_LIMIT_MARKET_CONSTANTS.QUOTE_ASSET_LABEL : "-"}</Typography>
                </Grid>
                <Grid sx={singleGrid1} xs={2}>
                  <Typography sx={{ ...tablePositionCategoryStyle1, textOverflow: "ellipsis" }}>{truncateString(String(openOrder.i), 8)}</Typography>
                </Grid>
                <Grid sx={singleGrid} xs={2}>
                  <TableCell sx={tablePositionCategoryStyle2}>
                    <Button onClick={() => cancelOrderApi(openOrder.s, openOrder.i)} sx={CLOSE_POSITIONS_SX} variant="contained">
                      {EXIT_LIMIT_MARKET_CONSTANTS.CLOSE_LABEL}
                    </Button>
                  </TableCell>
                </Grid>
              </Grid>
            ))}
          </Box>
            ]
          )
        : (
        <React.Fragment />
          )}
      {orderType === EXIT_LIMIT_MARKET_CONSTANTS.ORDER_TYPE_LIMIT
        ? (
        <Field
          type="number"
          helperText={helperTextForPrice}
          setHelperText={setHelperTextForPrice}
          label={EXIT_LIMIT_MARKET_CONSTANTS.ENTER_PRICE_LABEL}
          value={limitPrice}
          customHandleChange={handleLimitPriceChange}
          margin
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" disableTypography>
                <span
                  onClick={() => {
                    setLimitPrice(positionEntry.ltp);
                  }}
                  style={styles.maxBtn}
                >
                  {EXIT_LIMIT_MARKET_CONSTANTS.LAST_LABEL}
                </span>
              </InputAdornment>
            )
          }}
        />
          )
        : (
        <React.Fragment />
          )}
      <Field
        type="number"
        helperText={helperTextForSize}
        setHelperText={setHelperTextForSize}
        label={Format(EXIT_LIMIT_MARKET_CONSTANTS.ENTER_SIZE_LABEL, symbol)}
        value={size}
        customHandleChange={handleSizeChange}
        margin
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" disableTypography>
              <span
                onClick={() => {
                  setSize(maxSize);
                  setToggleSize("");
                }}
                style={styles.maxBtn}
              >
                {EXIT_LIMIT_MARKET_CONSTANTS.MAX_LABEL}
              </span>
            </InputAdornment>
          )
        }}
      />
      <Typography sx={{ mb: 4 }}>{Format(EXIT_LIMIT_MARKET_CONSTANTS.MAXIMUM_SIZE_AVAILABLE_LABEL, maxSize, positionEntry.symbolBaseAsset)}</Typography>
      <ToggleButtonGroup
        value={toggleSize}
        exclusive
        onChange={(event) => {
          handleSizeChange({ target: { value: (event.target.value * maxSize) / 100 } });
          setToggleSize(parseFloat(event.target.value));
        }}
      >
        <ToggleButton value={25}>{EXIT_LIMIT_MARKET_CONSTANTS.LABEL_25X}</ToggleButton>
        <ToggleButton value={50}>{EXIT_LIMIT_MARKET_CONSTANTS.LABEL_50X}</ToggleButton>
        <ToggleButton value={75}>{EXIT_LIMIT_MARKET_CONSTANTS.LABEL_75X}</ToggleButton>
        <ToggleButton value={100}>{EXIT_LIMIT_MARKET_CONSTANTS.LABEL_100X}</ToggleButton>
      </ToggleButtonGroup>
      <Divider sx={{ mt: 3 }} />
      <LabelInfo {...{ label: EXIT_LIMIT_MARKET_CONSTANTS.ESTIMATED_PNL_LABEL, value: isNaN(estimatedPnL) ? "--" : estimatedPnL + EXIT_LIMIT_MARKET_CONSTANTS.QUOTE_ASSET_LABEL }} />
    </Modal>
  );
};

ExitLimitMarketModal.propTypes = {
  isOpen: PropTypes.bool,
  close: PropTypes.func,
  handleSubmit: PropTypes.func,
  positionEntry: PropTypes.object,
  orderType: PropTypes.string,
  secondaryActionTitle: PropTypes.string,
  secondaryAction: PropTypes.func,
  isSecondaryActionVisible: PropTypes.bool,
  symbol: PropTypes.string
};

export default ExitLimitMarketModal;
