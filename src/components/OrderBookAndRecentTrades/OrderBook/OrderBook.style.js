import typography from "assets/Theme/typography";

const typography_table_head = {
  ...typography.SemiBold_16,
  color: "text.regular",
  textAlign: "center",
  marginRight: "20px",
  padding: "5px",
  boxShadow: "none",
  backgroundColor: "#383840",
  borderBottom: "0px",
  overflowX: "hidden"
};
const TabListSx = { minHeight: "23px", width: "100%", textAlign: "center", ml: "40%" };

const typography_table_body_profit = {
  textAlign: "center",
  border: "none",
  color: "trade.primary",
  ...typography.Regular_12
};

const ltp_counter = {
  color: "text.regular",
  width: "32px",
  ...typography.SemiBold_16
};

const all_ask_bids = {
  fontWeight: "400",
  fontSize: "12px",
  ...typography.Regular_12,
  height: "17px",
  padding: "0px",
  textAlign: "right",
  width: "25px",
  background: "#2c2c34",
  color: "#C9C9C9",
  border: "0px",
  borderRadius: "#0px",
  "&:hover": {
    cursor: "pointer"
  }
};

const typography_table_body = {
  ...typography.Regular_12,
  border: "none",
  textAlign: "center",
  padding: "5px",
  color: "text.regular"
};

const typography_table_body_loss = {
  ...typography.Regular_12,
  border: "none",
  padding: "5px",
  textAlign: "center",
  color: "trade.secondary"
};

const tabs_icons = {
  borderBottom: 1,
  borderColor: "divider",
  marginTop: "-10px"
};

const buy_sell_icon_margin = {
  margin: "10px 5px"
};
const tableRowWrapper = {
  margin: "0",
  padding: "0",
  textAlign: "center",
  background: `linear-gradient(90deg, rgba(244, 97, 81, 0) 0%, rgba(244, 97, 81, 0.25) 100%)`,
  backgroundRepeat: "no-repeat",
  "&:hover": {
    background: "#666673"
  }
};
const tableRowWrapperBid = {
  margin: "0",
  padding: "0",
  textAlign: "center",
  background: `linear-gradient(90deg, rgba(47, 218, 175, 0) 0%, rgba(47, 218, 175, 0.25) 100%) 0% 0% / 6.31712% no-repeat;`,
  backgroundRepeat: "no-repeat",
  "&:hover": {
    background: "#666673"
  }
};
export {
  tableRowWrapperBid,
  typography_table_body,
  all_ask_bids,
  typography_table_body_loss,
  ltp_counter,
  typography_table_body_profit,
  typography_table_head,
  tabs_icons,
  buy_sell_icon_margin,
  TabListSx,
  tableRowWrapper
};
