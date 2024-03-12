import React, { useEffect, useState } from "react";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import Auth from "./components/Auth";
import { useCookies } from "react-cookie";
import { TASKS } from "./constants";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const authToken = cookies.authToken;
  const userEmail = cookies.email;
  // console.log('authToken', authToken);
  // console.log('email', userEmail);
  const serverURL = import.meta.env.VITE_SERVERURL;
  const [tasks, setTasks] = useState([]);

  async function fetchData() {
    // const userEmail = 'jingping@li.com';
    try {
      const response = await fetch(`${serverURL}/${TASKS}/${userEmail}`);
      const json = await response.json();
      setTasks(json);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (authToken) {
      fetchData();
    }
  }, []);

  // console.log(tasks);

  const sortedTasks = tasks?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="app">
      {" "}
      {!authToken && <Auth />}
      {authToken && (
        <>
          <ListHeader listName={"Holiday Tick List"} fetchData={fetchData} />
          <p>welcome back {userEmail}</p>
          {sortedTasks.map((task) => (
            <ListItem key={task.id} task={task} fetchData={fetchData} />
          ))}
        </>
      )}
    </div>
  );
}

export default App;
