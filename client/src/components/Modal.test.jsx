import { render, screen } from "@testing-library/react";
import Modal from "./Modal";
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
});

afterEach(() => {
  vi.restoreAllMocks();
});

test("Modal component renders with the correct form fields", () => {
  const fetchData = vi.fn();
  render(<Modal mode="add" setShowModal={vi.fn()} fetchData={fetchData} />);
  expect(
    screen.getByRole("heading", { name: /add your task/i })
  ).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /x/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  expect(screen.getByRole("textbox")).toBeInTheDocument();
  expect(screen.getByRole("slider", { name: /progress/i })).toBeInTheDocument();
});

test("Modal component submits the form successfully when the submit button is clicked with add mode", async () => {
  const fetchData = vi.fn();
  const user = userEvent.setup();
  render(<Modal mode="add" setShowModal={vi.fn()} fetchData={fetchData} />);
  const titleInput = screen.getByRole("textbox");
  const progressInput = screen.getByRole("slider", { name: /progress/i });
  await user.type(titleInput, "Learn Next.js");
  await user.click(progressInput, { target: { value: 50 } });
  const submitButton = screen.getByRole("button", { name: /submit/i });
  await user.click(submitButton);
  expect(fetchData).toHaveBeenCalledTimes(1);
});

test("Modal component closes the modal when the close button is clicked", async () => {
  const setShowModal = vi.fn();
  const fetchData = vi.fn();
  const user = userEvent.setup();
  render(
    <Modal mode="add" setShowModal={setShowModal} fetchData={fetchData} />
  );
  const closeButton = screen.getByRole("button", { name: /x/i });
  await user.click(closeButton);
  expect(setShowModal).toHaveBeenCalledTimes(1);
});

test("Modal component submits the form successfully when the submit button is clicked with edit mode", async () => {
  const task = [
    {
      id: 1,
      user_email: "alex@test.com",
      title: "Learn Next.js",
      progress: 50,
      date: "2021-09-01",
    },
    {
      id: 2,
      user_email: "alex@test.com",
      title: "Learn Nest.js",
      progress: 40,
      date: "2021-09-02",
    },
    {
      id: 3,
      user_email: "alex@test.com",
      title: "Learn Nuxt.js",
      progress: 30,
      date: "2021-09-03",
    },
  ];
  const fetchData = vi.fn();
  const user = userEvent.setup();
  render(
    <Modal
      mode="edit"
      setShowModal={vi.fn()}
      fetchData={fetchData}
      task={task}
    />
  );
  const titleInput = screen.getByRole("textbox");
  const progressInput = screen.getByRole("slider", { name: /progress/i });
  await user.type(titleInput, "Learn Next.js");
  await user.click(progressInput, { target: { value: 50 } });
  const submitButton = screen.getByRole("button", { name: /submit/i });
  await user.click(submitButton);
  expect(fetchData).toHaveBeenCalledTimes(1);
});

test("Modal component renders with the correct form fields with add mode status NOT 201", async () => {
  const fetchData = vi.fn();
  const user = userEvent.setup();
  server.use(
    http.post("http://localhost:3001/tasks", async ({ request }) => {
      // Read the request body as JSON.
      const task = await request.json();
      return new HttpResponse(null, { status: 401 });
    })
  );
  render(<Modal mode="add" setShowModal={vi.fn()} fetchData={fetchData} />);
  const titleInput = screen.getByRole("textbox");
  const progressInput = screen.getByRole("slider", { name: /progress/i });
  await user.type(titleInput, "Learn Next.js");
  await user.click(progressInput, { target: { value: 50 } });
  const submitButton = screen.getByRole("button", { name: /submit/i });
  await user.click(submitButton);
  expect(fetchData).toHaveBeenCalledTimes(0);
  expect(localStorage.removeItem).toHaveBeenCalledWith("email");
  expect(localStorage.removeItem).toHaveBeenCalledWith("authToken");
});

test("Modal component renders with error with add mode status ", async () => {
  const fetchData = vi.fn();
  const user = userEvent.setup();
  server.use(
    http.post("http://localhost:3001/tasks", async ({ request }) => {
      // Read the request body as JSON.
      const task = await request.json();
      return HttpResponse.error({ details: "error" });
    })
  );
  render(<Modal mode="add" setShowModal={vi.fn()} fetchData={fetchData} />);
  const titleInput = screen.getByRole("textbox");
  const progressInput = screen.getByRole("slider", { name: /progress/i });
  await user.type(titleInput, "Learn Next.js");
  await user.click(progressInput, { target: { value: 50 } });
  const submitButton = screen.getByRole("button", { name: /submit/i });
  await user.click(submitButton);
  expect(fetchData).toHaveBeenCalledTimes(0);
  expect(localStorage.removeItem).toHaveBeenCalledTimes(2);
});

test("Modal component renders with the correct form fields with edit mode NOT status 200", async () => {
  server.use(
    http.patch("http://localhost:3001/tasks/:id", async ({ request }) => {
      // Read the request body as JSON.
      const task = await request.json();
      return new HttpResponse(null, { status: 400 });
    })
  );
  const user = userEvent.setup();
  const task = {
    id: 1,
    user_email: "alex@test.com",
    title: "Learn Next.js",
    progress: 50,
    date: "2021-09-01",
  };
  const fetchData = vi.fn();
  render(
    <Modal
      mode="edit"
      setShowModal={vi.fn()}
      fetchData={fetchData}
      task={task}
    />
  );
  const titleInput = screen.getByRole("textbox");
  const progressInput = screen.getByRole("slider", { name: /progress/i });
  await user.type(titleInput, "Learn Next.js");
  await user.click(progressInput, { target: { value: 50 } });
  const submitButton = screen.getByRole("button", { name: /submit/i });
  await user.click(submitButton);
  expect(fetchData).toHaveBeenCalledTimes(0);
  expect(localStorage.removeItem).toHaveBeenCalledTimes(4);
});

test("Modal component renders with error with edit mode", async () => {
  server.use(
    http.patch("http://localhost:3001/tasks/:id", async ({ request }) => {
      // Read the request body as JSON.
      const task = await request.json();
      return HttpResponse.error({ details: "error" });
    })
  );
  const user = userEvent.setup();
  const task = {
    id: 1,
    user_email: "alex@test.com",
    title: "Learn Next.js",
    progress: 50,
    date: "2021-09-01",
  };
  const fetchData = vi.fn();
  render(
    <Modal
      mode="edit"
      setShowModal={vi.fn()}
      fetchData={fetchData}
      task={task}
    />
  );
  const titleInput = screen.getByRole("textbox");
  const progressInput = screen.getByRole("slider", { name: /progress/i });
  await user.type(titleInput, "Learn Next.js");
  await user.click(progressInput, { target: { value: 50 } });
  const submitButton = screen.getByRole("button", { name: /submit/i });
  await user.click(submitButton);
  expect(fetchData).toHaveBeenCalledTimes(0);
  expect(localStorage.removeItem).toHaveBeenCalledTimes(2);
});
