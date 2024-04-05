import { render, screen } from "./utils/test-utils";
import App from "./App";
import { test, expect } from "vitest";

test("renders Sign in to your account", () => {
  render(<App />);
  const headingElement = screen.getByText(/Sign in to your account/i);
  expect(headingElement).toBeInTheDocument();
});
