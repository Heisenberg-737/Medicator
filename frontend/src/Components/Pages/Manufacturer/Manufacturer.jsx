import React, { useEffect, useState } from "react";
import { Header } from "../../utils/Header/Header";
import "./Manufacturer.css";
import { useAuth } from "../../../Context/Context";
import axios from "axios";

export const Manufacturer = () => {
  const { currentUser } = useAuth();
  const [name, setName] = useState("");
  axios
    .post("/backend/getprofilemanu", { uid: currentUser.uid })
    .then((res) => {
      setName(res.data[0].name);
    })
    .catch((err) => {});
  return (
    <>
      <Header />
      <div className="manufacturer">
        <h1>Welcome {name}</h1>
        <p>Manufacturer</p>
      </div>
    </>
  );
};
