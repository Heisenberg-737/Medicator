import React, { useEffect, useState } from "react";
import "./Record_Block.css";

export const Record_Block = (props) => {
  const [addRecord, setAddRecord] = useState(false);
  const [recordDetails, setRecordDetails] = useState({});
  useEffect(() => {
    if (props.type === "show") {
      setRecordDetails({
        vaccine_name: props.detail.name,
        manufacturing_date: props.detail.date,
        expiry_date: props.detail.expiry,
        MRP: props.detail.mrp,
        private_key: "",
      });
    }
  }, []);
  const submitForm = (e) => {
    e.preventDefault();
    setAddRecord(false);
    props.submit(recordDetails);
  };
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setRecordDetails((prevRecordDetails) => {
      return { ...prevRecordDetails, [name]: value };
    });
  };
  return (
    <div className="Record_Block">
      {props.type === "add" && !addRecord && (
        <div
          style={{
            fontSize: "2rem",
            fontWeight: "600",
            textAlign: "center",
            lineHeight: "50px",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
            height: "100%",
          }}
          onClick={() => setAddRecord(!addRecord)}
        >
          <span style={{ fontSize: "5rem" }}>+</span>
          <br />
          <p>ADD RECORD</p>
        </div>
      )}
      {props.type === "add" && addRecord && (
        <form onSubmit={submitForm}>
          <input
            placeholder="MEDICINE NAME"
            name="vaccine_name"
            value={recordDetails.vaccine_name}
            onChange={onInputChange}
          />
          <input
            placeholder="MANUFACTURING DATE"
            name="manufacturing_date"
            type="date"
            value={recordDetails.manufacturing_date}
            onChange={onInputChange}
          />
          <input
            placeholder="EXPIRY DATE"
            name="expiry_date"
            type="date"
            value={recordDetails.expiry_date}
            onChange={onInputChange}
          />
          <input
            placeholder="MRP"
            name="MRP"
            value={recordDetails.MRP}
            onChange={onInputChange}
          />
          <input
            placeholder="PRIVATE KEY"
            name="private_key"
            value={recordDetails.private_key}
            onChange={onInputChange}
          />
          <input type="submit" name="Submit" />
        </form>
      )}
      {props.type === "show" && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              height: "100%",
              width: "100%",
            }}
          >
            <h4 style={{ margin: "4px 4px 4px 8px", width: "60%" }}>
              Vaccine Name
            </h4>
            <p style={{ width: "10%", margin: "0px" }}>:</p>
            <div style={{ margin: "4px", width: "30%" }}>
              {recordDetails.vaccine_name}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              height: "100%",
              width: "100%",
            }}
          >
            <h4 style={{ margin: "4px 4px 4px 8px", width: "60%" }}>
              Manufacturing Date
            </h4>
            <p style={{ width: "10%", margin: "0px" }}>:</p>
            <div style={{ margin: "4px", width: "30%" }}>
              {recordDetails.manufacturing_date}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              height: "100%",
              width: "100%",
            }}
          >
            <h4 style={{ margin: "4px 4px 4px 8px", width: "60%" }}>
              Expiry Date
            </h4>
            <p style={{ width: "10%", margin: "0px" }}>:</p>
            <div style={{ margin: "4px", width: "30%" }}>
              {recordDetails.expiry_date}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              height: "100%",
              width: "100%",
            }}
          >
            <h4 style={{ margin: "4px 4px 4px 8px", width: "60%" }}>MRP</h4>
            <p style={{ width: "10%", margin: "0px" }}>:</p>
            <div style={{ margin: "4px", width: "30%" }}>
              {recordDetails.MRP}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
