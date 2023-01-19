export const mockAppState = {
  activePositions: {
    currentPositions: [{
      sym: "BTCUSDT",
      leverage: "10",
      side: "BUY",
      entryPrice: "17204.9",
      posAmt: "0.011"
    }],
    isolatedWallet: [{
      sym: "BTCUSDT",
      isolatedWallet: "18.966"
    }],
    liquidationPrice: [{
      sym: "BTCUSDT",
      liquidationPrice: "15542.803"
    }],
    leverage: [{
      sym: "BTCUSDT",
      leverage: "10"
    }]
  },
  tradablesymbolList: {
    tradablesymbolList: [{
      symbol: "BTCUSDT",
      baseAsset: "BTC",
      quoteAsset: "USDT",
      pricePrecision: 2,
      quantityPrecision: 3,
      baseAssetPrecision: 8,
      quotePrecision: 8
    }]
  },
  wsConnection: {
    density: {
      connecting: false,
      opened: true
    },
    binance: {
      connecting: false,
      opened: true
    }
  },
  BinanceStreamData: {
    ticker: [{
      symbol: "BTCUSDT",
      ltp: "17240.30",
      change24hHigh: "17882.30",
      change24hLow: "16810.00",
      volume24h: "3150278523.55",
      change24h: "422.30",
      change24hpercent: "2.511"
    }],
    markPrice: [{
      symbol: "BTCUSDT",
      markprice: "17136.654",
      indexPrice: "17136.128",
      fundingRate: "0.00010000",
      countDown: 1670601600000
    }]
  },
  leverageBracket: {
    leverageBracket: [
      {
        symbol: "BTCUSDT",
        brackets: [
          {
            bracket: 1,
            initialLeverage: 125,
            notionalCap: 50000,
            notionalFloor: 0,
            maintMarginRatio: 0.004,
            cum: 0
          },
          {
            bracket: 2,
            initialLeverage: 100,
            notionalCap: 250000,
            notionalFloor: 50000,
            maintMarginRatio: 0.005,
            cum: 50
          },
          {
            bracket: 3,
            initialLeverage: 25,
            notionalCap: 1000000,
            notionalFloor: 250000,
            maintMarginRatio: 0.01,
            cum: 1300
          },
          {
            bracket: 4,
            initialLeverage: 15,
            notionalCap: 10000000,
            notionalFloor: 1000000,
            maintMarginRatio: 0.025,
            cum: 16300
          },
          {
            bracket: 5,
            initialLeverage: 10,
            notionalCap: 20000000,
            notionalFloor: 10000000,
            maintMarginRatio: 0.05,
            cum: 266300
          },
          {
            bracket: 6,
            initialLeverage: 5,
            notionalCap: 50000000,
            notionalFloor: 20000000,
            maintMarginRatio: 0.1,
            cum: 1266300
          },
          {
            bracket: 7,
            initialLeverage: 4,
            notionalCap: 100000000,
            notionalFloor: 50000000,
            maintMarginRatio: 0.125,
            cum: 2516300
          },
          {
            bracket: 8,
            initialLeverage: 3,
            notionalCap: 200000000,
            notionalFloor: 100000000,
            maintMarginRatio: 0.15,
            cum: 5016300
          },
          {
            bracket: 9,
            initialLeverage: 2,
            notionalCap: 300000000,
            notionalFloor: 200000000,
            maintMarginRatio: 0.25,
            cum: 25016300
          },
          {
            bracket: 10,
            initialLeverage: 1,
            notionalCap: 500000000,
            notionalFloor: 300000000,
            maintMarginRatio: 0.5,
            cum: 100016300
          }
        ]
      }
    ]
  }
};

export const zeroQuantityMock = {
  activePositions: {
    currentPositions: [{
      sym: "BTCUSDT",
      leverage: "10",
      side: "BUY",
      entryPrice: "17204.9",
      posAmt: "0"
    }],
    isolatedWallet: [{
      sym: "BTCUSDT",
      isolatedWallet: "18.966"
    }],
    liquidationPrice: [{
      sym: "BTCUSDT",
      liquidationPrice: "15542.803"
    }],
    leverage: [{
      sym: "BTCUSDT",
      leverage: "10"
    }]
  },
  tradablesymbolList: {
    tradablesymbolList: [{
      symbol: "BTCUSDT",
      baseAsset: "BTC",
      quoteAsset: "USDT",
      pricePrecision: 2,
      quantityPrecision: 3,
      baseAssetPrecision: 8,
      quotePrecision: 8
    }]
  },
  wsConnection: {
    density: {
      connecting: false,
      opened: true
    },
    binance: {
      connecting: false,
      opened: true
    }
  },
  BinanceStreamData: {
    ticker: [{
      symbol: "BTCUSDT",
      ltp: "17240.30",
      change24hHigh: "17882.30",
      change24hLow: "16810.00",
      volume24h: "3150278523.55",
      change24h: "422.30",
      change24hpercent: "2.511"
    }],
    markPrice: [{
      symbol: "BTCUSDT",
      markprice: "17136.654",
      indexPrice: "17136.128",
      fundingRate: "0.00010000",
      countDown: 1670601600000
    }]
  },
  leverageBracket: {
    leverageBracket: [
      {
        symbol: "BTCUSDT",
        brackets: [
          {
            bracket: 1,
            initialLeverage: 125,
            notionalCap: 50000,
            notionalFloor: 0,
            maintMarginRatio: 0.004,
            cum: 0
          },
          {
            bracket: 2,
            initialLeverage: 100,
            notionalCap: 250000,
            notionalFloor: 50000,
            maintMarginRatio: 0.005,
            cum: 50
          },
          {
            bracket: 3,
            initialLeverage: 25,
            notionalCap: 1000000,
            notionalFloor: 250000,
            maintMarginRatio: 0.01,
            cum: 1300
          },
          {
            bracket: 4,
            initialLeverage: 15,
            notionalCap: 10000000,
            notionalFloor: 1000000,
            maintMarginRatio: 0.025,
            cum: 16300
          },
          {
            bracket: 5,
            initialLeverage: 10,
            notionalCap: 20000000,
            notionalFloor: 10000000,
            maintMarginRatio: 0.05,
            cum: 266300
          },
          {
            bracket: 6,
            initialLeverage: 5,
            notionalCap: 50000000,
            notionalFloor: 20000000,
            maintMarginRatio: 0.1,
            cum: 1266300
          },
          {
            bracket: 7,
            initialLeverage: 4,
            notionalCap: 100000000,
            notionalFloor: 50000000,
            maintMarginRatio: 0.125,
            cum: 2516300
          },
          {
            bracket: 8,
            initialLeverage: 3,
            notionalCap: 200000000,
            notionalFloor: 100000000,
            maintMarginRatio: 0.15,
            cum: 5016300
          },
          {
            bracket: 9,
            initialLeverage: 2,
            notionalCap: 300000000,
            notionalFloor: 200000000,
            maintMarginRatio: 0.25,
            cum: 25016300
          },
          {
            bracket: 10,
            initialLeverage: 1,
            notionalCap: 500000000,
            notionalFloor: 300000000,
            maintMarginRatio: 0.5,
            cum: 100016300
          }
        ]
      }
    ]
  }
};
