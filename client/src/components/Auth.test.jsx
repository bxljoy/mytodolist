import { render, screen, fireEvent } from "@testing-library/react";
import Auth from "./Auth";
import { http, HttpResponse } from "msw";
import { server } from "../mocks/server";
import userEvent from "@testing-library/user-event";
import { expect } from "vitest";

test("Logo image is visible", () => {
  render(<Auth />);
  const logoElement = screen.getByRole("img", { name: /your logo/i });
  expect(logoElement).toBeInTheDocument();
});

test("Title is visible", () => {
  render(<Auth />);
  const titleElement = screen.getByRole("heading", {
    name: /your account/i,
  });
  expect(titleElement).toBeInTheDocument();
});

test("Email address is visible", () => {
  render(<Auth />);
  expect(
    screen.getByRole("textbox", { name: /email address/i })
  ).toBeInTheDocument();
});

test("Pasword is visible", () => {
  render(<Auth />);
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  // screen.logTestingPlaygroundURL();
});

test("Sign up toggle button on click", async () => {
  render(<Auth />);
  const signupButton = screen.getByRole("button", { name: /sign up/i });
  expect(signupButton).toBeInTheDocument();
  fireEvent.click(signupButton);
  expect(await screen.findByText(/sign up your account/i)).toBeInTheDocument();
  // screen.debug();
});

test("Sign in toggle button on click", async () => {
  render(<Auth />);
  const signupButton = screen.getByRole("button", { name: /sign up/i });
  expect(signupButton).toBeInTheDocument();
  fireEvent.click(signupButton);
  expect(await screen.findByText(/sign up your account/i)).toBeInTheDocument();

  const signinButton = screen.getByRole("button", { name: /sign in/i });
  expect(signinButton).toBeInTheDocument();
  fireEvent.click(signinButton);
  expect(
    await screen.findByText(/sign in to your account/i)
  ).toBeInTheDocument();
});

test("Sign In submit button on click successfully", async () => {
  const user = userEvent.setup();
  render(<Auth />);
  const emailInput = screen.getByRole("textbox", { name: /email address/i });
  expect(emailInput).toBeInTheDocument();
  fireEvent.change(emailInput, { target: { value: "alex@test.com" } });

  const passwordInput = screen.getByLabelText(/password/i);
  expect(passwordInput).toBeInTheDocument();
  fireEvent.change(passwordInput, { target: { value: "123456" } });

  const signinButton = screen.getByRole("button", { name: /submit/i });
  expect(signinButton).toBeInTheDocument();

  // Mock window.location.reload
  const reloadMock = vi.fn();
  window.location = { reload: reloadMock };

  // fireEvent.click(signinButton);
  await user.click(signinButton);

  // Assert that window.location.reload was called
  expect(reloadMock).toHaveBeenCalledTimes(1);
});

test("Sign In submit button on click failed", async () => {
  server.resetHandlers(
    http.post("http://localhost:3001/users/signin", () => {
      return HttpResponse.json({
        status: 400,
        details: "Error message Sign In",
      });
    }),
    http.post("http://localhost:3001/users/signup", () => {
      return HttpResponse.json({
        status: 400,
        details: "Error message Sign Up",
      });
    })
  );
  render(<Auth />);
  const emailInput = screen.getByRole("textbox", { name: /email address/i });
  expect(emailInput).toBeInTheDocument();
  fireEvent.change(emailInput, { target: { value: "alex@test.com" } });

  const passwordInput = screen.getByLabelText(/password/i);
  expect(passwordInput).toBeInTheDocument();
  fireEvent.change(passwordInput, { target: { value: "12345" } });

  const signinButton = screen.getByRole("button", { name: /submit/i });
  expect(signinButton).toBeInTheDocument();
  fireEvent.click(signinButton);
  expect(await screen.findByText(/error message/i)).toBeInTheDocument();
});

test("Sign Up submit button on click successfully", async () => {
  const user = userEvent.setup();
  render(<Auth />);
  const signupButton = screen.getByRole("button", { name: /sign up/i });
  expect(signupButton).toBeInTheDocument();
  await user.click(signupButton);

  const emailInput = screen.getByRole("textbox", { name: /email address/i });
  expect(emailInput).toBeInTheDocument();
  fireEvent.change(emailInput, { target: { value: "alex@test.com" } });

  const passwordInput = screen.getByLabelText("Password");
  expect(passwordInput).toBeInTheDocument();
  fireEvent.change(passwordInput, { target: { value: "123456" } });

  const confirmPasswordInput = screen.getByLabelText(/confirm Password/i);
  expect(confirmPasswordInput).toBeInTheDocument();
  fireEvent.change(confirmPasswordInput, { target: { value: "123456" } });

  const signupSubmitButton = screen.getByRole("button", { name: /submit/i });
  expect(signupSubmitButton).toBeInTheDocument();
  await user.click(signupSubmitButton);
});

test("Sign Up submit button on click failed", async () => {
  render(<Auth />);
  const signupButton = screen.getByRole("button", { name: /sign up/i });
  expect(signupButton).toBeInTheDocument();
  fireEvent.click(signupButton);

  const emailInput = screen.getByRole("textbox", { name: /email address/i });
  expect(emailInput).toBeInTheDocument();
  fireEvent.change(emailInput, { target: { value: "alex@test.com" } });

  const passwordInput = screen.getByLabelText("Password");
  expect(passwordInput).toBeInTheDocument();
  fireEvent.change(passwordInput, { target: { value: "123456" } });

  const confirmPasswordInput = screen.getByLabelText("Confirm Password");
  expect(confirmPasswordInput).toBeInTheDocument();
  fireEvent.change(confirmPasswordInput, { target: { value: "654321" } });

  const signupSubmitButton = screen.getByRole("button", { name: /submit/i });
  expect(signupSubmitButton).toBeInTheDocument();
  fireEvent.click(signupSubmitButton);
  expect(
    await screen.findByText(/passwords do not match/i)
  ).toBeInTheDocument();
});
