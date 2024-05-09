import { POLLING_INTERVAL } from "@/utils/constants";
import usePollingGasPrices from "./usePollingGasPrices";
import { GasPrices, Status } from "@/types";
import { renderHook, waitFor } from "@testing-library/react";
import { mockStatusGasPrices } from "@/tests/mocks";
import services from "@/services";

jest.useFakeTimers();
jest.spyOn(global, "setInterval");

describe("usePollingGasPrices", () => {
  it(`fetching service is called after ${POLLING_INTERVAL / 1000} seconds`, async () => {
    const mockService = jest.fn();
    mockService.mockImplementation(() => new Promise(resolve => resolve({})));
    jest.spyOn(services, "fetchGasPrices").mockImplementation(mockService);
    
    const {
      result,
    } = renderHook<Status<GasPrices>, {}>(usePollingGasPrices);

    await waitFor(() =>
      expect(result.current).toEqual({})
    );
    expect(mockService).toHaveBeenCalled();
    mockService.mockImplementation(() => new Promise(resolve => resolve(mockStatusGasPrices)));

    expect(setInterval).toHaveBeenCalled();
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), POLLING_INTERVAL);

    jest.advanceTimersByTime(POLLING_INTERVAL);
    expect(mockService).toHaveBeenCalledTimes(2);

    await waitFor(() =>
      expect(result.current).toEqual(mockStatusGasPrices)
    );
  });
});
