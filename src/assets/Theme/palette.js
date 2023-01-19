import { DENSITY_BLACK, DENSITY_GREY, DENSITY_MAIN, DENSITY_WHITE, ERROR, SUCCESS } from "./palleteConstants";

const palette = {
  mode: "dark",
  primary: DENSITY_MAIN,
  background: {
    default: DENSITY_BLACK.primary,
    primary: DENSITY_BLACK.secondary,
    secondary: DENSITY_BLACK.light,
    ultradark: DENSITY_BLACK.ultradark,
    ultramild: DENSITY_GREY.ultramild,
    regular: DENSITY_GREY.regular,
    dark: DENSITY_BLACK.dark,
    white: DENSITY_WHITE.primary,
    whitemild: DENSITY_GREY.whitemild,
    mild: DENSITY_BLACK.mild,
    mindaro: DENSITY_BLACK.main,
    darkcharcol: DENSITY_GREY.darkcharcol,

    success: {
      primary: "#00BD84",
      secondary: "#E4FFF5"
    },
    error: {
      primary: "#F46151",
      secondary: "#FFF5F4"
    }
  },
  trade: {
    primary: "#2FDAAF",
    secondary: ERROR.primary
  },
  borderColor: {
    primary: DENSITY_GREY.light,
    secondary: "#4F4F4F"
  },
  text: {
    primary: DENSITY_WHITE.primary,
    secondary: DENSITY_BLACK.primary,
    dark: DENSITY_BLACK.dark,
    ultramild: DENSITY_GREY.ultramild,
    mild: "#828282",
    regular: DENSITY_WHITE.regular,
    darkliver: DENSITY_GREY.darkliver,
    whitegrey: DENSITY_WHITE.whitegrey,
    main: DENSITY_MAIN.main
  }
};

const palletAddOns = {
  text: {
    primary: DENSITY_WHITE,
    secondary: DENSITY_BLACK.primary,
    darkliver: DENSITY_BLACK.darkliver,
    dark: DENSITY_BLACK.dark,
    ultramild: DENSITY_GREY.ultramild,
    mild: "#828282",
    main: DENSITY_MAIN
  },
  // borderColor: {
  //   primary: DENSITY_GREY.light
  // },
  borderColor: {
    primary: DENSITY_GREY.light,
    secondary: DENSITY_MAIN.main
  },
  tradeColors: {
    buy: SUCCESS.primary,
    sell: ERROR.primary,
    primary: DENSITY_WHITE.primary,
    secondary: DENSITY_BLACK.primary,
    tertiary: DENSITY_MAIN.main,
    regular: DENSITY_WHITE.regular
  },

  divider: {
    primary: DENSITY_GREY.advance,
    secondary: DENSITY_GREY.light
  },
  action: {
    hover: DENSITY_GREY.primary,
    disabled: DENSITY_GREY.tertiary,
    disabledText: DENSITY_GREY.mild,
    selected: DENSITY_GREY.regular,
    unselected: DENSITY_GREY.ultramild,
    unselectedText: DENSITY_GREY.ultramild
  }
};

export { palette, palletAddOns, SUCCESS, ERROR };
