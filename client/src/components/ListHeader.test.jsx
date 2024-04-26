import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ListHeader from "../components/ListHeader";
import React from "react";

vi.mock("react", () => ({
  ...vi.importActual("react"), // Import and retain the original React module
  useState: vi.fn(),
}));

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

  it("renders ListHeader with the correct list name and user email", () => {
    render(
      <ListHeader
        listName="My Todo List"
        userEmail="user@example.com"
        fetchData={() => {}}
      />
    );
    expect(screen.getByText("My Todo List")).toBeInTheDocument();
    expect(screen.getByText("Hello, user@example.com")).toBeInTheDocument();
  });

  it("opens the modal when the Add Task button is clicked", async () => {
    const setShowModal = vi.fn();
    vi.spyOn(React, "useState").mockImplementation((init) => [
      init,
      setShowModal,
    ]);

    render(
      <ListHeader
        listName="My Todo List"
        userEmail="user@example.com"
        fetchData={() => {}}
      />
    );
    const addButton = screen.getByText("Add Task");
    await userEvent.click(addButton);
    expect(setShowModal).toHaveBeenCalledWith(true);
  });

  it("removes user data and reloads on sign out", () => {
    render(
      <ListHeader
        listName="My Todo List"
        userEmail="user@example.com"
        fetchData={() => {}}
      />
    );
    const signOutButton = screen.getByText("Sign Out");
    fireEvent.click(signOutButton);

    expect(localStorage.removeItem).toHaveBeenCalledWith("email");
    expect(localStorage.removeItem).toHaveBeenCalledWith("authToken");
    expect(window.location.reload).toHaveBeenCalled();
  });
});
