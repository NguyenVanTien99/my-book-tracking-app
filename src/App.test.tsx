import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

jest.mock("./hooks/useGetAllBookData", () => ({
  __esModule: true,
  useGetAllBookData: () => [[], jest.fn()],
}));

const App = require("./App").default;

test("renders the MyReads app title", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText(/MyReads/i)).toBeInTheDocument();
});
