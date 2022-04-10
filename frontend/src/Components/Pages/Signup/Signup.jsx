import React, { useState, useEffect } from "react";
import { useAuth } from "../../../Context/Context";
import { Link, useHistory } from "react-router-dom";
import "./Signup.css";
import axios from "axios";
import { Header } from "../../utils/Header/Header";

export const Signup = () => {
  const history = useHistory();
  const { signup } = useAuth();
  const [isManufacturer, setIsManufacturer] = useState(true);
  const [signupError, setSignupError] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevUserDetails) => {
      return { ...prevUserDetails, [name]: value };
    });
  };
  const showError = () => {
    return (
      <div style={{ color: "#ff000085", fontWeight: "800" }}>
        Signup Error! Email address already in use!
      </div>
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let user = {};
    try {
      user = await signup(userDetails.email, userDetails.password);
      history.push(`/${isManufacturer ? "manufacturer" : "hospital"}`);

      await axios
        .post(
          `${
            isManufacturer
              ? "/backend/saveprofilemanu"
              : "/backend/saveprofilehosp"
          }`,
          {
            uid: user.user.uid,
            name: userDetails.name,
            email: userDetails.email,
            address: userDetails.address,
          }
        )
        .then((res) => {
          setUserDetails({
            name: "",
            email: "",
            password: "",
            address: "",
          });
          setSignupError(false);
          history.push(`/${isManufacturer ? "manufacturer" : "hospital"}`);
        })
        .catch((err) => {});
    } catch (err) {
      setUserDetails({
        name: "",
        email: "",
        password: "",
        address: "",
      });
      setSignupError(true);
      {
      }
    }
  };
  return (
    <>
      <Header />
      <div className="signup">
        <div className="signup__left">
          <h1>Welcome Back!</h1>
          <p>To keep connected with us please login with your personal info</p>

          <button>
            <Link to="/login" style={{ color: "#ffffff" }}>
              Sign In
            </Link>
          </button>
        </div>
        <div className="signup__right">
          <h1>Create Account</h1>
          <p>use your email for registeration</p>
          <div className="signup__user__company">
            <div
              className="signup__user"
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
              className="signup__company"
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
          {signupError && showError()}
          <form onSubmit={handleSubmit}>
            <input
              name="name"
              onChange={onInputChange}
              value={userDetails.name}
              placeholder="NAME"
            />
            <input
              name="email"
              onChange={onInputChange}
              value={userDetails.email}
              placeholder="EMAIL"
            />
            <input
              name="address"
              onChange={onInputChange}
              value={userDetails.address}
              type="text"
              placeholder="ADDRESS"
            />
            <input
              name="password"
              onChange={onInputChange}
              value={userDetails.password}
              type="password"
              placeholder="PASSWORD"
            />
            <button type="submit">SIGN UP</button>
          </form>
        </div>
      </div>
    </>
  );
};
