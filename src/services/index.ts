import { EtherPrice, GasPrices, Status } from '@/types';
import { baseUrl } from '@/utils/constants';
import { ServerEtherPriceResponse, ServerGasPricesResponse } from './types';

export async function fetchGasPrices(abortController: AbortController): Promise<Status<GasPrices>> {
  const searchParams = new URLSearchParams();
  searchParams.set('module', 'gastracker');
  searchParams.set('action', 'gasoracle');
  searchParams.set('apikey', process.env.NEXT_PUBLIC_ETHER_SCAN_API_KEY!);
  let url = new URL(`${baseUrl}?${searchParams.toString()}`)

  console.log('url', url.href);

  try {
    const response = await fetch(url.href, {
      signal: abortController.signal,
    });
  
    const data: ServerGasPricesResponse = await response.json();

    if (data.status !== "1" || data.message !== "OK") {
      return {
        error: data.message,
        data: undefined,
      };
    }
    return {
      error: undefined,
      data: {
        safeGasPrice: Number(data.result.SafeGasPrice),
        proposeGasPrice: Number(data.result.ProposeGasPrice),
        fastGasPrice: Number(data.result.FastGasPrice)
      }
    };
  } catch (error: any) {
    if (error.name === 'AbortError') {
      return {};
    }
    return {
      error: error.message,
      data: undefined,
    };
  }
}


export async function fetchEtherPrice(abortController: AbortController): Promise<Status<EtherPrice>> {
  const searchParams = new URLSearchParams();
  searchParams.set('module', 'stats');
  searchParams.set('action', 'ethprice');
  searchParams.set('apikey', process.env.NEXT_PUBLIC_ETHER_SCAN_API_KEY!);
  let url = new URL(`${baseUrl}?${searchParams.toString()}`)

  try {
    const response = await fetch(url.href, {
      signal: abortController.signal,
    });
  
    const data: ServerEtherPriceResponse = await response.json();

    if (data.status !== "1" || data.message !== "OK") {
      return {
        error: data.message,
        data: undefined,
      };
    }
    return {
      error: undefined,
      data: {
        ethbtc: Number(data.result.ethbtc),
        ethusd: Number(data.result.ethusd),
      }
    };
  } catch (error: any) {
    if (error.name === 'AbortError') {
      return {};
    }
    return {
      error: error.message,
      data: undefined,
    };
  }
}