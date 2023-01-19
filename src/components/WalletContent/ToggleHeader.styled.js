/* eslint-disable no-unused-vars */
import typography from "assets/Theme/typography";

export const styles = {
  btnContainer: {
    display: "flex",
    gap: 2
  },
  mobBtnContainer: {
    display: "flex",
    gap: 1,
    justifyContent: "center"
  },
  btn: {
    textTransform: "none",
    fontSize: "16px",
    fontFamily: "'Overpass',sans-serif",
    color: "5B86E5",
    fontWeight: "500",
    letterSpacing: "0"
  },
  btnContained: {
    background: `linear-gradient(90deg, #ffffff, #fcfcfc )`,
    color: "#000000",
    textTransform: "none",
    fontSize: "14px",
    fontFamily: "'Overpass',sans-serif",
    borderRadius: "4px",
    padding: "6px 16px",
    "&:hover": {
      background: `linear-gradient(90deg, #ffffff, #fcfcfc )`
    }
  },
  btnContainedMobile: {
    backgroundColor: "background.default",
    color: "#FFFFFF",
    fontSize: "10px",
    border: "1px solid #D9D9D9",
    "&:hover": {
      background: `#FFFFFF`,
      color: "#383840"
    },
    borderRadius: "0px",
    width: "100%"
  }
};
