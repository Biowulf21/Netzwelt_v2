
import React, { useState } from "react";
import "./login.css";
import { useAuth } from "../contexts/authContextProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function LoginPage() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log('in submit')
    e.preventDefault();

    const result = await axios.post('http://localhost:3000/api/login', { username: username, password: password })

    if (result.status == 200) {
      setIsLoggedIn(true);
      navigate('/')
    } else {
      toast.error('Login Failed')
    }

  }


  return (
    <>
      <div className="login-container">
        {isLoggedIn ? <h1>Logged in</h1> : <h1>Not Logged In</h1>}
        <h2>Login</h2>
        <form>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button onClick={(e) => handleSubmit(e)} className="btn">
            Login
          </button>
        </form>
        <p className="text-center">
          Don't have an account? <a href="#">Sign Up</a>
        </p>
      </div>
    </>
  );
}
