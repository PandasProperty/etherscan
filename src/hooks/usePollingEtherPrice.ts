"use client";

import services from "@/services";
import { EtherPrice, Status } from "@/types";
import { POLLING_INTERVAL } from "@/utils/constants";
import { useEffect, useState } from "react";

export default function usePollingEtherPrice() {
  const [pollingData, setPollingData] = useState<Status<EtherPrice>>({});

  const fetchData = async (abortController: AbortController) => {
    const data = await services.fetchEtherPrice(abortController);
    setPollingData(data);
  }

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return pollingData;
}