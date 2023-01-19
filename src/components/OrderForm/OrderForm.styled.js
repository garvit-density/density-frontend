/* eslint-disable no-unused-vars */

import MuiToggleButton from "@mui/material/ToggleButton";
import { styled } from "@mui/material/styles";
import { Tab } from "@mui/material";

export const ToggleButton = styled(MuiToggleButton)(
  ({ selectedcolor = "#0000001F" }) => ({
    "&.Mui-selected, &.Mui-selected:hover": {
      color: "text.primary",
      backgroundColor: selectedcolor
    }
  })
);

export const ToggleButton2 = styled(MuiToggleButton)(
  ({ selectedcolor = "#0000001F" }) => ({
    "&.Mui-selected": {
      color: "text.primary",
      backgroundColor: "background.ultradark",
      border: "1px",
      borderColor: "action.hover",
      borderRadius: "6px"
    },
    color: "#4F4F4F"
  })
);

export const ToggleButton3 = styled(MuiToggleButton)(
  ({ selectedcolor = "#0000001F" }) => ({
    "&.Mui-selected, &.Mui-selected:hover": {
      color: "text.primary"
    },
    color: "#4F4F4F"
  })
);

export const StyledTab = styled(Tab)(({ selectedcolor = "#0000001F" }) => ({
  "&.Mui-selected, &.Mui-selected:hover &.MuiTabs-indicator": {
    color: "#fff",
    background: "#666673",
    borderRadius: "0px"
  },
  color: "#4F4F4F",
  "&.MuiTabs-indicator": {
    color: "text.primary",
    background: "#666673"
  }
}));

export const Login2TradeBtn = {
  backgroundColor: "background.white",
  borderRadius: "6px",
  border: "none",
  height: "48px",
  color: "background.ultradark",
  width: "194px",
  textDecoration: "none",
  marginTop: "30px",
  marginBottom: "30px",
  fontFamily: "Overpass",
  textTransform: "Capitalize",
  "&:hover": {
    backgroundColor: "primary.main"
  }
};

export const dd = {
  background: "rgba(79, 79, 79, 0.25)",
  width: "100%",
  borderRadius: "6px",
  border: "1px solid #4F4F4F",
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: "1px solid lightblue"
  }
};

export const justifyCenter = {
  display: "flex",
  justifyContent: "center",
  background: "#2c2c34"
};

export const noAuthContainer = {
  border: 1,
  borderRadius: 1,
  borderColor: "divider",
  fontFamily: "Overpass"
};
