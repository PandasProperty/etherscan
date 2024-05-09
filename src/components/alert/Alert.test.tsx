import "@testing-library/jest-dom"

import { act, fireEvent, render, waitFor } from "@testing-library/react";

import Alert from ".";

describe("Alert", () => {
  it("matched snapshot", () => {
    const onClose = jest.fn();
    const { asFragment, getByTestId, queryByTestId } = render(<Alert dataTestId="TestId" message="Dummy alert" type="ERROR" onClose={onClose} />);
    expect(asFragment()).toMatchSnapshot();
    expect(queryByTestId("TestId")).toBeInTheDocument();

    act(() => {
      fireEvent.click(getByTestId("TestId-button"));
    });

    waitFor(() => {
      expect(queryByTestId("TestId")).not.toBeInTheDocument();
    });
  });
});
