export const title = {
  fontSize: "23px"
};
export const backgroundRegular = "background.regular";

export const formControlStyles = { color: "text.primary", width: "100%" };

export const selectOverrideStyles = {
  backgroundColor: backgroundRegular,
  "&:MuiInputBase-root": {
    paddingTop: "15px",
    paddingBottom: "15px"
  },
  selected: {
    backgroundColor: backgroundRegular
  },
  // borderRadius: "5px",
  "&:hover": {
    backgroundColor: backgroundRegular
  }
};

export const menuItemOverride = {
  color: "text.primary",
  "&:hover": {
    backgroundColor: "background.regular"
  }
};

export const TextFieldStyles = {
  backgroundColor: "background.regular",
  borderRadius: "3px",
  width: "100%",
  height: "3.5em",
  marginLeft: "1%",
  marginBottom: "3%",
  color: "text.primary"
};
