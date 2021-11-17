import React from "react";
import { Button } from "@material-ui/core";
import "./login.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginAction } from "../../redux/actions/action";

export default function Login() {
  const [user, setUser] = useState({});
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAction(user));
  };
  return (
    <div class="container-login">
      <div class="background">
        <div class="shape"></div>
        <div class="shape"></div>
      </div>
      <form onSubmit={handleSubmit}>
        <h3>Admin Netflix Login</h3>

        <label for="username">Username</label>
        <input
          type="text"
          placeholder="Email or Phone"
          id="username"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />

        <label for="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />

        <button>Log In</button>
      </form>
    </div>
  );
}
