import { styled } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  background: "rgba(79, 79, 79, 0.15)",
  borderRadius: "0px",
  "& .MuiToggleButtonGroup-grouped": {
    "&:not(:first-of-type)": { borderRadius: theme.shape.borderRadius },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius
    }
  }
}));

export const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  width: "8rem",
  border: "none",
  margin: "0 2px",
  borderRadius: 0,
  padding: "5px 10px",
  fontSize: "14px",
  textTransform: "none",
  "&.Mui-selected": {
    "&:hover": {
      backgroundColor: "background.regular"
    },
    color: "#FFF",
    backgroundColor: "background.regular",
    borderRadius: 0
  }
}));
