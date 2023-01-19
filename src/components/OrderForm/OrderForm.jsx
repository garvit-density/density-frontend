// React hooks
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

// MUI
import { Container, Grid } from "@mui/material";

// Styles and assets
import "./OrderForm.scss";

// Apis
import { availableBalanceAction } from "../../frontend-BL/redux/actions/User/AvailableBalance.ac";

import { SET_LIMIT_PRICE_HANDLER } from "../../frontend-BL/redux/constants/Constants";

import { useOrderForm } from "../../frontend-BL/businessHooks";

import BuySellToggle from "./BuySellToggle";
import OrderTypeTabs from "./OrderTypeTabs";
import LeverageSlider from "./LeverageSlider";
import LeverageLabel from "./LeverageLabel";
import BalanceLabel from "./BalanceLabel";
import LeverageToggleSelect from "./LeverageToggleSelect";
import MaximumBuyingPower from "./MaximumBuyingPower";
import ContractAndOrderPlacementDetails from "./ContractAndOrderPlacementDetails";
import QuantityPercentageToggle from "./QuantityPercentageToggle";
import QuantityPercentageField from "./QuantityPercentageField";
import OrderformSubmit from "./OrderformSubmit";
import ReduceOnlySwitch from "./ReduceOnlySwitch";
import TP_SL_InputFields from "./TP_SL_InputFields";
import TriggerPriceField from "./TriggerPriceField";
import LimitPriceField from "./LimitPriceField";
import SizeField from "./SizeField";
import { ORDERfORM } from "./style";
import { Box } from "@mui/system";

