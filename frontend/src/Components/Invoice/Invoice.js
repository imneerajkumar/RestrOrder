import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Invoice.css";

function Invoice({ invoice, index }) {
  const url = process.env.REACT_APP_API_URL;
  const [cut, setCut] = useState(invoice.served ? "cut" : "");
  const [paid, setPaid] = useState(invoice.paid);

  const handleServed = () => {
    setCut("cut");
    axios.patch(`${url}/admin/markserved`, {
      id: invoice._id,
      served: true,
    });
  };

  const handlePaid = () => {
    setPaid(true);
    axios.patch(`${url}/admin/markpaid`, {
      id: invoice._id,
      paid: true,
    });
  };

  useEffect(() => {}, [paid, cut]);

  return (
    <div className="invoice">
      <div className="invoice-owner">
        <p className={cut}>{invoice.name}</p>
        <p className={cut}>{invoice.number}</p>
      </div>
      <div className="invoice-list">
        {invoice.list.map((item, key) => (
          <div className="invoice-order" key={key}>
            <p className={cut}>{item.name}</p>
            <p className={cut}>{item.qty + " X " + item.price}</p>
          </div>
        ))}
      </div>
      <div className="invoice-total">
        <p className={cut}>{"₹" + invoice.total + " (" + invoice.mode + ")"}</p>
        <button
          name={index}
          className={"invoice-served " + cut}
          onClick={handleServed}
        >
          Served
        </button>
        {paid ? (
          "Paid"
        ) : (
          <button className={"invoice-served "} onClick={handlePaid}>
            Paid
          </button>
        )}
      </div>
    </div>
  );
}

export default Invoice;
