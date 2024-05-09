import "@testing-library/jest-dom"
import { act, fireEvent, render, waitFor } from "@testing-library/react";

import services from "@/services";
import {
  DATA_ETHER_PRICE_TEST_ID,
  DATA_GAS_PRICES_TEST_ID,
  ERROR_ETHER_PRICE_TEST_ID,
  ERROR_GAS_PRICES_TEST_ID,
  LOADING_ETHER_PRICE_TEST_ID,
  LOADING_GAS_PRICES_TEST_ID,
  START_POLLING_BANNER
} from "@/tests/dataTestIds";

import Home from "./page";
import { mockStatusEtherPrice, mockStatusGasPrices } from "@/tests/mocks";

describe("Home page", () => {
  it("match initial snapshot", () => {
    const { asFragment, getByTestId } = render(<Home />);
    expect(asFragment()).toMatchSnapshot();

    expect(getByTestId(LOADING_GAS_PRICES_TEST_ID)).toBeInTheDocument();
    expect(getByTestId(LOADING_ETHER_PRICE_TEST_ID)).toBeInTheDocument();
  });

  it("close start polling banner", () => {
    const { asFragment, getByTestId, queryByTestId } = render(<Home />);
    expect(asFragment()).toMatchSnapshot();
    expect(queryByTestId(START_POLLING_BANNER)).toBeInTheDocument();

    act(() => {
      fireEvent.click(getByTestId(`${START_POLLING_BANNER}-button`));
    });

    waitFor(() => {
      expect(queryByTestId(START_POLLING_BANNER)).not.toBeInTheDocument();
    });
  });

  it("match snapshot with success data", async () => {
    const mockFetchGasPrices = jest.fn();
    mockFetchGasPrices.mockImplementation(() => new Promise(resolve => resolve(mockStatusGasPrices)));
    jest.spyOn(services, "fetchGasPrices").mockImplementation(mockFetchGasPrices);

    const mockFetchEtherPrice = jest.fn();
    mockFetchEtherPrice.mockImplementation(() => new Promise(resolve => resolve(mockStatusEtherPrice)));
    jest.spyOn(services, "fetchEtherPrice").mockImplementation(mockFetchEtherPrice);
    
    const { asFragment, queryByTestId } = render(<Home />);

    await waitFor(() => {
      expect(queryByTestId(DATA_GAS_PRICES_TEST_ID)).toBeInTheDocument();
      expect(queryByTestId(DATA_ETHER_PRICE_TEST_ID)).toBeInTheDocument();
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it("match snapshot with error data ", async () => {
    const mockFetchGasPrices = jest.fn();
    mockFetchGasPrices.mockImplementation(() => new Promise(resolve => resolve({
      error: "Error fetching gas prices."
    })));
    jest.spyOn(services, "fetchGasPrices").mockImplementation(mockFetchGasPrices);

    const mockFetchEtherPrice = jest.fn();
    mockFetchEtherPrice.mockImplementation(() => new Promise(resolve => resolve({
      error: "Error fetching ether price."
    })));
    jest.spyOn(services, "fetchEtherPrice").mockImplementation(mockFetchEtherPrice);
    
    const { asFragment, queryByTestId } = render(<Home />);

    await waitFor(() => {
      expect(queryByTestId(ERROR_GAS_PRICES_TEST_ID)).toBeInTheDocument();
      expect(queryByTestId(ERROR_ETHER_PRICE_TEST_ID)).toBeInTheDocument();
    });

    expect(asFragment()).toMatchSnapshot();
  });
});
