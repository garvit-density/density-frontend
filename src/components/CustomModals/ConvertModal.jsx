import React, { useEffect, useState } from "react";
import { Box, Divider, IconButton, InputAdornment } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { Select } from "../UI/Select";
import { Field } from "../UI/Field";
import { Modal } from "../UI/Modal";
import { LabelInfo } from "../UI/LabelInfo";
import PropTypes from "prop-types";

import { getSpotAccountDetailsApi } from "../../frontend-api-service/Api";
import { lastTradedPriceForSymbolsApi, convertAssetsSpotApi } from "../../frontend-api-service/Api/Spot";

import { useSelector, useDispatch } from "react-redux";
import { styles } from "./ConvertModal.styled";
import { walletScreenRender } from "../../frontend-BL/redux/actions/Internal/WalletScreenRender.ac";
const inputLabels = {
  from: "From",
  to: "To",
  convert: "Convert Amount"
};

const ConvertModal = ({ isOpen, close }) => {
  const [amount, setAmount] = useState("");
  const modalTitle = "Convert";
  const MAX = "MAX";

  const dispatch = useDispatch();

  const [buyingAssets, setBuyingAssets] = useState([]);
  const [sellingAssets, setSellingAssets] = useState([]);

  const [selectedBuyingAsset, setSelectedBuyingAsset] = useState("");
  const [selectedSellingAsset, setSelectedSellingAsset] = useState("");

  const [conversionRate, setConversionRate] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [ltpPriceForSymbols, setLtpPriceForSymbols] = useState([]);

  const walletScreenRenderBoolean = useSelector((state) => state.walletScreenRender.walletScreenRenderFlag);

  useEffect(() => {
    lastTradedPriceForSymbolsApi()
      .then((successResponse) => {
        setLtpPriceForSymbols([...successResponse.data, { symbol: "USDTUSDT", price: "1.00" }]);
        const ltpSellingAsset = [...successResponse.data, { symbol: "USDTUSDT", price: "1.00" }].filter((asset) => asset.symbol === selectedSellingAsset + "USDT")[0] && [...successResponse.data, { symbol: "USDTUSDT", price: "1.00" }].filter((asset) => asset.symbol === selectedSellingAsset + "USDT")[0].price;
        const ltpBuyingAsset = [...successResponse.data, { symbol: "USDTUSDT", price: "1.00" }].filter((asset) => asset.symbol === selectedBuyingAsset + "USDT")[0] && [...successResponse.data, { symbol: "USDTUSDT", price: "1.00" }].filter((asset) => asset.symbol === selectedBuyingAsset + "USDT")[0].price;
        setConversionRate(parseFloat(ltpSellingAsset / ltpBuyingAsset).toFixed(5));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isOpen, selectedBuyingAsset, selectedSellingAsset]);

  useEffect(() => {
    getSpotAccountDetailsApi()
      .then((successResponse) => {
        const nonZeroSpotAssets = successResponse.data.balances.filter((asset) => parseFloat(asset.free) > 0);
        setBuyingAssets(successResponse.data.balances.map((asset) => ({ name: asset.asset, val: asset.asset })));
        setSellingAssets(nonZeroSpotAssets.map((asset) => ({ name: asset.asset, val: asset.asset })));
        setSelectedBuyingAsset(successResponse.data.balances[0].asset);
        setSelectedSellingAsset(nonZeroSpotAssets[0].asset);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isOpen]);

  function handleSubmit() {
    convertAssetsSpotApi(selectedSellingAsset, selectedBuyingAsset, amount)
      .then((successResponse) => {
        console.log(successResponse);
        dispatch(walletScreenRender(true, !walletScreenRenderBoolean));
      })
      .catch((error) => {
        console.log(error);
      });
    close();
  }

  return (
    <Modal isOpen={isOpen} action={handleSubmit} close={close} title={modalTitle}>
      <Select label={inputLabels.from} values={sellingAssets} value={selectedSellingAsset} setValue={setSelectedSellingAsset} />
      <Box sx={styles.labels}>
        <ArrowDownwardIcon color="disabled" />
        <IconButton color="primary">
          <CompareArrowsIcon />
        </IconButton>
      </Box>
      <Select label={inputLabels.to} values={buyingAssets} value={selectedBuyingAsset} setValue={setSelectedBuyingAsset} />
      <Divider sx={{ my: 3 }} />
      <Field
        label={inputLabels.convert}
        value={amount}
        setValue={setAmount}
        sx={{ mb: "0.3rem" }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" disableTypography>
              <span style={styles.maxBtn}>{MAX}</span>
            </InputAdornment>
          )
        }}
      />
      <LabelInfo {...{
        label: "Real-Time Rate",
        value: " 1 " + selectedSellingAsset + " = " + conversionRate + " " + selectedBuyingAsset
      }} />
      <LabelInfo {...{
        label: "You will recieve",
        value: parseFloat(conversionRate * amount).toFixed(5) + " " + selectedBuyingAsset
      }} />
    </Modal>
  );
};

ConvertModal.propTypes = {
  isOpen: PropTypes.bool,
  close: PropTypes.any
};

export default ConvertModal;
