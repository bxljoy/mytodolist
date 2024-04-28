import { render, screen } from "@testing-library/react";
import ProgressBar from "./ProgressBar";

test("ProgressBar component renders with the correct progress value", async () => {
  render(<ProgressBar progress={50} />);
  const progressInput = screen.getByTestId("progress-bar");
  expect(progressInput).toBeInTheDocument();
  expect(progressInput).toHaveStyle("width: 50%");
});
