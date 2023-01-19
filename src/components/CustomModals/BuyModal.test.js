
// import dependencies
import React from "react";

import { WALLET_CONSTANTS } from "../../frontend-BL/WALLET/Constants/WalletConstants.const";
import { TOGGLEHEADER_CONSTANTS } from "components/WalletContent/ToggleHeader.const";

// import react-testing methods
import { render, screen, renderHook } from "@testing-library/react";

// add custom jest matchers from jest-dom
import "@testing-library/jest-dom";

import { useDispatch, useSelector } from "react-redux";

// the component to test
import ToggleHeader from "../../components/WalletContent/ToggleHeader";
import { fiatBuyUsdtApi } from "api-server/Api";
import { act } from "react-dom/test-utils";
import { useBuyModal } from "frontend-BL";

const mockAppState = {
  selectedWallet: { selectedWallet: "FUTURES" },
  walletScreenRender: { walletScreenRenderFlag: false },
  profile: { profileDetails: { userBankAccount: { accountNumber: "50100*******37", ifsc: "HDFC00****3" } } }
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

jest.mock("api-server/Api/FiatTransaction", () => ({
  ...jest.requireActual("api-server/Api/FiatTransaction"),
  fiatBuyUsdtApi: jest.fn()
}));

describe("WalletSuite", () => {
  // setup
  beforeEach(() => {
    useSelector.mockImplementation(callback => callback(mockAppState));
    useDispatch.mockImplementation(() => () => jest.fn());
    fiatBuyUsdtApi.mockImplementation(() => Promise.resolve({ data: { data: { amount: null } } }));
  });
  afterEach(() => {
    useSelector.mockClear();
    fiatBuyUsdtApi.mockClear();
    useDispatch.mockClear();
  });

  // tests
  it("disable buy and sell USDT if KYC/Bank Account not verified", () => {
    const { rerender } = render(<ToggleHeader currentTab={1} kycStatus={TOGGLEHEADER_CONSTANTS.KYC_VERIFIED} pennydropStatus={TOGGLEHEADER_CONSTANTS.PENNYDROP_VERIFIED}/>);

    let buyUSDTButton = screen.getByText(WALLET_CONSTANTS.BUY_MODAL_TITLE);
    expect(buyUSDTButton).not.toBeDisabled();
    let sellUSDTButton = screen.getByText(WALLET_CONSTANTS.SELL_MODAL_TITLE);
    expect(sellUSDTButton).not.toBeDisabled();

    rerender(<ToggleHeader currentTab={1} kycStatus={TOGGLEHEADER_CONSTANTS.KYC_NOT_VERIFIED} pennydropStatus={TOGGLEHEADER_CONSTANTS.KYC_NOT_VERIFIED} />);

    buyUSDTButton = screen.queryByText(WALLET_CONSTANTS.BUY_MODAL_TITLE);
    expect(buyUSDTButton).toBeDisabled();
    sellUSDTButton = screen.getByText(WALLET_CONSTANTS.SELL_MODAL_TITLE);
    expect(sellUSDTButton).toBeDisabled();
  });
  it("Buy Modal Input Field Validation", () => {
    const { result, rerender } = renderHook(() => useBuyModal({
      isOpen: true,
      close: () => jest.fn(),
      setIsSuccessModalOpen: () => jest.fn(),
      setHelperText: () => jest.fn()
    }));

    act(() => {
      result.current.setAmountInInr(100);
      result.current.setConversionRateForUSDT(80);
      result.current.setFiatBalance(200);
    });

    rerender();

    result.current.handleSubmit();
    expect(fiatBuyUsdtApi).toBeCalledTimes(1);
  });
});
