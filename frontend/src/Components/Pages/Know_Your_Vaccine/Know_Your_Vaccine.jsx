import React, { useState } from "react";
import { Header } from "../../utils/Header/Header";
import "./Know_Your_Vaccine.css";
import { QRCodeScanner } from "../../utils/QRCodeScanner/QRCodeScanner";
import axios from "axios";

export const Know_Your_Vaccine = () => {
  const [product_id, setProduct_id] = useState("");
  const [qrData, setQRData] = useState("");
  const [data, setData] = useState([]);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const onChangeProductKey = (e) => {
    const { name, value } = e.target;
    setProduct_id(value);
  };
  const submitProduct_Id = (e) => {
    e.preventDefault();
    axios
      .post("/backend/public", { product_id: product_id })
      .then((res) => {
        setData(res.data);
        setSubmitted(true);
      })
      .catch((err) => {});
  };
  function getData(data) {
    setQRData(data);
    setProduct_id(data.text);
    axios
      .post("/backend/public", { product_id: data.text })
      .then((res) => {
        setData(res.data);
        setSubmitted(true);
      })
      .catch((err) => {});
  }
  return (
    <>
      <Header />
      <div className="know_your_vaccine">
        <h1>Know Your Medicine</h1>
        <div className="know_your_vaccine__content">
          <div className="know_your_vaccine__left">
            <h1>Enter Product ID</h1>
            <form onSubmit={submitProduct_Id}>
              <input
                name="product_id"
                value={product_id}
                placeholder="PRODUCT KEY"
                onChange={onChangeProductKey}
              />
            </form>
          </div>
          <div className="know_your_vaccine__line"></div>
          <div className="know_your_vaccine__right">
            <h1>Scan By QR Code</h1>
            {!showQRScanner && (
              <div
                className="showButton"
                onClick={() => setShowQRScanner(!showQRScanner)}
              >
                Show QR scanner
              </div>
            )}
            <div
              className="know_your_vaccine__right__QRscanner"
              style={{ display: !showQRScanner ? "none" : "" }}
            >
              {showQRScanner && <QRCodeScanner xd={getData} />}
            </div>
          </div>
        </div>
        {submitted && <h1 style={{ textAlign: "center" }}>SCAN HISTORY</h1>}
        {submitted && (
          <div
            className="know_your_vaccine__details"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              width: "100%",
            }}
          >
            {data.length == 0 ? (
              <p>OOPS!! No Record of Scanning</p>
            ) : (
              data.map((data, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      padding: "15px 0px 15px 0px",
                      margin: "5px",
                      flexDirection: "column",
                      border: "1px solid #000000",
                      borderRadius: "10px",
                      width: "280px",
                    }}
                  >
                  <div
                      style={{
                        padding: "3px 5px 3px 15px",
                        margin: "2px 5px 2px 5px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                    >
                      <strong style={{ width: "30%" }}>Role</strong>
                      <p style={{ width: "10%" }}>:</p>
                      {data.role}
                    </div>
                    <div
                      style={{
                        padding: "3px 5px 3px 15px",
                        margin: "2px 5px 2px 5px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                    >
                      <strong style={{ width: "30%" }}>Name</strong>
                      <p style={{ width: "10%" }}>:</p>
                      {data.name}
                    </div>
                    <div
                      style={{
                        padding: "3px 5px 3px 15px",
                        margin: "2px 5px 2px 5px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                    >
                      <strong style={{ width: "30%" }}>Product ID</strong>
                      <p style={{ width: "10%" }}>:</p>
                      {data.product_id}
                    </div>
                    <div
                      style={{
                        padding: "3px 5px 3px 15px",
                        margin: "2px 5px 2px 5px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                    >
                      <strong style={{ width: "30%" }}>Date</strong>
                      <p style={{ width: "10%" }}>:</p>
                      {data.date.split(" ")[0]}
                    </div>
                    {data.date.split(" ")[1] && <div
                      style={{
                        padding: "3px 5px 3px 15px",
                        margin: "2px 5px 2px 5px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                    >
                      <strong style={{ width: "30%" }}>Time</strong>
                      <p style={{ width: "10%" }}>:</p>
                      {data.date.split(" ")[1]}
                    </div>}
                    {data.date.split(" ")[2] && <div
                      style={{
                        padding: "3px 5px 3px 15px",
                        margin: "2px 5px 2px 5px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                    >
                      <strong style={{ width: "30%" }}>City</strong>
                      <p style={{ width: "10%" }}>:</p>
                      {data.date.split(" ")[2]}
                    </div>}
                    {data.date.split(" ")[3] && <div
                      style={{
                        padding: "3px 5px 3px 15px",
                        margin: "2px 5px 2px 5px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                    >
                      <strong style={{ width: "30%" }}>Region</strong>
                      <p style={{ width: "10%" }}>:</p>
                      {data.date.split(" ")[3]}
                    </div>}
                    {data.date.split(" ")[4] && <div
                      style={{
                        padding: "3px 5px 3px 15px",
                        margin: "2px 5px 2px 5px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                    >
                      <strong style={{ width: "30%" }}>Country</strong>
                      <p style={{ width: "10%" }}>:</p>
                      {data.date.split(" ")[4]}
                    </div>}
                    {data.date.split(" ")[5] && <div
                      style={{
                        padding: "3px 5px 3px 15px",
                        margin: "2px 5px 2px 5px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                    >
                      <strong style={{ width: "30%" }}>Location</strong>
                      <p style={{ width: "10%" }}>:</p>
                      {data.date.split(" ")[5]}
                    </div>}
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </>
  );
};
