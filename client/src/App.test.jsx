import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Sign in to your account", () => {
  render(<App />);
  const headingElement = screen.getByText(/sign in to your account/i);
  expect(headingElement).toBeInTheDocument();
});
