type GasPricesResult = {
  LastBlock: string;
  SafeGasPrice: string;
  ProposeGasPrice: string;
  FastGasPrice: string;
  suggestBaseFee: string;
  gasUsedRatio: string;
};

type EtherPriceResult = {
  ethbtc: string;
  ethbtc_timestamp: string;
  ethusd: string;
  ethusd_timestamp: string;
};

export type ServerResponse<T> = {
  status: string;
  message: string;
  result: T;
};

export type ServerGasPricesResponse = ServerResponse<GasPricesResult>;
export type ServerEtherPriceResponse = ServerResponse<EtherPriceResult>;
