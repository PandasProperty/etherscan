import { POLLING_INTERVAL } from "@/utils/constants";
import usePollingEtherPrice from "./usePollingEtherPrice";
import { EtherPrice, Status } from "@/types";
import { mockStatusEtherPrice } from "@/tests/mocks";
import { renderHook, waitFor } from "@testing-library/react";
import services from "@/services";

jest.useFakeTimers();
jest.spyOn(global, "setInterval");

describe("usePollingEtherPrice", () => {
  it(`fetching service is called after ${POLLING_INTERVAL / 1000} seconds`, async () => {
    const mockService = jest.fn();
    mockService.mockImplementation(() => new Promise(resolve => resolve({})));
    jest.spyOn(services, "fetchEtherPrice").mockImplementation(mockService);
    
    const {
      result,
    } = renderHook<Status<EtherPrice>, {}>(usePollingEtherPrice);

    await waitFor(() =>
      expect(result.current).toEqual({})
    );
    expect(mockService).toHaveBeenCalled();
    mockService.mockImplementation(() => new Promise(resolve => resolve(mockStatusEtherPrice)));

    expect(setInterval).toHaveBeenCalled();
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), POLLING_INTERVAL);

    jest.advanceTimersByTime(POLLING_INTERVAL);
    expect(mockService).toHaveBeenCalledTimes(2);

    await waitFor(() =>
      expect(result.current).toEqual(mockStatusEtherPrice)
    );
  });
});
