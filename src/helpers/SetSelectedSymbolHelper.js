export const SetSelectedSymbolHelper = () => {
  const symbol = "btcusdt";
  if (window.localStorage.selectedSymbolAuxiliary) {
    const symbol = window.localStorage.selectedSymbolAuxiliary;
    return symbol;
  }
  window.localStorage.selectedSymbolAuxiliary = symbol;
  return symbol;
};
