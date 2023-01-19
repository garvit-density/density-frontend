import typography from "assets/Theme/typography";

const aggPrice = {
  color: "#fff",
  ...typography.SemiBold_16,
  textAlign: "center"
};

const tickerHeader = {
  color: "#7f807b",
  ...typography.Regular_12,
  marginTop: "2px",
  textAlign: "center"
};

const tickerValue = {
  color: "#fff",
  ...typography.Regular_12,
  marginTop: "2px",
  textAlign: "center"
};

const marketSegmentBox = {
  // border: "1px solid" + theme.palette.common.boxBorderColor,
  background: "#2C2C34",
  height: "60px"
};

const flexObject = {
  display: "flex"
};

const loaderObject = {
  width: "5%",
  margin: "25px auto 0",
  textAlign: "center"
};

export const Mark = "Mark";
export const Index = "Index";
export const twentyfourHr_change = "24h change";
export const Open_interest = "Open interest (USDT)";
export const _24hrVolume = "24h volume (USDT)";
export const Funding_Countdown = "Funding/Countdown";
export const _24h_High = "24h High";
export const _24h_Low = "24h Low";

export { tickerValue, tickerHeader, aggPrice, marketSegmentBox, flexObject, loaderObject };
