import { useEffect, useState } from "react";
import ListHeader from "./ListHeader";
import ListItem from "./ListItem";
import Auth from "./Auth";
import { TASKS } from "../constants";
import { jwtDecode } from "jwt-decode";

function Home() {
  const authToken = localStorage.getItem("authToken");
  const userEmail = localStorage.getItem("email");
  const serverURL = import.meta.env.VITE_SERVERURL;
  const [tasks, setTasks] = useState([]);

  const isTokenExpired = (token) => {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  };
  //fetch tasks from the database
  async function fetchData() {
    try {
      const response = await fetch(`${serverURL}/${TASKS}/${userEmail}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      const json = await response.json();
      setTasks(json);
    } catch (error) {
      console.log(error);
      localStorage.removeItem("email");
      localStorage.removeItem("authToken");
      window.location.reload();
    }
  }

  useEffect(() => {
    if (authToken) {
      if (isTokenExpired(authToken)) {
        localStorage.removeItem("email");
        localStorage.removeItem("authToken");
        window.location.reload();
      }
      fetchData();
    }
  }, []);

  const sortedTasks = tasks?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <>
      {!authToken ? (
        <Auth />
      ) : (
        <div className="mx-12">
          <ListHeader
            listName={"My Todo List"}
            userEmail={userEmail}
            fetchData={fetchData}
          />
          <ul>
            {sortedTasks.map((task) => (
              <ListItem key={task.id} task={task} fetchData={fetchData} />
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default Home;
