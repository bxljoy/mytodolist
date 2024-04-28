import { render, screen } from "@testing-library/react";
import ListItem from "./ListItem";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { server } from "../mocks/server";

beforeEach(() => {
  let store = {};
  vi.stubGlobal("localStorage", {
    getItem: vi.fn((key) => store[key]),
    setItem: vi.fn((key, value) => (store[key] = value)),
    removeItem: vi.fn((key) => delete store[key]),
  });

  vi.spyOn(global, "fetch").mockResolvedValue({
    json: () =>
      Promise.resolve({
        user_email: "alex@test.com",
        title: "Learn Next.js",
        progress: 50,
        date: "2021-09-01",
      }),
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

vi.mock("./Modal", () => ({
  default: () => {
    return <div>Mocked Modal</div>;
  },
}));

test("ListItem component renders with the correct task data", () => {
  vi.mock("./ProgressBar", () => ({
    default: () => {
      return <div>Progress: 50%</div>;
    },
  }));
  const task = {
    title: "Learn Next.js",
    progress: 50,
    date: "2021-09-01",
  };
  render(<ListItem task={task} />);
  expect(screen.getByText("Learn Next.js")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /edit/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();
  expect(screen.getByText("Progress: 50%")).toBeInTheDocument();
});

test("ListItem component deletes the task when the delete button is clicked mock fetch", async () => {
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

  render(<ListItem task={{ title: "Learn Next.js", progress: 50 }} />);
  const deleteButton = screen.getByRole("button", { name: /delete/i });
  expect(deleteButton).toBeInTheDocument();
  await user.click(deleteButton);
  expect(fetch).toHaveBeenCalledTimes(1);
});

const fetchData = vi.fn();
fetchData.mockResolvedValue([]);

test("ListItem component deletes the task when the delete button is clicked real fetch successfully", async () => {
  vi.restoreAllMocks();
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

  render(
    <ListItem
      fetchData={fetchData}
      task={{ id: 1, title: "Learn Next.js", progress: 50 }}
    />
  );
  const deleteButton = screen.getByRole("button", { name: /delete/i });
  expect(deleteButton).toBeInTheDocument();
  await user.click(deleteButton);
  expect(fetchData).toHaveBeenCalledTimes(1);
});

test("ListItem component deletes the task when the delete button is clicked real fetch and get error", async () => {
  vi.restoreAllMocks();
  server.use(
    http.delete("http://localhost:3001/tasks/:id", async ({ params }) => {
      const { id } = params;
      return HttpResponse.error({
        status: 400,
        body: { details: "error" },
      });
    })
  );

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

  render(
    <ListItem
      fetchData={fetchData}
      task={{ id: 1, title: "Learn Next.js", progress: 50 }}
    />
  );
  const deleteButton = screen.getByRole("button", { name: /delete/i });
  expect(deleteButton).toBeInTheDocument();
  await user.click(deleteButton);
  expect(fetchData).toHaveBeenCalledTimes(0);
});

test("ListItem component edit the task when the edit button is clicked", async () => {
  vi.restoreAllMocks();
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

  render(
    <ListItem
      fetchData={fetchData}
      task={{ id: 1, title: "Learn Next.js", progress: 50 }}
    />
  );
  const editButton = screen.getByRole("button", { name: /edit/i });
  expect(editButton).toBeInTheDocument();
  await user.click(editButton);
  expect(screen.getByText("Mocked Modal")).toBeInTheDocument();
});
