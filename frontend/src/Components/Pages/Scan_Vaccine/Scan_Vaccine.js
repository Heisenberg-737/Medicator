import React, { useState } from "react";
import { Header } from "../../utils/Header/Header";
import "./Scan_Vaccine.css";
import { QRCodeScanner } from "../../utils/QRCodeScanner/QRCodeScanner";
import axios from "axios";
import { useAuth } from "../../../Context/Context";

export const Scan_Vaccine = () => {
  const {currentUser}=useAuth();
  const [details, setDetails] = useState({ product_id: "", private_key: "" });
  const [qrData, setQRData] = useState("");
  const [data, setData] = useState([]);
  const [showQRScanner, setShowQRScanner] = useState(false);

  const onChangeDetails = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => {
      return { ...prevDetails, [name]: value };
    });
  };
  const submitDetails = (e) => {
    e.preventDefault();
    axios
      .post("/backend/hospital", {
        uid: currentUser.uid,
        product_id: details.product_id,
        private_key: details.private_key,
      })
      .then((res) => {
        setDetails({ product_id: "", private_key: "" });
      })
      .catch((err) => {});
  };
  function getData(data) {
    setQRData(data);
    setDetails((prevDetails) => {
      return { ...prevDetails, ["product_id"]: data.text };
    });
  }
  return (
    <>
      <Header />
      <div className="Scan_Vaccine">
        <h1>Scan Your Vaccine</h1>
        <div className="Scan_Vaccine__content">
          <div className="Scan_Vaccine__left">
            <h1>Enter Details</h1>
            <form onSubmit={submitDetails}>
              <input
                name="product_id"
                value={details.product_id}
                placeholder="PRODUCT ID"
                onChange={onChangeDetails}
              />
              <input
                name="private_key"
                value={details.private_key}
                placeholder="PRIVATE KEY"
                onChange={onChangeDetails}
              />
              <input type="submit" />
            </form>
          </div>
          <div className="Scan_Vaccine__line"></div>
          <div className="Scan_Vaccine__right">
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
              className="Scan_Vaccine__right__QRscanner"
              style={{ display: !showQRScanner ? "none" : "" }}
            >
              {showQRScanner && <QRCodeScanner xd={getData} />}
            </div>
          </div>
        </div>
        <div className="Scan_Vaccine__details"></div>
      </div>
    </>
  );
};
