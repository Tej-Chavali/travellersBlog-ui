import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Login = () => {
  let history = useHistory();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    console.log(event.target);
    console.log(loginForm);
    const { name, value } = event.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/user/login",
        loginForm
      );
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("testKey", "Test Value");
      if (sessionStorage.token) {
        history.push("/");
      }
    } catch (err) {
      console.log({ error: err });
    }
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <form onSubmit={onSubmit}>
        <h2>Login</h2>
        <input
          className="form-control mb-3 mt-3"
          placeholder="Email"
          type="email"
          required
          name="email"
          value={loginForm.email}
          onChange={handleInputChange}
        />
        <input
          className="form-control mb-3"
          placeholder="Password"
          type="password"
          required
          name="password"
          value={loginForm.password}
          onChange={handleInputChange}
        />
        <div className="d-flex justify-content-center mb-5">
          <button className="btn btn-info" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
