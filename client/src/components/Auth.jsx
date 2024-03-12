import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { SIGNIN, SIGNUP, USERS, LIGHTGRAY, WHITE } from "../constants";

const Auth = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const serverURL = import.meta.env.VITE_SERVERURL;

  const viewLogin = (status) => {
    setError(null);
    setIsLogin(status);
  };

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();
    if (!isLogin && password !== confirmPassword) {
      setError("passwords do not match");
      return;
    }
    const response = await fetch(`${serverURL}/${USERS}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (data.details) {
      setError(data.details);
    } else {
      setCookie("email", data.email);
      setCookie("authToken", data.token);

      window.location.reload();
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form action="">
          <h2>{isLogin ? "please log in" : "please sign up"}</h2>
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isLogin && (
            <input
              type="password"
              placeholder="confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}
          <input
            type="submit"
            className="create"
            onClick={(e) => handleSubmit(e, isLogin ? SIGNIN : SIGNUP)}
          />
          {error && <p className="error">{error}</p>}
        </form>
        <div className="auth-options">
          <button
            onClick={() => viewLogin(false)}
            style={{ backgroundColor: !isLogin ? LIGHTGRAY : WHITE }}
          >
            sign up
          </button>
          <button
            onClick={() => viewLogin(true)}
            style={{ backgroundColor: isLogin ? LIGHTGRAY : WHITE }}
          >
            login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
