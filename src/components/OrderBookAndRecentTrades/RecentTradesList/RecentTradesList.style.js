import typography from "assets/Theme/typography";

export const recentTradesListContainer = {
  borderRadius: "8px",
  borderColor: "divider",
  boxShadow: "none",
  border: "1px solid",
  borderStyle: "borderColor.secondary",
  maxWidth: "300px !important"
};
export const recentTypography = {
  color: "text.regular",
  ...typography.SemiBold_16
};
export const contractAssetTypography = {
  color: "text.regular",
  ...typography.Regular_16,
  marginLeft: "5px"
};
export const settlementCurrencyTypeTypography = {
  color: "text.regular",
  ...typography.Regular_12,
  backgroundColor: "#333333",
  padding: "2px 4px",
  marginLeft: "4px"
};
export const tradeValueTypography = {
  color: "#828282",
  ...typography.Regular_16,
  marginLeft: "5px"
};
export const timestampTypography = {
  color: "#828282",
  ...typography.Regular_16,
  marginLeft: "5px",
  marginTop: "3px"
};
