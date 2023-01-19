import typography from "assets/Theme/typography";

export const selected_filter = {
  color: "white",
  bgcolor: "#101010",
  border: "1px solid #333333",
  borderRadius: "6px",
  padding: "4px 6px"
};

export const unselected_filter = {
  color: "borderColor.secondary",
  ...typography.Regular_16
};

export const marketBoxStyle = {
  border: "1px solid",
  borderColor: "borderColor.secondary",
  borderRadius: "8px"
};
export const marketBoxContainer = {
  background: "#010101",
  width: "fit-content",
  borderRadius: "4px",
  ...typography.Regular_14

};
export const tableStyle = {
  minWidth: 650,
  backgroundColor: "transparent",
  boxShadow: "none",
  fontFamily: "Overpass",
  color: "white"
};
export const headerStyle = {
  textAlign: "center",
  color: "aliceblue",
  borderBottom: "1px solid #333333",
  padding: "10px",
  ...typography.SemiBold_14
};
export const tableHoverStyle = { "&:hover": { backgroundColor: "black" } };

export const tableCellStyle = {
  textAlign: "center",
  padding: "8px",
  color: "#BDBDBD",
  ...typography.SemiBold_14,
  borderBottom: "1px solid #333333"
};
export const favStarIconStyles = {
  width: "25px",
  margin: "5px 5px 5px 0px",
  color: "yellow"
};

export const StarIconStyles = {
  color: "#F2F2F2",
  width: "25px",
  margin: "5px 5px 5px 0px"
};

export const symbolLogoStyle = { width: "25px", margin: "3px 5px auto 5px" };

export const symbolNameTypography = {
  ...typography.SemiBold_14,
  textAlign: "center"
};

export const data_grid = {
  height: "630px",
  width: "100%"
};

export const dataGridContainer = {
  ...typography.SemiBold_14,
  borderRadius: "0px",
  marginTop: "2%"
};

export const gridContent = {
  display: "flex",
  justifyContent: "flex-start"
};
