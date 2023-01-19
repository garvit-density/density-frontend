const SIDES = {
  SELL: "SHORT",
  BUY: "LONG"
};
const SIDES_HISTORY = {
  SELL: "SELL",
  BUY: "BUY"
};

export const sxColorUtility = (val, sx, parentContainer) => {
  const densityGreen = "#2FDAAF";
  const densityRed = "#F46151";
  const getColor = (val) => {
    const stringColor = (val) => val === (parentContainer ? SIDES_HISTORY.BUY : SIDES.BUY) ? densityGreen : densityRed;
    const numColor = (val) => Math.sign(val) === 1 ? densityGreen : densityRed;
    if (typeof val === "string") return stringColor(val);
    if (typeof val === "number") return numColor(val);
  };
  const updatedSx = JSON.parse(JSON.stringify(sx));
  updatedSx.color = getColor(val);
  return updatedSx;
};
