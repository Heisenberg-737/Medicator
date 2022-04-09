import React, { useState, useEffect } from "react";
import "./Header.css";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../../Context/Context";

export const Header = () => {
  const history = useHistory();
  const [scrolled, setScrolled] = useState(true);
  const [route, setRoute] = useState("/");
  const { logout, currentUser } = useAuth();
  const [user, setUser] = useState({});

  useEffect(() => {
    setRoute(window.location.pathname);
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 10 ||
        document.body.scrollTop > 10
      ) {
        setScrolled(false);
      } else if (
        document.documentElement.scrollTop < 11 ||
        document.body.scrollTop < 11
      ) {
        setScrolled(true);
      }
    };

    window.addEventListener("scroll", updateNavbarColor);

    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
  useEffect(() => {
    setUser(currentUser);
  }, []);
  const handleLogout = async () => {
    await logout();
    history.push("/");
  };
  return (
    <div
      className="header"
      style={{
        background: route === "/" ? "transparent" : "#0cb097",
        color: "#ffffff",
      }}
    >
      <h1>
        <Link
          to={
            route.includes("/manufacturer")
              ? "/manufacturer"
              : route.includes("/hospital")
              ? "/hospital"
              : route.includes("/know_your_vaccine")
              ? "/"
              : "/"
          }
          style={{ color: "inherit", textDecoration: "none" }}
        >
          VACCINOMETER
        </Link>
      </h1>
      <div className="header__right">
        {route === "/" && (
          <p>
            <Link
              to="/login"
              style={{ color: "#ffffff", textDecoration: "none" }}
            >
              Login
            </Link>
          </p>
        )}
        {route === "/" && (
          <p>
            <Link
              to="/signup"
              style={{ color: "#ffffff", textDecoration: "none" }}
            >
              Signup
            </Link>
          </p>
        )}
        {route.includes("/manufacturer") && (
          <p>
            <Link
              to="/manufacturer/create_record"
              style={{
                color: "#ffffff",
                textDecoration: "none",
              }}
            >
              Create Record
            </Link>
          </p>
        )}
        {route.includes("/hospital") && (
          <p>
            <Link
              to="/hospital/scan_vaccine"
              style={{
                color: "#ffffff",
                textDecoration: "none",
              }}
            >
              Scan Vaccine
            </Link>
          </p>
        )}
        {(route.includes("/manufacturer") || route.includes("/hospital")) && (
          <p>
            <Link
              to={`/${
                route.includes("/manufacturer") ? "manufacturer" : "hospital"
              }/history`}
              style={{
                color: "#ffffff",
                textDecoration: "none",
              }}
            >
              My History
            </Link>
          </p>
        )}
        {(route.includes("/manufacturer") || route.includes("/hospital")) && (
          <p onClick={handleLogout} style={{ color: "#ffffff" }}>
            Logout
          </p>
        )}
      </div>
    </div>
  );
};
