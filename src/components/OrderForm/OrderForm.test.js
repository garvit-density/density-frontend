// import dependencies
import React from "react";

// import react-testing methods
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ORDERFORM_CONSTANTS } from "../../frontend-BL/ORDER_FORM/Constants/Orderform_const";

import OrderForm from "./OrderForm";

// add custom jest matchers from jest-dom
import "@testing-library/jest-dom";

import { useDispatch, useSelector } from "react-redux";

import { tradableSymbolsMock } from "helpers/tests/TRADABLE_SYMBOLS_CONSTANTS";

const mockAppState = {
  tradablesymbolList: { tradablesymbolList: tradableSymbolsMock.symbols },
  selectSymbol: { selectedSymbol: "btcusdt" },
  availableBalance: { availableBalance: 100 },
  activePositions: { leverage: [{ sym: "BTCUSDT", leverage: "2" }] },
  currentPositions: { currentPositions: [{ sym: "BTCUSDT", side: "SHORT", size: 50 }] },
  BinanceStreamData: { ticker: [{ symbol: "BTCUSDT", lp: 20000 }] }
};

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn()
}));

describe("WalletSuite", () => {
  // setup
  beforeEach(() => {
    useSelector.mockImplementation(callback => callback(mockAppState));
    useDispatch.mockImplementation(() => () => jest.fn());
  });
  afterEach(() => {
    useSelector.mockClear();
    useDispatch.mockClear();
  });

  // tests
  it("Input Size Field Validation", () => {
    const { container } = render(<OrderForm/>);

    userEvent.click(container.querySelector("#buySellAction"));
    let validationError = screen.getByText(ORDERFORM_CONSTANTS.REQUIRED_LABEL);
    expect(validationError).toBeInTheDocument();

    const sizeField = container.querySelector("#sizeField");
    fireEvent.change(sizeField, { target: { value: 400 } });
    userEvent.click(container.querySelector("#buySellAction"));
    validationError = screen.getByText(ORDERFORM_CONSTANTS.EXCEEDS_AVAILABLE_BALANCE_LABEL);
    expect(validationError).toBeInTheDocument();

    fireEvent.change(sizeField, { target: { value: 140 } });
    userEvent.click(container.querySelector("#buySellAction"));
    validationError = screen.queryByText(ORDERFORM_CONSTANTS.EXCEEDS_AVAILABLE_BALANCE_LABEL);
    expect(validationError).not.toBeInTheDocument();
  });
});
