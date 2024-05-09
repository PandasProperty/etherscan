import { ServerEtherPriceResponse, ServerGasPricesResponse } from "@/services/types";
import { EtherPrice, GasPrices, Status } from "@/types";

export const mockSafeGasPrice = 4;
export const mockProposeGasPrice = 5;
export const mockFastGasPrice = 3;

export const mockGasPricesServerResponseSuccess: ServerGasPricesResponse = {
  "status": "1",
  "message": "OK",
  "result": {
    "LastBlock": "19823715",
    "SafeGasPrice": `${mockSafeGasPrice}`,
    "ProposeGasPrice": `${mockProposeGasPrice}`,
    "FastGasPrice": `${mockFastGasPrice}`,
    "suggestBaseFee": "3.896782287",
    "gasUsedRatio": "0.452475233333333,0.257827633333333,0.3119807,0.343971033333333,0.558954"
  }
};

export const mockGasPricesServerResponseError: ServerGasPricesResponse = {
  "status": "-1",
  "message": "Some error getting the gas prices.",
  result: undefined as any,
};

export const mockGasPrices: GasPrices = {
  safeGasPrice: mockSafeGasPrice,
  fastGasPrice: mockFastGasPrice,
  proposeGasPrice: mockProposeGasPrice,
};

export const mockStatusGasPrices: Status<GasPrices> = {
  error: undefined,
  data: mockGasPrices,
};

export const mockEthbtc = 0.0482566877036949;
export const mockEthusd = 3017.88751860053;

export const mockEtherPriceServerResponseSuccess: ServerEtherPriceResponse = {
  "status": "1",
  "message": "OK",
  "result": {
    "ethbtc": `${mockEthbtc}`,
    "ethbtc_timestamp": "1715151830",
    "ethusd": `${mockEthusd}`,
    "ethusd_timestamp": "1715151825"
  }
};

export const mockEtherPriceServerResponseError: ServerEtherPriceResponse = {
  "status": "-1",
  "message": "Some error getting ether price information.",
  result: undefined as any,
};

export const mockEtherPrice: EtherPrice = {
  ethbtc: mockEthbtc,
  ethusd: mockEthusd,
};

export const mockStatusEtherPrice: Status<EtherPrice> = {
  error: undefined,
  data: mockEtherPrice,
};