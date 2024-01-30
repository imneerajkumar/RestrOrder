import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import Loader from "../../Components/UI/Loader";
import CustomToast from "../../Components/UI/CustomToast";
import "./Checkout.css";

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
  const [list, setList] = useState([]);
  const [[name, number, table], setDetails] = useState(["", "", ""]);
  const [hideCol, setHideCol] = useState("hidden");
  const [hideBtn, setHideBtn] = useState("show");
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    variant: "",
  });

  function clear() {
    var l = JSON.parse(localStorage.getItem("order"));
    for (var i = 0; i < l.length; i++) {
      l[i] = 0;
    }

    localStorage.setItem("order", JSON.stringify(l));
    localStorage.setItem("total", 0);
  }

  function giveAlert(message, route) {
    setToast({
      open: true,
      message: `Error: ${message}`,
      variant: "error",
    });
    route &&
      setTimeout(() => {
        clear();
        navigate(`${route}`);
      }, 2000);
  }

  function giveSucess(message, route) {
    setToast({
      open: true,
      message: `${message}`,
      variant: "success",
    });
    setTimeout(() => {
      clear();
      navigate(`${route}`);
    }, 2000);
  }

  useEffect(() => {
    var total = localStorage.getItem("total");
    if (total <= 0) {
      giveAlert("No order for Checkout", "/menu");
    }

    if (
      list.length === 0 &&
      localStorage.getItem("order") !== null &&
      localStorage.getItem("list") !== null
    ) {
      var temp = [];
      var order = JSON.parse(localStorage.getItem("order"));
      var li = JSON.parse(localStorage.getItem("list"));

      order.forEach((val, key) => {
        if (val > 0)
          temp.push({
            key: key,
            name: li[key].name,
            price: li[key].price,
            qty: val,
          });
      });
      setList(temp);
      setTimeout(() => setLoading(false), 1500);
    }
    // eslint-disable-next-line
  }, [list]);

  function handleAdd(e) {
    var key = Number(e.target.name);
    var order = JSON.parse(localStorage.getItem("order"));
    var li = JSON.parse(localStorage.getItem("list"));
    var total = JSON.parse(localStorage.getItem("total"));
    var temp = [];

    order[key] += 1;
    total += Number(li[key].price);
    localStorage.setItem("order", JSON.stringify(order));
    localStorage.setItem("total", JSON.stringify(total));

    order.forEach((val, key) => {
      if (val > 0)
        temp.push({
          key: key,
          name: li[key].name,
          price: li[key].price,
          qty: val,
        });
    });
    setList(temp);
  }

  function handleSubtract(e) {
    var key = Number(e.target.name);
    var order = JSON.parse(localStorage.getItem("order"));
    var li = JSON.parse(localStorage.getItem("list"));
    var total = localStorage.getItem("total");
    var temp = [];

    order[key] -= 1;
    total -= Number(li[key].price);
    if (total <= 0) {
      giveAlert("No order for Checkout", "/menu");
    }

    localStorage.setItem("order", JSON.stringify(order));
    localStorage.setItem("total", JSON.stringify(total));

    order.forEach((val, key) => {
      if (val > 0)
        temp.push({
          key: key,
          name: li[key].name,
          price: li[key].price,
          qty: val,
        });
    });
    setList(temp);
  }

  function handleName(e) {
    setDetails([e.target.value, number, table]);
  }

  function handlePhone(e) {
    setDetails([name, e.target.value, table]);
  }

  function handleTable(e) {
    setDetails([name, number, e.target.value]);
  }

  function printBill() {
    var total = localStorage.getItem("total");
    const doc = new jsPDF("p", "pt");

    doc.text(200, 30, "Restro Order - Your Bill");
    doc.text(70, 50, `Name: ${name}`);
    doc.text(360, 50, `Phone No.: ${number}`);
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
    list.forEach((item) => {
      doc.text(25, i, `${c}. `);
      doc.text(75, i, `${item.name}`);
      doc.text(255, i, `Qty: ${item.qty}`);
      doc.text(325, i, `Rs.${item.price}`);
      doc.text(455, i, `Rs.${item.qty * item.price}`);
      i = i + 40;
      c = c + 1;
    });

    doc.save("Bill.pdf");
  }

  function sendInvoice(mode) {
    const url = process.env.REACT_APP_API_URL;
    axios.post(`${url}/user/print`, {
      list: list,
      name: name,
      number: number,
      table: table,
      total: Number(localStorage.getItem("total")),
      mode: mode,
      paid: mode === "Online" ? true : false,
      served: false,
    });
  }

  function payCash() {
    if (name.length > 0 && number.length === 10) {
      sendInvoice("Cash");
      printBill();
      giveSucess("Please pay cash at counter for placing order.", "/");
    } else {
      giveAlert("Please fill the correct details", "");
    }
  }

  function onlineSuccess() {
    sendInvoice("Online");
    printBill();
    giveSucess("Order has been placed sucessfully.", "/");
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
      amount: Number(localStorage.getItem("total")),
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
        alert(
          `PaymentId: ${response.razorpay_payment_id}`,
          `OrderId: ${response.razorpay_order_id}`,
          `Signature: ${response.razorpay_signature}`
        );
        onlineSuccess();
      },
      prefill: {
        name: name,
        email: "example@gmail.com",
        phone_number: number,
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  function payOnline() {
    if (name.length > 0 && number.length === 10) {
      displayRazorpay();
    } else {
      giveAlert("Please fill the correct details", "");
    }
  }

  function checkout() {
    if (localStorage.getItem("total") > 0) {
      setHideCol("show");
      setHideBtn("hidden");
    }
  }

  return (
    <div className="Checkout">
      {loading ? (
        <Loader />
      ) : (
        <div className="container checkout">
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
          <div className="row checkout-row">
            <div className={"col left " + hideCol}>
              <div className="Thank">THANK YOU FOR ORDERING</div>
              <div className={"fills " + hideCol}>
                <div className="inst">Please fill the details below:</div>
                <div className="ind">
                  <div className="label">Name :</div>
                  <input
                    className="input"
                    type="text"
                    value={name}
                    onChange={handleName}
                  />
                </div>
                <div className="ind">
                  <div className="label">Phone:</div>
                  <input
                    className="input"
                    type="number"
                    value={number}
                    onChange={handlePhone}
                    maxLength={10}
                  />
                </div>
                <div className="ind">
                  <div className="label">Table:</div>
                  <input
                    className="input"
                    type="number"
                    value={table}
                    onChange={handleTable}
                  />
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
              <div className="Total">
                Total: {"₹" + localStorage.getItem("total")}
              </div>
              <div className="Items">
                {list.map((item, key) => {
                  return (
                    <div className="item" key={key}>
                      <div className="order">
                        <p className="Name">{item.name}</p>
                        <p className="Price">{"₹ " + item.price}</p>
                      </div>
                      <div className={"changeBtns " + hideBtn}>
                        <button
                          name={item.key}
                          className="change"
                          onClick={handleSubtract}
                        >
                          -
                        </button>
                        <button
                          name={item.key}
                          className="change"
                          onClick={handleAdd}
                        >
                          +
                        </button>
                        <p className={"qty"}>{item.qty}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <button className={"confirm " + hideBtn} onClick={checkout}>
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;
