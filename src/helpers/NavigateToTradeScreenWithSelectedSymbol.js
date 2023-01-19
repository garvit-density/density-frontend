import { selectedSymbol } from "frontend-BL/redux/actions/Internal/SetSelectedSymbol.ac";
import { useDispatch } from "react-redux";

const NavigateToTradeScreenWithSelectedSymbol = (symbol) => {
  const dispatch = useDispatch();
  //  window.location.href = GetAppURL();
  dispatch(selectedSymbol(symbol.toLowerCase()));
  // window.localStorage.selectedSymbolAuxiliary = symbol.toLocaleLowerCase();
};

export default NavigateToTradeScreenWithSelectedSymbol;
