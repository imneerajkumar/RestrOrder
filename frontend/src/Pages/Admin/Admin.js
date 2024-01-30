import React, { useEffect, useState } from "react";
import axios from "axios";
import Login from "../../Components/Login/Login";
import Invoice from "../../Components/Invoice/Invoice";
import Loader from "../../Components/UI/Loader";
import Logout from "../../Components/UI/Logout";
import EditMenu from "../../Components/EditMenu/EditMenu";
import CustomToast from "../../Components/UI/CustomToast";
import "./Admin.css";

function Admin(props) {
  const [isAuth, setIsAuth] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [servedInvoices, setServedInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("invoice");
  const [toast, setToast] = useState({
    open: false,
    message: "",
    variant: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const url = process.env.REACT_APP_API_URL;
    if (token) {
      setIsAuth(true);
      axios.get(`${url}/admin/invoices`).then((res) => {
        var data = res.data;
        setInvoices(
          data.filter((item) => {
            return !item.served;
          })
        );
        setServedInvoices(
          data.filter((item) => {
            return item.served;
          })
        );
      });
      setTimeout(() => setLoading(false), 1500);
    } else {
      setTimeout(() => setLoading(false), 1500);
    }
  }, [isAuth]);

  function giveAlert(message) {
    setToast({
      open: true,
      message: `Error: ${message}`,
      variant: "error",
    });
  }

  const handleLogin = async (admin, password) => {
    try {
      setLoading(true);
      const url = process.env.REACT_APP_API_URL;
      const response = await axios.post(`${url}/admin/login`, {
        admin: admin,
        password: password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        setIsAuth(true);
        setTimeout(() => setLoading(false), 1500);
      } else {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        giveAlert(response.data.message);
      }
    } catch (error) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      giveAlert(error.message);
    }
  };

  const handleLogout = () => {
    setLoading(true);
    setIsAuth(false);
    localStorage.removeItem("token");
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div>
      {loading && <Loader />}
      {!loading && isAuth === false && (
        <>
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
          <Login handleLogin={handleLogin} />
        </>
      )}
      {!loading && isAuth === true && (
        <>
          <Logout onClick={handleLogout} />
          <div className="admin-tabs">
            <div className="tab" onClick={() => setTab("invoice")}>
              Orders
            </div>
            <div className="tab" onClick={() => setTab("menu")}>
              Menu
            </div>
          </div>
          {tab === "invoice" ? (
            <div>
              {invoices?.map((item, key) => (
                <Invoice key={key} index={key} invoice={item} />
              ))}
              {servedInvoices?.map((item, key) => (
                <Invoice key={key} index={key} invoice={item} />
              ))}
            </div>
          ) : (
            <EditMenu />
          )}
        </>
      )}
    </div>
  );
}

export default Admin;
