import { render, screen, logRoles } from "@testing-library/react";
import Home from "./Home";
import userEvent from "@testing-library/user-event";

// Example function that interacts with localStorage
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

function getFromStorage(key) {
  return localStorage.getItem(key);
}

test("Home component renders with successfully authentication", () => {
  const authKey = "authToken";
  const authValue =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsZXhAdGVzdC5jb20iLCJpYXQiOjE3MTM4MDg1NTYsImV4cCI6MTcxMzgxMjE1Nn0.VayI5inLqbKqWeldJhCCccfByHNtVnoIbqm7EmFAI_A";
  saveToStorage(authKey, authValue);
  expect(getFromStorage(authKey)).toBe(authValue);
  const emailKey = "email";
  const emailValue = "alex@test.com";
  saveToStorage(emailKey, emailValue);
  expect(getFromStorage(emailKey)).toBe(emailValue);

  const { container } = render(<Home />);
  logRoles(container);
  const authElement = screen.getByRole("heading", { name: /my todo list/i });
  expect(authElement).toBeInTheDocument();
  const logoutButton = screen.getByRole("button", { name: /sign out/i });
  expect(logoutButton).toBeInTheDocument();
  const addTaskButton = screen.getByRole("button", { name: /add task/i });
  expect(addTaskButton).toBeInTheDocument();
});
