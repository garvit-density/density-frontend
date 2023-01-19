// Pure functions used in the rendering for ordrbook

export const InsertAsk = (askArray, ask) => {
  let askCounter = 0;
  const asksArrayLength = askArray.length;
  while (askCounter < asksArrayLength) {
    if (Number(askArray[askCounter][0]) > Number(ask[0])) {
      askArray.splice(askCounter, 0, ask);
      break;
    }
    askCounter++;
  }
  return askArray;
};
export const InsertBid = (bidArray, bid) => {
  let bidCounter = 0;
  const bidsArrayLength = bidArray.length;
  while (bidCounter < bidsArrayLength) {
    if (Number(bidArray[bidCounter][0]) < Number(bid[0])) {
      bidArray.splice(bidCounter, 0, bid);
      break;
    }
    bidCounter++;
  }
  return bidArray;
};

export const CalculateAmount = (asksBidsArray, index, side) => {
  let deltaAmount = 0;
  if (side === "asks") {
    for (let i = asksBidsArray.length - 1; i >= index; --i) {
      deltaAmount += (asksBidsArray[i] && Number(asksBidsArray[i].a) * (asksBidsArray[i] && asksBidsArray[i].b));
    }
  } else if (side === "bids") {
    for (let i = 0; i <= index; ++i) {
      deltaAmount += (asksBidsArray[i] && Number(asksBidsArray[i].a) * (asksBidsArray[i] && Number(asksBidsArray[i].b)));
    }
  }
  return deltaAmount.toFixed(2);
};

const totalAmount = (asksBidsArray) => {
  let deltaAmount = 0;
  for (let i = 0; i <= asksBidsArray.length - 1; ++i) {
    deltaAmount += (asksBidsArray[i] && Number(asksBidsArray[i].a) * (asksBidsArray[i] && Number(asksBidsArray[i].b)));
  }
  return deltaAmount;
};

export const GradientPercentGenerator = (asksBidsArray, index, side) => {
  const totalAsksbids = totalAmount(asksBidsArray);
  const deltaAmount = CalculateAmount(asksBidsArray, index, side);
  return (deltaAmount / totalAsksbids) * 100;
};
