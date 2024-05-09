'use client';

import { fetchGasPrices } from '@/services';
import { GasPrices, Status } from '@/types';
import { POLLING_INTERVAL } from '@/utils/constants';
import { useCallback, useEffect, useState } from 'react';

export default function usePollingGasPrices() {
  const [pollingData, setPollingData] = useState<Status<GasPrices>>({});

  const fetchData = async (abortController: AbortController) => {
    const data = await fetchGasPrices(abortController);
    setPollingData(data);
  };

  useEffect(() => {
    const abortController = new AbortController();
    fetchData(abortController);
    
    const interval = setInterval(() => {
      fetchData(abortController);
    }, POLLING_INTERVAL);

    return () => {
      abortController.abort();

      clearInterval(interval);
    };
  }, []);

  return pollingData;
}