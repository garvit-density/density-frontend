
// import dependencies
import React from "react";

import { WALLET_CONSTANTS } from "../../frontend-BL/WALLET/Constants/WalletConstants.const";
import { TOGGLEHEADER_CONSTANTS } from "components/WalletContent/ToggleHeader.const";

// import react-testing methods
import { render, screen, renderHook, waitFor } from "@testing-library/react";

import useDepositModal from "../../frontend-BL/WALLET/useDepositModal";

// add custom jest matchers from jest-dom
import "@testing-library/jest-dom";

import { useDispatch, useSelector } from "react-redux";

// the component to test
import ToggleHeader from "../WalletContent/ToggleHeader";
import { fiatBuyUsdtApi, fiatDepositApi, fiatSellUsdtApi, fiatWithdrawApi, fiatWithdrawInitiateApi } from "api-server/Api";
import { act } from "react-dom/test-utils";
import { useBuyModal, useSellModal, useWithdrawModal } from "frontend-BL";

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
  fiatBuyUsdtApi: jest.fn(),
  fiatSellUsdtApi: jest.fn(),
  fiatDepositApi: jest.fn(),
  fiatWithdrawApi: jest.fn(),
  fiatWithdrawInitiateApi: jest.fn()
}));

describe("WalletSuite", () => {
  // setup
  beforeEach(() => {
    useSelector.mockImplementation(callback => callback(mockAppState));
    useDispatch.mockImplementation(() => () => jest.fn());
    fiatBuyUsdtApi.mockImplementation(() => Promise.resolve({ data: { data: { amount: null } } }));
    fiatSellUsdtApi.mockImplementation(() => Promise.resolve({ data: { data: { fiatValue: null } } }));
    fiatDepositApi.mockImplementation(() => Promise.resolve({ data: { data: { refId: null, amount: null } } }));
    fiatWithdrawApi.mockImplementation(() => Promise.resolve());
    fiatWithdrawInitiateApi.mockImplementation(() => Promise.resolve({ data: { data: { verificationId: null } } }));
  });
  afterEach(() => {
    useSelector.mockClear();
    useDispatch.mockClear();
    fiatBuyUsdtApi.mockClear();
    fiatSellUsdtApi.mockClear();
    fiatDepositApi.mockClear();
    fiatWithdrawApi.mockClear();
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

    act(() => {
      result.current.setAmountInInr(20);
      result.current.setConversionRateForUSDT(80);
      result.current.setFiatBalance(200);
    });

    rerender();
    fiatBuyUsdtApi.mockClear();

    result.current.handleSubmit();
    expect(fiatBuyUsdtApi).toBeCalledTimes(0);

    act(() => {
      result.current.setAmountInInr(20);
      result.current.setConversionRateForUSDT(80);
      result.current.setFiatBalance(10);
    });

    rerender();
    fiatBuyUsdtApi.mockClear();

    result.current.handleSubmit();
    expect(fiatBuyUsdtApi).toBeCalledTimes(0);

    act(() => {
      result.current.setAmountInInr("");
      result.current.setConversionRateForUSDT(80);
      result.current.setFiatBalance(10);
    });

    rerender();
    fiatBuyUsdtApi.mockClear();

    result.current.handleSubmit();
    expect(fiatBuyUsdtApi).toBeCalledTimes(0);
  });
  it("Sell Modal Input Field Validation", () => {
    const { result, rerender } = renderHook(() => useSellModal({
      isOpen: true,
      close: () => jest.fn(),
      setIsSuccessModalOpen: () => jest.fn(),
      setHelperText: () => jest.fn(),
      setHelperTextForOTP: () => jest.fn()
    }));

    act(() => {
      result.current.setAmountinUsdt(2);
      result.current.setFreeMarginBalance(10);
      result.current.setConversionRateForUSDT(80);
    });

    rerender();

    result.current.action();
    expect(fiatSellUsdtApi).toBeCalledTimes(1);

    act(() => {
      result.current.setAmountinUsdt(0.5);
      result.current.setFreeMarginBalance(10);
      result.current.setConversionRateForUSDT(80);
    });

    rerender();
    fiatSellUsdtApi.mockClear();

    result.current.action();
    expect(fiatSellUsdtApi).toBeCalledTimes(0);

    act(() => {
      result.current.setAmountinUsdt(10);
      result.current.setFreeMarginBalance(5);
      result.current.setConversionRateForUSDT(80);
    });

    rerender();
    fiatSellUsdtApi.mockClear();

    result.current.action();
    expect(fiatSellUsdtApi).toBeCalledTimes(0);

    act(() => {
      result.current.setAmountinUsdt(2);
      result.current.setFreeMarginBalance(50);
      result.current.setConversionRateForUSDT(80);
      result.current.setTransferToAccount(true);
    });

    rerender();
    fiatSellUsdtApi.mockClear();

    result.current.action();
    expect(fiatSellUsdtApi).toBeCalledTimes(0);

    act(() => {
      result.current.setAmountinUsdt(10);
      result.current.setFreeMarginBalance(50);
      result.current.setConversionRateForUSDT(80);
      result.current.setTransferToAccount(true);
      result.current.setIsOtpScreen(true);
      result.current.setOtpNumber(1234);
    });

    rerender();
    fiatBuyUsdtApi.mockClear();

    result.current.action();
    expect(fiatSellUsdtApi).toBeCalledTimes(1);

    act(() => {
      result.current.setAmountinUsdt(10);
      result.current.setFreeMarginBalance(50);
      result.current.setConversionRateForUSDT(80);
      result.current.setTransferToAccount(true);
      result.current.setIsOtpScreen("");
      result.current.setOtpNumber(1234);
    });

    rerender();
    fiatSellUsdtApi.mockClear();

    result.current.action();
    expect(fiatSellUsdtApi).toBeCalledTimes(0);
  });
  it("Deposit Modal Input Field Validation", () => {
    const { result, rerender } = renderHook(() => useDepositModal({
      isOpen: true,
      close: () => jest.fn(),
      setIsSuccessModalOpen: () => jest.fn(),
      setHelperText: () => jest.fn(),
      setHelperTextForTransaction: () => jest.fn()
    }));

    act(() => {
      result.current.setAmount(WALLET_CONSTANTS.MINIMUM_INR_DEPOSIT);
      result.current.setReferenceId("1234");
    });

    rerender();

    result.current.action();

    rerender();

    result.current.action();
    expect(fiatDepositApi).toBeCalledTimes(1);
    fiatDepositApi.mockClear();

    act(() => {
      result.current.setAmount(WALLET_CONSTANTS.MINIMUM_INR_DEPOSIT - 1);
      result.current.setReferenceId("1234");
      result.current.setShowConfirm(false);
    });

    rerender();

    result.current.action();

    rerender();

    result.current.action();
    expect(fiatDepositApi).toBeCalledTimes(0);
    fiatDepositApi.mockClear();

    act(() => {
      result.current.setAmount(WALLET_CONSTANTS.MAXIMUM_INR_DEPOSIT);
      result.current.setReferenceId("1234");
      result.current.setShowConfirm(false);
    });

    rerender();

    result.current.action();

    rerender();

    result.current.action();
    expect(fiatDepositApi).toBeCalledTimes(1);
    fiatDepositApi.mockClear();

    act(() => {
      result.current.setAmount(WALLET_CONSTANTS.MAXIMUM_INR_DEPOSIT + 1);
      result.current.setReferenceId("1234");
      result.current.setShowConfirm(false);
    });

    rerender();

    result.current.action();

    rerender();

    result.current.action();
    expect(fiatDepositApi).toBeCalledTimes(0);
    fiatDepositApi.mockClear();
  });
  it("Withdraw Modal Input Field Validation", async () => {
    const { result, rerender } = renderHook(() => useWithdrawModal({
      isOpen: true,
      close: () => jest.fn(),
      setIsSuccessModalOpen: () => jest.fn(),
      setHelperText: () => jest.fn(),
      setHelperTextForOTP: () => jest.fn()
    }));

    act(() => {
      result.current.setAmount(WALLET_CONSTANTS.MINIMUM_INR_WITHDRAW);
      result.current.setOtpNumber(1234);
      result.current.setFiatBalance(1000);
    });

    rerender();

    await waitFor(() => {
      result.current.action();
    });

    rerender();

    result.current.action();
    expect(fiatWithdrawApi).toBeCalledTimes(1);
    fiatWithdrawApi.mockClear();

    act(() => {
      result.current.setAmount(WALLET_CONSTANTS.MINIMUM_INR_WITHDRAW - 1);
      result.current.setOtpNumber(1234);
      result.current.setFiatBalance(1000);
      result.current.setShowConfirm(false);
    });

    rerender();

    await waitFor(() => {
      result.current.action();
    });

    rerender();

    result.current.action();
    expect(fiatWithdrawApi).toBeCalledTimes(0);
    fiatWithdrawApi.mockClear();

    act(() => {
      result.current.setAmount(WALLET_CONSTANTS.MAXIMUM_INR_WITHDRAW);
      result.current.setOtpNumber(1234);
      result.current.setFiatBalance(50000000);
      result.current.setShowConfirm(false);
    });

    rerender();

    await waitFor(() => {
      result.current.action();
    });

    rerender();

    result.current.action();
    expect(fiatWithdrawApi).toBeCalledTimes(1);
    fiatWithdrawApi.mockClear();

    act(() => {
      result.current.setAmount(WALLET_CONSTANTS.MAXIMUM_INR_WITHDRAW + 1);
      result.current.setOtpNumber(1234);
      result.current.setFiatBalance(50000000);
      result.current.setShowConfirm(false);
    });

    rerender();

    await waitFor(() => {
      result.current.action();
    });

    rerender();

    result.current.action();
    expect(fiatWithdrawApi).toBeCalledTimes(0);
  });
});
