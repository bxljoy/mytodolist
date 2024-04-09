import { render, screen, fireEvent } from "@testing-library/react";
import { test, expect } from "vitest";
import Auth from "./Auth";
// import renderer from "react-test-renderer";

test("Title is visible", () => {
  render(<Auth />);
  const titleElement = screen.getByText(/sign in to your account/i);
  expect(titleElement).toBeInTheDocument();
});

test("Email address is visible", () => {
  render(<Auth />);
  expect(screen.getByText(/email address/i)).toBeInTheDocument();
  expect(
    screen.getByRole("textbox", { name: /email address/i })
  ).toBeInTheDocument();
});

test("Pasword is visible", () => {
  render(<Auth />);
  expect(screen.getByText(/password/i)).toBeInTheDocument();
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
  render(<Auth />);
  const emailInput = screen.getByLabelText(/email address/i);
  expect(emailInput).toBeInTheDocument();
  fireEvent.change(emailInput, { target: { value: "alex@test.com" } });

  const passwordInput = screen.getByLabelText(/password/i);
  expect(passwordInput).toBeInTheDocument();
  fireEvent.change(passwordInput, { target: { value: "123456" } });

  const signinButton = screen.getByRole("button", { name: /submit/i });
  expect(signinButton).toBeInTheDocument();
  fireEvent.click(signinButton);
  // screen.debug();
});

test("Sign In submit button on click failed", async () => {
  render(<Auth />);
  const emailInput = screen.getByLabelText(/email address/i);
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
  render(<Auth />);
  const signupButton = screen.getByRole("button", { name: /sign up/i });
  expect(signupButton).toBeInTheDocument();
  fireEvent.click(signupButton);

  const emailInput = screen.getByLabelText(/email address/i);
  expect(emailInput).toBeInTheDocument();
  fireEvent.change(emailInput, { target: { value: "alex@test.com" } });

  const passwordInput = screen.getByLabelText("Password");
  expect(passwordInput).toBeInTheDocument();
  fireEvent.change(passwordInput, { target: { value: "123456" } });

  const confirmPasswordInput = screen.getByLabelText("Confirm Password");
  expect(confirmPasswordInput).toBeInTheDocument();
  fireEvent.change(confirmPasswordInput, { target: { value: "123456" } });

  const signupSubmitButton = screen.getByRole("button", { name: /submit/i });
  expect(signupSubmitButton).toBeInTheDocument();
  fireEvent.click(signupSubmitButton);
});

test("Sign Up submit button on click failed", async () => {
  render(<Auth />);
  const signupButton = screen.getByRole("button", { name: /sign up/i });
  expect(signupButton).toBeInTheDocument();
  fireEvent.click(signupButton);

  const emailInput = screen.getByLabelText(/email address/i);
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

// function toJson(component) {
//   const result = component.toJSON();
//   expect(result).toBeDefined();
//   expect(result).not.toBeInstanceOf(Array);
//   return result;
// }

// test("Auth rendered snapshot", () => {
//   const component = renderer.create(<Auth />);
//   let tree = toJson(component);
//   // console.log(tree.children[1].children[0].children[0].children[1].children[0]);
//   expect(tree).toMatchSnapshot();

//   // manually fill the email field
//   tree.children[1].children[0].children[0].children[1].children[0].props.onChange(
//     {
//       target: { value: "alex@test.com" },
//     }
//   );
//   expect(tree).toMatchSnapshot();

//   // manually fill the password field
//   // console.log(tree.children[1].children[0].children[1].children[1].children[0]);
//   tree.children[1].children[0].children[1].children[1].children[0].props.onChange(
//     {
//       target: { value: "123456" },
//     }
//   );
//   expect(tree).toMatchSnapshot();
// });
