import { render, screen } from "@testing-library/react";
import Home from "./Home";
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

test("Home component renders with successfully authentication", () => {
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
});

test("Home component renders with no authentication", async () => {
  render(<Home />);
  const authElement = screen.getByText(/mocked auth/i);
  expect(authElement).toBeInTheDocument();
});

test("Home component fetches data error", async () => {
  const authKey = "authToken";
  const authValue =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsZXhAdGVzdC5jb20iLCJpYXQiOjE3MTM4MDg1NTYsImV4cCI6MTcxMzgxMjE1Nn0.VayI5inLqbKqWeldJhCCccfByHNtVnoIbqm7EmFAI_A";
  localStorage.setItem(authKey, authValue);
  expect(localStorage.getItem(authKey)).toBe(authValue);
  const emailKey = "email";
  const emailValue = "alex@test.com";
  localStorage.setItem(emailKey, emailValue);
  expect(localStorage.getItem(emailKey)).toBe(emailValue);

  server.use(
    http.get("http://localhost:3001/tasks/:userEmail", async ({ params }) => {
      const { userEmail } = params;
      console.log(userEmail);
      return HttpResponse.error({
        status: 400,
        body: "Internal Server Error",
      });
    })
  );
  render(<Home />);
  expect(localStorage.removeItem).toHaveBeenCalledWith("email");
  expect(localStorage.removeItem).toHaveBeenCalledWith("authToken");
});
