import { render, screen } from "@testing-library/react";
import ListHeader from "./ListHeader";

test("ListHeader component renders with the correct list name", () => {
  const userEmail = "alex@test.com";
  const authToken = "mocked_user_token";
  async function fetchData() {
    try {
      const response = await fetch(`http://localhost:3001/tasks/${userEmail}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      const json = await response.json();
      return json;
    } catch (error) {
      console.log(error);
    }
  }
  render(
    <ListHeader
      listName="My Todo List"
      userEmail={userEmail}
      fetchData={fetchData}
    />
  );
  const authElement = screen.getByRole("heading", { name: /my todo list/i });
  expect(authElement).toBeInTheDocument();
  const helloElement = screen.getByText(/hello/i);
  expect(helloElement).toBeInTheDocument();
  const logoutButton = screen.getByRole("button", { name: /sign out/i });
  expect(logoutButton).toBeInTheDocument();
  const addTaskButton = screen.getByRole("button", { name: /add task/i });
  expect(addTaskButton).toBeInTheDocument();
});
