import React, { useState } from "react";
import QrReader from "react-qr-scanner";

export const QRCodeScanner = (props) => {
  const [result, setResult] = useState("");

  function handleScan(data) {
    setResult(data);
    if (data !== null) {
      props.xd(data);
    }
  }

  function handleError(err) {
    {
    }
  }

  const previewStyle = {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
  };

  const camStyle = {
    display: "flex",
    justifyContent: "center",
  };

  const textStyle = {
    fontSize: "2vh",
    textAlign: "center",
  };

  return (
    <>
      <div style={camStyle}>
        <QrReader
          delay={100}
          style={previewStyle}
          onError={handleError}
          onScan={handleScan}
        />
      </div>
    </>
  );
};
