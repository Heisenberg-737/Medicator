import React, { useState, useEffect } from "react";
import { useAuth } from "../../../Context/Context";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { Header } from "../../utils/Header/Header";

export const Login = () => {
  const history = useHistory();
  const { login } = useAuth();
  const [isManufacturer, setIsManufacturer] = useState(true);
  const [loginError, setLoginError] = useState(false);
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevUserDetails) => {
      return { ...prevUserDetails, [name]: value };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError(false);
    let user = {};
    try {
      user = await login(userDetails.email, userDetails.password);
      user && history.push(`/${isManufacturer ? "manufacturer" : "hospital"}`);
      axios
        .post(`/login/${isManufacturer ? "manufacturer" : "hospital"}`, {
          email: userDetails.email,
        })
        .then((res) => {
          setUserDetails({
            email: "",
            password: "",
          });
          setLoginError(false);
          history.push(`/${isManufacturer ? "manufacturer" : "hospital"}`);
        })
        .catch((err) => {});
    } catch (err) {
      setUserDetails({
        email: "",
        password: "",
      });
      setLoginError(true);
    }
  };
  const showError = () => {
    return (
      <div style={{ color: "#ff000085", fontWeight: "800" }}>
        Login Error! Check Your Login ID or Password
      </div>
    );
  };
  return (
    <>
      <Header />
      <div className="login">
        <div className="login__left">
          <h1>New here!</h1>
          <p>Register yourself here to get access to our technology</p>
          <button>
            <Link to="/signup" style={{ color: "#fff" }}>
              SIGN UP
            </Link>
          </button>
        </div>
        <div className="login__right">
          <h1>Welcome Back</h1>
          <p>use your email for login</p>

          <div className="login__user__company">
            <div
              className="login__user"
              style={{
                background: isManufacturer ? "#0cb097" : "#ffffff",
                color: isManufacturer ? "#ffffff" : "#0cb097",
                cursor: "pointer",
                boxShadow: "0px 0px 3px 3px #12121210",
              }}
              onClick={() => setIsManufacturer(true)}
            >
              Manufacturer
            </div>
            <div
              className="login__company"
              style={{
                background: !isManufacturer ? "#0cb097" : "#ffffff",
                color: !isManufacturer ? "#ffffff" : "#0cb097",
                cursor: "pointer",
                boxShadow: "0px 0px 3px 3px #12121210",
              }}
              onClick={() => setIsManufacturer(false)}
            >
              Retailer
            </div>
          </div>
          {loginError && showError()}
          <form onSubmit={handleSubmit}>
            <input
              name="email"
              onChange={onInputChange}
              value={userDetails.email}
              placeholder="EMAIL"
            />
            <input
              name="password"
              onChange={onInputChange}
              value={userDetails.password}
              type="password"
              placeholder="PASSWORD"
            />
            <button type="submit">LOGIN</button>
          </form>
        </div>
      </div>
    </>
  );
};
