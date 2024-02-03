import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import Loader from "../../Components/UI/Loader";
import CustomToast from "../../Components/UI/CustomToast";
import { useDispatch, useSelector } from "react-redux";
import "./Checkout.css";
import { addToCart, clearCart, removeFromCart } from "../../store/action";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

function Checkout(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const total = useSelector((state) => state.total);
  const [details, setDetails] = useState({
    name: "",
    number: "",
    table: "",
  });
  const [hideCol, setHideCol] = useState("hidden");
  const [hideBtn, setHideBtn] = useState("show");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    variant: "",
  });

  function giveAlert(message, route) {
    setToast({
      open: true,
      message: `Error: ${message}`,
      variant: "error",
    });
    route &&
      setTimeout(() => {
        navigate(`${route}`);
      }, 1500);
  }

  function giveSucess(message, route) {
    setToast({
      open: true,
      message: `${message}`,
      variant: "success",
    });
    setTimeout(() => {
      setLoading(true);
      dispatch(clearCart());
    }, 1000);
  }

  function sendInvoice(mode, paymentId = "Cash", orderId = details.name) {
    setLoading(true);
    try {
      const url = process.env.REACT_APP_API_URL;
      const list = Object.keys(cart).map((key) => cart[key]);
      axios.post(`${url}/user/print`, {
        list: list,
        name: details.name,
        number: details.number,
        table: details.table,
        total: Number(total),
        paid: mode === "Online" ? true : false,
        served: false,
        paymentId: paymentId,
        orderId: orderId,
      });
      setLoading(false);
      giveSucess(
        mode === "Online"
          ? "Order has been placed sucessfully."
          : "Please pay cash at counter for placing order.",
        "/"
      );
    } catch (err) {
      setLoading(false);
      giveAlert(
        "Error in generating Invoice. Please Go to Counter with bill.",
        "/"
      );
    }
  }

  function printBill(paymentId = "Cash", orderId = details.name) {
    const doc = new jsPDF("p", "pt");

    doc.text(200, 30, "Restro Order - Your Bill");
    doc.text(70, 50, `Name: ${details.name}`);
    doc.text(360, 50, `Phone No.: ${details.number}`);
    doc.text(
      0,
      60,
      "_______________________________________________________________________"
    );
    doc.text(230, 80, `Total: Rs.${total}/-`);
    doc.text(
      0,
      90,
      "_______________________________________________________________________"
    );

    var i = 120;
    var c = 1;
    Object.keys(cart).forEach((key) => {
      doc.text(25, i, `${c}. `);
      doc.text(75, i, `${cart[key].name}`);
      doc.text(255, i, `Qty: ${cart[key].qty}`);
      doc.text(325, i, `Rs.${cart[key].price}`);
      doc.text(455, i, `Rs.${cart[key].qty * cart[key].price}`);
      i = i + 40;
      c = c + 1;
    });

    doc.save("Bill.pdf");
  }

  function payCash() {
    if (
      details.name.length > 0 &&
      details.number.length === 10 &&
      details.table.length === 2
    ) {
      printBill();
      sendInvoice("Cash");
    } else {
      giveAlert("Please fill the correct details", "");
    }
  }

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    const url = process.env.REACT_APP_API_URL;
    const response = await axios.post(`${url}/user/razorpay`, {
      amount: Number(total),
    });

    const options = {
      key: process.env.REACT_APP_RAZOR_ID,
      currency: response.data.currency,
      amount: response.data.amount.toString(),
      order_id: response.data.id,
      name: "Your Order",
      description: "Thank you for Ordering.",
      image: `${url}/logo`,
      handler: function (response) {
        printBill(response.razorpay_payment_id, response.razorpay_order_id);
        sendInvoice(
          "Online",
          response.razorpay_payment_id,
          response.razorpay_order_id
        );
      },
      prefill: {
        name: details.name,
        email: "example@gmail.com",
        phone_number: details.number,
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  function payOnline() {
    if (
      details.name.length > 0 &&
      details.number.length === 10 &&
      details.table.length === 2
    ) {
      displayRazorpay();
    } else {
      giveAlert("Please fill the correct details", "");
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDetails((details) => ({
      ...details,
      [name]: value,
    }));
  };

  function checkout() {
    if (total > 0) {
      setHideCol("show");
      setHideBtn("hidden");
    }
  }

  function handleAdd(item) {
    dispatch(addToCart(item));
  }

  function handleSubtract(id) {
    dispatch(removeFromCart(id));
  }

  useEffect(() => {
    if (total <= 0) {
      giveAlert("No order for checkout", "/");
    }
    // eslint-disable-next-line
  }, [total]);

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <div className="Checkout">
          <div className="container row checkout-row">
            {toast.open && (
              <CustomToast
                open={toast.open}
                variant={toast.variant}
                message={toast.message}
                onClose={() =>
                  setToast({
                    open: false,
                    message: "",
                    variant: "",
                  })
                }
              />
            )}
            <div className={"Thank " + hideCol}>THANK YOU FOR ORDERING</div>
            <div className={"col left " + hideCol}>
              <div className={"fills " + hideCol}>
                <div className="inst">Please fill the details below:</div>
                <div className="form-floating">
                  <input
                    className="form-control"
                    placeholder="Your Name"
                    type="text"
                    id="name"
                    name="name"
                    value={details.name}
                    onChange={handleChange}
                  />
                  <label htmlFor="name">Your Name</label>
                </div>
                <div className="form-floating">
                  <input
                    className="form-control"
                    type="number"
                    placeholder="98XXXXXXXX"
                    name="number"
                    value={details.number}
                    onChange={handleChange}
                    maxLength={10}
                    id="phone"
                  />
                  <label htmlFor="phone">Phone Number</label>
                </div>
                <div className="form-floating">
                  <input
                    className="form-control"
                    placeholder="Table Number"
                    type="number"
                    name="table"
                    value={details.table}
                    onChange={handleChange}
                    id="table"
                  />
                  <label htmlFor="table">Table Number</label>
                </div>
              </div>
              <div className="bill">
                <button className="pay cash" onClick={payCash}>
                  Cash Payment
                </button>
                <button className="pay upi" onClick={payOnline}>
                  UPI - PayTM, PhonePe..
                </button>
              </div>
            </div>
            <div className="col right">
              <div className="Total">Total: ₹ {total}</div>
              <div className="Items">
                {Object.keys(cart).map((key) => (
                  <div className="item" key={key}>
                    <div className="order">
                      <p className="Name">{cart[key].name}</p>
                      <p className="Price">{"₹ " + cart[key].price}</p>
                    </div>
                    <div className={"changeBtns " + hideBtn}>
                      <button
                        className="change"
                        onClick={() => handleSubtract(key)}
                      >
                        -
                      </button>
                      <button
                        className="change"
                        onClick={() => handleAdd(cart[key])}
                      >
                        +
                      </button>
                      <p className={"qty"}>{cart[key].qty}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className={"confirm " + hideBtn} onClick={checkout}>
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Checkout;