function OrderForm() {
  const xsf = 12;

  const dispatch = useDispatch();

  const {
    handleSubmitOrderForm,
    handleSideChange,
    handleTypeChange,
    handleLimitPriceContractAsset,
    handleQuantityFieldChange,
    handleQuantityPercentageChange,
    handleLastButton,
    handleLastButtonForTriggerPrice,
    handleSizeInContractAssetChange,
    handleLeverageChange,
    convertToPrecisionValueForPrice,
    confirm_leverage_change,
    clearValidation,
    settlementCurrencyType,
    contractAsset,
    minimumNotionalValue,
    pricePrecisionValue,
    contractAssetPrecision,
    balanceSettlementCurrency,
    limitPriceContractAsset,
    setLimitPriceConractAsset,
    lastTradedPrice,
    side,
    type,
    leverage,
    leverageFromServer,
    leverageSliderErrorText,
    isLeverageBtnDisabled,
    costValue,
    triggerPrice,
    setTriggerPrice,
    emptyTriggerPriceText,
    quantityValue,
    sizeInContractAsset,
    quantityPercentage,
    setQuantityPercentage,
    emptySizeErrorText,
    emptyPriceErrorText,
    isReduceOnly,
    setIsReduceOnly,
    isTakeProfit,
    setIsTakeProfit,
    takeProfitValue,
    setTakeProfitValue,
    emptyTakeProfitErrorText,
    isStopLoss,
    setIsStopLoss,
    stopLossValue,
    setStopLossValue,
    emptyStopLossErrorText
  } = useOrderForm();

  useEffect(() => {
    if (settlementCurrencyType.length > 0) {
      dispatch(availableBalanceAction(settlementCurrencyType));
    }
  }, [settlementCurrencyType, contractAsset]);

  useEffect(() => {
    if (setLimitPriceConractAsset) {
      dispatch({
        type: SET_LIMIT_PRICE_HANDLER,
        payload: setLimitPriceConractAsset
      });
    }
  }, [setLimitPriceConractAsset]);

  return (
    <form >
      <Container
        // id="orderForm"
        sx={[ORDERfORM, { border: 1, borderColor: "divider" }]}
        maxWidth="xs"
      >
        <BuySellToggle handleSideChange={handleSideChange} side={side} />
        <OrderTypeTabs handleTypeChange={handleTypeChange} type={type} />
        <BalanceLabel
          balanceSettlementCurrency={balanceSettlementCurrency}
          settlementCurrencyType={settlementCurrencyType}
          type={type}
          xsf={xsf}
        />
        <Grid
          container
          sx={{ background: "#2c2c34", padding: "7px", marginTop: "2px" }}
        >
          <LeverageLabel />
          <LeverageSlider
            handleLeverageChange={handleLeverageChange}
            leverage={leverage}
            isLeverageBtnDisabled={isLeverageBtnDisabled}
            confirm_leverage_change={confirm_leverage_change}
          />
          <LeverageToggleSelect
            handleLeverageChange={handleLeverageChange}
            leverage={leverage}
          />
          <p style={{ color: "red", fontSize: "12px" }}>
            {leverageSliderErrorText}
          </p>
          <MaximumBuyingPower
            leverageFromServer={leverageFromServer}
            balanceSettlementCurrency={balanceSettlementCurrency}
            settlementCurrencyType={settlementCurrencyType}
            pricePrecisionValue={pricePrecisionValue}
          />
          <Grid container xs={12} id="price">
            <Grid container xs={12} item>
              <Grid item xs={xsf}>
                {type === 2 || type === 3
                  ? [
                      <TriggerPriceField
                        key="triggerPrice"
                        triggerPrice={triggerPrice}
                        setTriggerPrice={setTriggerPrice}
                        emptyTriggerPriceText={emptyTriggerPriceText}
                        handleLastButtonForTriggerPrice={
                          handleLastButtonForTriggerPrice
                        }
                        settlementCurrencyType={settlementCurrencyType}
                      />
                    ]
                  : ""}
              </Grid>
              <Grid item xs={xsf}>
                {type === 1 || type === 3
                  ? [
                      <LimitPriceField
                        key="limitPrice"
                        limitPriceContractAsset={limitPriceContractAsset}
                        handleLimitPriceContractAsset={
                          handleLimitPriceContractAsset
                        }
                        emptyPriceErrorText={emptyPriceErrorText}
                        settlementCurrencyType={settlementCurrencyType}
                        handleLastButton={handleLastButton}
                      />
                    ]
                  : ""}
              </Grid>
            </Grid>
          </Grid>
          <Grid sx={{ mt: "2px" }} container spacing={1} id="size">
            <SizeField
              quantityValue={quantityValue}
              emptySizeErrorText={emptySizeErrorText}
              handleQuantityFieldChange={handleQuantityFieldChange}
              setQuantityPercentage={setQuantityPercentage}
              settlementCurrencyType={settlementCurrencyType}
              contractAsset={contractAsset}
              sizeInContractAsset={sizeInContractAsset}
              handleSizeInContractAssetChange={handleSizeInContractAssetChange}
            />
          </Grid>
          <ContractAndOrderPlacementDetails
            minimumNotionalValue={minimumNotionalValue}
            settlementCurrencyType={settlementCurrencyType}
            contractAssetPrecision={contractAssetPrecision}
            contractAsset={contractAsset}
            costValue={costValue}
            pricePrecisionValue={pricePrecisionValue}
            type={type}
            lastTradedPrice={lastTradedPrice}
            limitPriceContractAsset={limitPriceContractAsset}
          />
          <Grid container id="quantity">
            <QuantityPercentageField
              handleQuantityPercentageChange={handleQuantityPercentageChange}
              quantityPercentage={quantityPercentage}
            />
            <QuantityPercentageToggle
              handleQuantityPercentageChange={handleQuantityPercentageChange}
              quantityPercentage={quantityPercentage}
            />
          </Grid>
          {!isReduceOnly && type === 0 && (
            <TP_SL_InputFields
              isTakeProfit={isTakeProfit}
              setIsTakeProfit={setIsTakeProfit}
              takeProfitValue={takeProfitValue}
              setTakeProfitValue={setTakeProfitValue}
              emptyTakeProfitErrorText={emptyTakeProfitErrorText}
              isStopLoss={isStopLoss}
              setIsStopLoss={setIsStopLoss}
              stopLossValue={stopLossValue}
              setStopLossValue={setStopLossValue}
              emptyStopLossErrorText={emptyStopLossErrorText}
              clearValidation={clearValidation}
              convertToPrecisionValueForPrice={convertToPrecisionValueForPrice}
            />
          )}
        </Grid>
        <ReduceOnlySwitch
          isReduceOnly={isReduceOnly}
          setIsReduceOnly={setIsReduceOnly}
          setIsTakeProfit={setIsTakeProfit}
          setIsStopLoss={setIsStopLoss}
        />
       <Box sx={{ position: "absolute", bottom: "2%", left: "0", right: "0", margin: "0 5%" }}>
       <OrderformSubmit
          handleSubmitOrderForm={handleSubmitOrderForm}
          side={side}
        />
       </Box>
      </Container>
    </form>
  );
}

export default OrderForm;
