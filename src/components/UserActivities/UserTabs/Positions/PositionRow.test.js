// import React from "react";

import usePositionsCalculations from "../../../../frontend-BL/POSITIONS/usePositionCalculations";

import { renderHook } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { mockAppState } from "./mocks/PositionRow.mock";
// import { getLeverageBracketApi, positionRiskApi } from "api-server/Api/Futures";
// import { act } from "react-dom/test-utils";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn()
}));

jest.mock("api-server/Api/Futures", () => ({
  ...jest.requireActual("api-server/Api/Futures"),
  getLeverageBracketApi: jest.fn(),
  positionRiskApi: jest.fn()
}));

describe("Positions Calculations Suite", () => {
  // setup
  beforeEach(() => {
    useSelector.mockImplementation(callback => callback(mockAppState));
    useDispatch.mockImplementation(() => () => jest.fn());
  });
  afterEach(() => {
    useSelector.mockClear();
    useDispatch.mockClear();
  });

  it("Liquidaton Price Calculation", () => {
    const { result, rerender } = renderHook(() => usePositionsCalculations({
      symbol: "BTCUSDT"
    }));
    rerender();
    expect(result.current.calculateLiquidationPrice).toBe("15,542.89");
  });

  it("Position Size Calculation", () => {
    const { result, rerender } = renderHook(() => usePositionsCalculations({
      symbol: "BTCUSDT"
    }));
    rerender();
    expect(result.current.getPositionSize).toBe(189.64329999999998);
  });

  it("Entry Price Validation", () => {
    const { result, rerender } = renderHook(() => usePositionsCalculations({
      symbol: "BTCUSDT"
    }));
    rerender();
    expect(result.current.getEntryPrice).toBe("17204.9");
  });

  it("Unrealized Profit Calculation", () => {
    const { result, rerender } = renderHook(() => usePositionsCalculations({
      symbol: "BTCUSDT"
    }));
    rerender();
    expect(result.current.getPositionUnrealizedProfit).toBe(0.389399999999976);
  });

  it("Unrealized Profit Calculation", () => {
    const { result, rerender } = renderHook(() => usePositionsCalculations({
      symbol: "BTCUSDT"
    }));
    rerender();
    expect(result.current.getPositionUnrealizedProfit).toBe(0.389399999999976);
  });

  it("Margin Ratio Calculation", () => {
    const { result, rerender } = renderHook(() => usePositionsCalculations({
      symbol: "BTCUSDT"
    }));
    rerender();
    expect(result.current.getPositionMarginRatio).toBe(3.9191812104115686);
  });
});
