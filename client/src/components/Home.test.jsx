import { render, screen } from "@testing-library/react";
import Home from "./Home";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, test, vi } from "vitest";
import { http, HttpResponse } from "msw";
import { server } from "../mocks/server";

// Setup a localStorage mock
beforeEach(() => {
  let store = {};
  vi.stubGlobal("localStorage", {
    getItem: vi.fn((key) => store[key]),
    setItem: vi.fn((key, value) => (store[key] = value)),
    removeItem: vi.fn((key) => delete store[key]),
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

vi.mock("jwt-decode", () => {
  return {
    jwtDecode: () => {
      return {
        exp: 1713812156,
      };
    },
  };
});

// vi.mock("./ListHeader", () => ({
//   default: (listName, userEmail, fetchData) => {
//     return <div>Mocked ListHeader</div>;
//   },
// }));

vi.mock("./Auth", () => ({
  default: () => {
    return <div>Mocked Auth</div>;
  },
}));

vi.mock("./Modal", () => ({
  default: () => {
    return <div>Mocked Modal</div>;
  },
}));

// vi.mock("./ListItems", () => ({
//   default: (tasks, fetchData) => {
//     return <div>Mocked ListItems</div>;
//   },
// }));

test("Home component renders with successfully authentication", async () => {
  const user = userEvent.setup();
  const authKey = "authToken";
  const authValue =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsZXhAdGVzdC5jb20iLCJpYXQiOjE3MTM4MDg1NTYsImV4cCI6MTcxMzgxMjE1Nn0.VayI5inLqbKqWeldJhCCccfByHNtVnoIbqm7EmFAI_A";
  localStorage.setItem(authKey, authValue);
  expect(localStorage.getItem(authKey)).toBe(authValue);
  const emailKey = "email";
  const emailValue = "alex@test.com";
  localStorage.setItem(emailKey, emailValue);
  expect(localStorage.getItem(emailKey)).toBe(emailValue);

  render(<Home />);
  const authElement = screen.getByRole("heading", { name: /my todo list/i });
  expect(authElement).toBeInTheDocument();
  const logoutButton = screen.getByRole("button", { name: /sign out/i });
  expect(logoutButton).toBeInTheDocument();
  const addTaskButton = screen.getByRole("button", { name: /add task/i });
  expect(addTaskButton).toBeInTheDocument();
  screen.debug();
});

test("Home component renders with no authentication", async () => {
  render(<Home />);
  const authElement = screen.getByText(/mocked auth/i);
  expect(authElement).toBeInTheDocument();
  screen.debug();
});
