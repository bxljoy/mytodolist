import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ListHeader from "./ListHeader";

describe("ListHeader Component", () => {
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

  const fetchData = vi.fn();
  fetchData.mockResolvedValue([
    {
      user_email: "alex@test.com",
      title: "Learn Next.js",
      progress: 50,
      date: "2021-09-01",
    },
  ]);
  fetchData.mockRejectedValue({ details: "error" });

  vi.mock("./Modal", () => ({
    default: () => {
      return <div>Mocked Modal</div>;
    },
  }));

  it("renders ListHeader with the correct list name and user email", () => {
    render(
      <ListHeader
        listName="My Todo List"
        userEmail="user@example.com"
        fetchData={fetchData}
      />
    );
    expect(screen.getByText("My Todo List")).toBeInTheDocument();
    expect(screen.getByText(/user@example.com/i)).toBeInTheDocument();
  });

  it("opens the modal when the Add Task button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <ListHeader
        listName="My Todo List"
        userEmail="user@example.com"
        fetchData={fetchData}
      />
    );
    const addButton = screen.getByText("Add Task");
    await user.click(addButton);
    expect(screen.getByText("Mocked Modal")).toBeInTheDocument();
  });

  it("removes user data and reloads on sign out", async () => {
    const user = userEvent.setup();
    render(
      <ListHeader
        listName="My Todo List"
        userEmail="user@example.com"
        fetchData={fetchData}
      />
    );
    const signOutButton = screen.getByText("Sign Out");
    await user.click(signOutButton);

    expect(localStorage.removeItem).toHaveBeenCalledWith("email");
    expect(localStorage.removeItem).toHaveBeenCalledWith("authToken");
  });
});
