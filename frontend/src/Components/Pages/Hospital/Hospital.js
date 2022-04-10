import React, { useEffect, useState } from "react";
import { Header } from "../../utils/Header/Header";
import "./Hospital.css";
import { useAuth } from "../../../Context/Context";
import axios from "axios";

export const Hospital = () => {
  const { currentUser } = useAuth();
  const [name, setName] = useState("");
  axios
    .post("/backend/getprofilehosp", { uid: currentUser.uid })
    .then((res) => {
      setName(res.data[0].name);
    })
    .catch((err) => {});
  return (
    <>
      <Header />
      <div className="hospital">
        <h1>Welcome {name}</h1>
        <p>Retailer</p>
      </div>
    </>
  );
};
