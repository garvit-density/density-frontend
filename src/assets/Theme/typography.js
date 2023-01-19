import { pxToRem } from "./Utils/fontHelpers";

const FONT_PRIMARY = "Overpass";

const FONT_WEIGHTS = {
  Regular: 400,
  Medium: 500,
  SemiBold: 600,
  Bold: 700
};

const typography = {
  fontFamily: FONT_PRIMARY,
  Regular_10: {
    fontWeight: FONT_WEIGHTS.Regular,
    fontSize: pxToRem(10)
  },
  Regular_11: {
    fontWeight: FONT_WEIGHTS.Regular,
    fontSize: pxToRem(11)
  },
  Regular_12: {
    fontWeight: FONT_WEIGHTS.Regular,
    fontSize: pxToRem(12)
  },
  Regular_14: {
    fontWeight: FONT_WEIGHTS.Regular,
    fontSize: pxToRem(14)
  },
  Regular_16: {
    fontWeight: FONT_WEIGHTS.Regular,
    fontSize: pxToRem(16)
  },
  Regular_40: {
    fontWeight: FONT_WEIGHTS.Regular,
    fontSize: pxToRem(40)
  },
  Regular_14_LH: {
    fontWeight: FONT_WEIGHTS.Regular,
    fontSize: pxToRem(12),
    lineHeight: 21
  },
  Medium_14: {
    fontWeight: FONT_WEIGHTS.Medium,
    fontSize: pxToRem(14)
  },
  Medium_11: {
    fontWeight: FONT_WEIGHTS.Medium,
    fontSize: pxToRem(11),
    lineHeight: 13
  },
  Medium_10: {
    fontWeight: FONT_WEIGHTS.Medium,
    fontSize: pxToRem(10)
  },
  Medium_18: {
    fontWeight: FONT_WEIGHTS.Medium,
    fontSize: pxToRem(18)
  },
  SemiBold_11: {
    fontWeight: FONT_WEIGHTS.SemiBold,
    fontSize: pxToRem(11)
  },
  SemiBold_20: {
    fontWeight: FONT_WEIGHTS.SemiBold,
    fontSize: pxToRem(20)
  },
  SemiBold_12: {
    fontWeight: FONT_WEIGHTS.SemiBold,
    fontSize: pxToRem(12),
    lineHeight: pxToRem(17)
  },
  SemiBold_14: {
    fontWeight: FONT_WEIGHTS.SemiBold,
    fontSize: pxToRem(14)
  },
  SemiBold_16: {
    fontWeight: FONT_WEIGHTS.SemiBold,
    fontSize: pxToRem(16)
  },
  SemiBold_18: {
    fontWeight: FONT_WEIGHTS.SemiBold,
    fontSize: pxToRem(18),
    lineHeight: 17
  },

  SemiBold_28: {
    fontWeight: FONT_WEIGHTS.SemiBold,
    fontSize: pxToRem(28)
  },
  Bold_14_17: {
    fontWeight: FONT_WEIGHTS.Bold,
    fontSize: pxToRem(14),
    lineHeight: 17
  },
  Bold_14_21: {
    fontWeight: FONT_WEIGHTS.Bold,
    fontSize: pxToRem(14)
  },
  Bold_16_21: {
    fontWeight: FONT_WEIGHTS.Bold,
    fontSize: pxToRem(16)
  },

  Bold_22_20: {
    fontWeight: FONT_WEIGHTS.SemiBold,
    fontSize: pxToRem(22),
    lineHeight: 20
  },

  // KYC_VERIFICATION
  Regular_12_KYC: {
    fontWeight: FONT_WEIGHTS.SemiBold,
    fontSize: pxToRem(12)
  },
  SemiBold_18_KYC: {
    fontWeight: FONT_WEIGHTS.SemiBold,
    fontSize: pxToRem(18)
  },
  SemiBold_28_KYC: {
    fontWeight: FONT_WEIGHTS.Medium,
    fontSize: pxToRem(28)
  }
};

export default typography;
