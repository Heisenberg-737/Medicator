import React, { useState, useEffect } from "react";
import { Header } from "../../utils/Header/Header";
import "./History.css";
import axios from "axios";
import { useAuth } from "../../../Context/Context";

export const History = () => {
  const [details, setDetails] = useState([]);
  const { currentUser } = useAuth();
  useEffect(() => {
    axios
      .post("/backend/history", {
        uid: currentUser.uid,
        type: `${
          window.location.pathname.includes("manufacturer")
            ? "manufacturer"
            : "hospital"
        }`,
      })
      .then((res) => {
        setDetails(res.data);
      })
      .catch((err) => {});
  }, []);
  return (
    <>
      <Header />
      <div className="history">
        <h1>My History</h1>
        {window.location.pathname.includes("manufacturer") && (
          <div className="history__manufacturer">
            <div>
              <h3>S No.</h3>
              {details.map((detail, index) => {
                return (
                  <p key={index} style={{ textAlign: "center" }}>
                    {index + 1}
                  </p>
                );
              })}
            </div>
            <div>
              <h3>Medicine Name</h3>
              {details.map((detail, index) => {
                return (
                  <p key={index} style={{ textAlign: "center" }}>
                    {detail.name}
                  </p>
                );
              })}
            </div>
            <div>
              <h3>Product ID</h3>
              {details.map((detail, index) => {
                return (
                  <p key={index} style={{ textAlign: "center" }}>
                    {detail.product_id}
                  </p>
                );
              })}
            </div>
            <div>
              <h3>Manufacturing Date</h3>
              {details.map((detail, index) => {
                return (
                  <p key={index} style={{ textAlign: "center" }}>
                    {detail.date}
                  </p>
                );
              })}
            </div>
            <div>
              <h3>Expiry Date</h3>
              {details.map((detail, index) => {
                return (
                  <p key={index} style={{ textAlign: "center" }}>
                    {detail.expiry}
                  </p>
                );
              })}
            </div>
            <div>
              <h3>MRP</h3>
              {details.map((detail, index) => {
                return (
                  <p key={index} style={{ textAlign: "center" }}>
                    {detail.mrp}
                  </p>
                );
              })}
            </div>
            {/* <div>
              <h3>Product ID</h3>
              {details.map((detail, index) => {
                return (
                  <p key={index} style={{ textAlign: "center" }}>{detail.product_id}</p>
                );
              })}
            </div> */}
          </div>
        )}
        {window.location.pathname.includes("hospital") && (
          <div className="history__manufacturer">
            <div>
              <h3>S No.</h3>
              {details.map((detail, index) => {
                return (
                  <p key={index} style={{ textAlign: "center" }}>
                    {index + 1}
                  </p>
                );
              })}
            </div>
            <div>
              <h3>Medicine Name</h3>
              {details.map((detail, index) => {
                return (
                  <p key={index} style={{ textAlign: "center" }}>
                    {detail.name}
                  </p>
                );
              })}
            </div>
            <div>
              <h3>Product ID</h3>
              {details.map((detail, index) => {
                return (
                  <p key={index} style={{ textAlign: "center" }}>
                    {detail.product_id}
                  </p>
                );
              })}
            </div>
            <div>
              <h3>Manufacturing Date</h3>
              {details.map((detail, index) => {
                return (
                  <p key={index} style={{ textAlign: "center" }}>
                    {detail.date}
                  </p>
                );
              })}
            </div>
            <div>
              <h3>Expiry Date</h3>
              {details.map((detail, index) => {
                return (
                  <p key={index} style={{ textAlign: "center" }}>
                    {detail.expiry}
                  </p>
                );
              })}
            </div>
            <div>
              <h3>MRP</h3>
              {details.map((detail, index) => {
                return (
                  <p key={index} style={{ textAlign: "center" }}>
                    {detail.mrp}
                  </p>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
