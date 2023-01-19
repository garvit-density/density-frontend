import typography from "assets/Theme/typography";

export const typoGraphy_Heading = {
  ...typography.SemiBold_16,
  color: "text.regular",
  paddingBottom: "10px",
  borderBottom: "1px solid borderColor.secondary",
  textAlign: "left"
};
export const typoGraphy_Text = {
  ...typography.SemiBold_16,
  textAlign: "left",
  marginTop: "10px"
};

export const root = {

  padding: "10px",
  margin: "10px",
  borderRadius: "0px",
  boxShadow: "none",
  border: "1px solid",
  borderColor: "borderColor.secondary",
  minHeight: "100%",
  backgroundColor: "background.secondary",
  cursor: "pointer",
  ":hover": {
    backgroundColor: "background.mild"
  }
};

export const gain_btn = {
  ...typography.Medium_18,
  color: "trade.primary"
};
export const loss_btn = {
  ...typography.Medium_18,
  color: "trade.secondary"
};

export const typoGraphy_volume_metric = {
  ...typography.Regular_16,
  color: "primary.main"
};

export const typoGraphy_volume_value = {
  ...typography.Regular_16,
  fontWeight: "900",
  color: "text.regular"
};
