import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import "./Invoice.css";

function Invoice({ invoice, index }) {
  const url = process.env.REACT_APP_API_URL;
  const [cut, setCut] = useState(invoice.served ? "cut" : "");
  const [paid, setPaid] = useState(invoice.paid);
  const [show, setShow] = useState(false);

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
        <p className={cut}>Name: {invoice.name}</p>
        <p className={cut}>Phone: {invoice.number}</p>
      </div>
      <div className="invoice-list">
        <div className="invoice-order">
          <p className={cut}>OrderId: {invoice.orderId}</p>
        </div>
        <div className="invoice-order">
          <p className={cut}>PaymentID: {invoice.paymentId}</p>
        </div>
        <div className="invoice-order">
          <p className={cut}>
            Total: ₹{invoice.total}
            {invoice.paymentId === "Cash" ? " (Cash)" : " (Online)"}
          </p>
        </div>
      </div>
      <div className="invoice-total">
        <button className="invoice-served" onClick={() => setShow(true)}>
          Details
        </button>
        <button
          name={index}
          className={"invoice-served " + cut}
          onClick={handleServed}
        >
          Serve
        </button>
        {paid ? (
          "Paid"
        ) : (
          <button className={"invoice-served "} onClick={handlePaid}>
            Mark Paid
          </button>
        )}
      </div>
      <Modal
        show={show}
        onHide={() => setShow(!show)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h4>Invoice Details</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="invoice-order">
            <p>Name: {invoice.name}</p>
            <p> Phone: {invoice.number}</p>
          </div>
          <br />
          {invoice.list.map((item, key) => (
            <div className="invoice-order" key={key}>
              <p>{item.name}</p>
              <p>{item.qty + " X " + item.price}</p>
            </div>
          ))}
          <br />
          <div className="invoice-order">
            <p>
              Total: ₹{invoice.total}
              {invoice.paymentId === "Cash" ? " (Cash)" : " (Online)"}
            </p>
          </div>
          <br />
          <div className="invoice-order">
            <p>OrderId: {invoice.orderId}</p>
          </div>
          <div className="invoice-order">
            <p>PaymentID: {invoice.paymentId}</p>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Invoice;
