import axios from "axios";
import React, { useState, useEffect } from "react";
import { Header } from "../../utils/Header/Header";
import { Record_Block } from "../../utils/Record_Block/Record_Block";
import "./Create_Record.css";
import { useAuth } from "../../../Context/Context";

export const Create_Record = () => {
  const { currentUser } = useAuth();
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios
      .post("/backend/history", { uid: currentUser.uid, type: "manufacturer" })
      .then((res) => {
        setRecords(res.data);
      })
      .catch((err) => {});
  }, []);
  const submitRecord = async (record) => {
    await axios
      .post("/backend/vaccreate", {
        uid: currentUser.uid,
        vaccine_name: record.vaccine_name,
        manufacturing_date: record.manufacturing_date,
        expiry_date: record.expiry_date,
        MRP: record.MRP,
        private_key: record.private_key,
      })
      .then((res) => {
        let r={
          date:record.manufacturing_date,
          expiry:record.expiry_date,
          mrp:record.MRP,
          name:record.vaccine_name,
        }
        setRecords([...records,r]);
      })
      .catch((err) => {});
  };
  return (
    <>
      <Header />
      <div className="create_record">
        <h1>CREATE NEW RECORD</h1>
        <div className="create_record_content">
          {records.map((record, idx) => {
            return <Record_Block key={idx} type="show" detail={record} />;
          })}
          <Record_Block type="add" submit={submitRecord} />
        </div>
      </div>
    </>
  );
};
