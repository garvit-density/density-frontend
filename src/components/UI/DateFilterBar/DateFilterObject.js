import typography from "assets/Theme/typography";

export const buttonGroupStyles = {
  backgroundColor: "#2C2C34",
  padding: "0px",
  color: "#909090",
  width: "100%",
  borderTop: "1px solid"
};

export const buttonStyles = {
  ...typography.SemiBold_12,
  "line-height": "13px",
  borderTopRightRadius: "0px",
  borderBottomRightRadius: "0px",
  color: "#ffffff ",
  marginLeft: "0px",
  height: "35px",
  "&:hover": {
    background: "#666673"
  },
  "&.Mui-selected": {
    background: "#666673",
    color: "#ffffff ",
    // border: "1px solid #fff",
    borderRadius: "0px"
  }
};

export const selectButtonStyles = {
  color: "#e2ff6f",
  "font-weight": "400",
  "font-size": "13px",
  "line-height": "13px",
  height: "35px",
  fontFamily: "Overpass",
  "&:hover": {
    background: "#666673"
  }
};

export const datePickerStyles = {
  "& .MuiSvgIcon-root": {
    color: "#9d9d9d"
  },
  "& .Mui-focused": {
    color: "red"
  },
  "& .css-9425fu-MuiOutlinedInput-notchedOutline": {
    borderWidth: "0 !important"
  }
};

export const datePickerTextStyles = {
  ".MuiInputBase-input": {
    fontSize: "14px",
    padding: "4px",
    color: "#fff"
  },
  "&.MuiTypography-root-MuiDayPicker-weekDayLabel": { color: "#ffffff" }
};
