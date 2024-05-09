import {
  mockEthbtc,
  mockEtherPriceServerResponseError,
  mockEtherPriceServerResponseSuccess,
  mockEthusd,
  mockFastGasPrice,
  mockGasPricesServerResponseError,
  mockGasPricesServerResponseSuccess,
  mockProposeGasPrice,
  mockSafeGasPrice
} from '@/tests/mocks';
import services from '.';

describe("services", () => {
  describe("fetchGasPrices", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("return error when server request resolves with status not ok", async () => {
      jest.spyOn(global, "fetch").mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockGasPricesServerResponseError),
        } as Response)
      );

      const response = await services.fetchGasPrices({ signal: null} as any as AbortController);
      expect(response).toEqual({
        error: mockGasPricesServerResponseError.message,
        data: undefined,
      });
    });

    it("return error when server request throws and exception", async () => {
      jest.spyOn(global, "fetch").mockImplementationOnce(() =>
        Promise.reject(new Error("Some error."))
      );

      const response = await services.fetchGasPrices({ signal: null} as any as AbortController);
      expect(response).toEqual({
        error: "Some error.",
        data: undefined,
      });
    });

    it("ignore abort error", async () => {
      jest.spyOn(global, "fetch").mockImplementationOnce(() => {
        const error = new Error("Some error.");
        error.name = "AbortError";
        return Promise.reject(error)
      });

      const response = await services.fetchGasPrices({ signal: null} as any as AbortController);
      expect(response).toEqual({});
    });

    it("return correct data when server request is successful", async () => {
      jest.spyOn(global, "fetch").mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockGasPricesServerResponseSuccess),
        } as Response)
      );

      const response = await services.fetchGasPrices({ signal: null} as any as AbortController);
      expect(response).toEqual({
        error: undefined,
        data: {
          safeGasPrice: mockSafeGasPrice,
          proposeGasPrice: mockProposeGasPrice,
          fastGasPrice: mockFastGasPrice
        },
      });
    });

  });

  describe("fetchEtherPrice", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("return error when server request resolves with status not ok", async () => {
      jest.spyOn(global, "fetch").mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockEtherPriceServerResponseError),
        } as Response)
      );

      const response = await services.fetchEtherPrice({ signal: null} as any as AbortController);
      expect(response).toEqual({
        error: mockEtherPriceServerResponseError.message,
        data: undefined,
      });
    });

    it("return error when server request throws and exception", async () => {
      jest.spyOn(global, "fetch").mockImplementationOnce(() =>
        Promise.reject(new Error("Some error."))
      );

      const response = await services.fetchEtherPrice({ signal: null} as any as AbortController);
      expect(response).toEqual({
        error: "Some error.",
        data: undefined,
      });
    });

    it("ignore abort error", async () => {
      jest.spyOn(global, "fetch").mockImplementationOnce(() => {
        const error = new Error("Some error.");
        error.name = "AbortError";
        return Promise.reject(error);
      });

      const response = await services.fetchEtherPrice({ signal: null} as any as AbortController);
      expect(response).toEqual({});
    });

    it("return correct data when server request is successful", async () => {
      jest.spyOn(global, "fetch").mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockEtherPriceServerResponseSuccess),
        } as Response)
      );

      const response = await services.fetchEtherPrice({ signal: null} as any as AbortController);
      expect(response).toEqual({
        error: undefined,
        data: {
          ethbtc: mockEthbtc,
          ethusd: mockEthusd
        },
      });
    });
  });
});