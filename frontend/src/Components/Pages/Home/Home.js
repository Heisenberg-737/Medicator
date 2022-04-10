import React, { useState } from "react";
import Vaccine from "../../../assets/images/vaccine.jpg";
import { Header } from "../../utils/Header/Header";
import "./Home.css";
import { useHistory } from "react-router-dom";

export const Home = () => {
  const history = useHistory();
  const [mouseHover, setMouseHover] = useState(false);
  return (
    <>
      <Header />
      <div className="home">
        <img src={Vaccine} alt="MedicineImage" />
        <div className="home__left">
          <h1>
            Welcome to
            <br /> <span style={{ color: "#0cb097" }}>MEDICATOR</span>
          </h1>
          <p>Blockchain Based Medicine Authentication Application</p>
          <button
            onMouseEnter={() => setMouseHover(true)}
            onMouseLeave={() => setMouseHover(false)}
            style={{
              color: mouseHover ? "black" : "",
              background: mouseHover ? "#ffffff" : "",
            }}
            onClick={() => history.push("/know_your_vaccine")}
          >
            KNOW YOUR MEDICINE
          </button>
        </div>
      </div>
    </>
  );
};
