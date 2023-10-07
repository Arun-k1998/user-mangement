import axios from "../../../axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./login.css";
import { userActions } from "../../../redux/userAuthentification";
import { useCookies } from "react-cookie";
axios.defaults.withCredentials = true;

function Login() {
  const [cookies] = useCookies(["login"]);
  const user = useSelector((store) => store.user.userToken);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("/login", {
      email,  
      password,
      withCredentials: true,
    });
    if (response.data.status) {
      const userDetails = response.data;

      let date = new Date();
      date.setTime(date.getTime() + 1 * 24 * 60 * 60 * 1000);
      const expires = "expires=" + date.toUTCString();

      document.cookie =
        "token=Bearer " + response.data.token + ";" + expires + "; path=/";
      document.cookie =
        "id=" + response.data.user._id + ";" + expires + "; path=/";
      dispatch(
        userActions.userLogin({
          name: userDetails.user.name,
          token: userDetails.token,
          _id: userDetails.user._id,
        })
      );
      navigate("/");
    } else {
      alert(response.data.message);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, []);

  return (
    <div className="login">
      <h1>Login</h1>
      <div className="loginWrapper">
        <form onSubmit={handleSubmit} className="loginForm">
          <input
            className="login-Input"
            type="email"
            placeholder="Enter Email address"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />

          <input
            className="login-Input"
            type="password"
            placeholder="Password"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button className="login-button" type="submit">
            {" "}
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
