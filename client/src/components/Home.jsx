import { useEffect, useState } from "react";
import ListHeader from "./ListHeader";
import ListItem from "./ListItem";
import Auth from "./Auth";
import { useCookies } from "react-cookie";
import { TASKS } from "../constants";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Home() {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const authToken = cookies.authToken;
  const userEmail = cookies.email;
  // console.log('authToken', authToken);
  // console.log('email', userEmail);
  const serverURL = import.meta.env.VITE_SERVERURL;
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const isTokenExpired = (token) => {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  };

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
      removeCookie("email");
      removeCookie("authToken");
      window.location.reload();
    }
  }

  useEffect(() => {
    if (authToken) {
      if (isTokenExpired(authToken)) {
        removeCookie("email");
        removeCookie("authToken");
        window.location.reload();
      }
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

export default Home;
