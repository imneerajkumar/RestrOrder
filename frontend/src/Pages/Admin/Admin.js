import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Login from "../../Components/Login/Login";
import Invoice from "../../Components/Invoice/Invoice";
import Loader from "../../Components/UI/Loader";
import "react-toastify/dist/ReactToastify.css";
import Logout from "../../Components/UI/Logout";
import { API_URL } from "../../api-manager";

function Admin(props) {
  const [isAuth, setIsAuth] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [servedInvoices, setServedInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuth(true);
      axios.get(`${API_URL}/invoices`).then((res) => {
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
    toast.error(`Error: ${message}`, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }

  const handleLogin = async (admin, password) => {
    try {
      setLoading(true);
      const url = process.env.REACT_APP_API_URL;
      const response = await axios.post(`${url}/login`, {
        admin: admin,
        password: password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        setIsAuth(true);
        setTimeout(() => setLoading(false), 1500);
      } else {
        giveAlert(response.data.message);
        setTimeout(() => setLoading(false), 1000);
      }
    } catch (error) {
      giveAlert(error.message);
      setTimeout(() => setLoading(false), 1500);
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
      {!loading && isAuth === false && <Login handleLogin={handleLogin} />}
      {!loading && isAuth === true && (
        <>
          <Logout onClick={handleLogout} />
          {invoices?.map((item, key) => (
            <Invoice key={key} index={key} invoice={item} />
          ))}
          {servedInvoices?.map((item, key) => (
            <Invoice key={key} index={key} invoice={item} />
          ))}
        </>
      )}
    </div>
  );
}

export default Admin;
