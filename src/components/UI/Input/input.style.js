import { makeStyles } from "@mui/styles";
import typography from "assets/Theme/typography";

const useStyle = makeStyles((theme) => ({
  helperText: {
    "&.MuiFormHelperText-root": {
      lineHeight: 1,
      marginLeft: theme.spacing(0)
    }
  },
  inputLabel: {
    "&.MuiInputLabel-root": {
      marginTop: theme.spacing(2.5),
      marginBottom: theme.spacing(0.6),
      color: "rgba(255, 255, 255, 0.7)",
      ...typography.Bold_14_21
    }
  },
  labelAsterisk: {
    color: "rgba(255, 255, 255, 0.7)"
  },
  textField: {
    "& .MuiOutlinedInput-input": {
      height: "1.7em",
      "min-height": "1.7em",
      lineHeight: "1.7em",
      color: "#BDBDBD",
      ...typography.Regular_14,
      borderRadius: "5px",
      "&.Mui-disabled": {
        "-webkit-text-fill-color": "text.regular"
      }
    },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      fontSize: theme.typography.pxToRem(10),
      borderColor: "#4F4F4F",
      borderRadius: 5
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#4F4F4F"
    },

    "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline": {
      borderColor: "#4F4F4F"
    },
    // Icon color
    "& .MuiSvgIcon-root": {
      color: theme.palette.primary.main
    },
    "& .MuiOutlinedInput-notchedOutline": {
      ...typography.Regular_10,
      borderColor: "#4F4F4F",
      borderRadius: 5,
      "&:hover": {
        borderColor: "#4F4F4F"
      }
    }
  }
}));
export default useStyle;
