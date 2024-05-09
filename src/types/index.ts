export interface GasPrices {
  safeGasPrice: number;
  proposeGasPrice: number;
  fastGasPrice: number;
};

export interface EtherPrice {
  ethbtc: number;
  ethusd: number;
};

export type Status<T> = {
  error?: string;
  data?: T;
};
