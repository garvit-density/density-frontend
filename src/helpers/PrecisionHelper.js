import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { numberWithCommas } from "./commaHelper";

export const SymbolPrecisionHelper = (symbol) => {
  symbol = symbol && symbol.toUpperCase();
  const nanFallback = "--";
  const symbolPrecisionData = useSelector((state) => state.tradablesymbolList.tradablesymbolList.find(data => data.symbol === symbol));
  const symbolPricePrecision = useMemo(() => { if (symbolPrecisionData !== undefined) return symbolPrecisionData.pricePrecision; }, [symbolPrecisionData]);
  const symbolQuantityPrecision = useMemo(() => { if (symbolPrecisionData !== undefined) return symbolPrecisionData.quantityPrecision; }, [symbolPrecisionData]);

  const setDecimalPrecision = useCallback((n) => {
    if (isNaN(n)) return nanFallback;
    const res = Number(Number(n).toFixed(symbolPricePrecision));
    return numberWithCommas(res);
  }, [symbolPricePrecision]);

  const defaultlimiter = (n) => {
    if (isNaN(n)) return nanFallback;
    const res = Number(Number(n).toFixed(2));
    return numberWithCommas(res);
  };
  const setQuantityPrecision = useCallback((n) => {
    if (isNaN(n)) return nanFallback;
    const res = Number(Number(n).toFixed(symbolQuantityPrecision));
    return numberWithCommas(res);
  }, [symbolQuantityPrecision]);

  return {
    setDecimalPrecision,
    defaultlimiter,
    setQuantityPrecision
  };
};
