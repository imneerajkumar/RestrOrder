import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Login from '../../Components/Login/Login';
import Invoice from '../../Components/Invoice/Invoice';
import 'react-toastify/dist/ReactToastify.css';

function Admin(props) {
  const [isAuth, setIsAuth] = useState(false);
  const[invoices, setInvoices] = useState([]);

  useEffect(() => {
    if(isAuth) {
      axios.get("/invoices").then((res) => {
        var data =res.data;
        setInvoices(data.filter((item) => {
          return !item.served
        }));
      })
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
			theme: "colored"
		});
	}

  const handleLogin = async (admin, password) => {
    try {
      const response = await axios.post("/login", {
        admin: admin,
        password: password
      }); 

      if (response.data.token){
        setIsAuth(true);
      } else {
        giveAlert(response.data.message);
      }
    } 
    catch (error) {
      giveAlert(error.message);
    }  
  };

  return (
    <div>
      {isAuth===false && <Login handleLogin={handleLogin} />}
      {isAuth===true && 
        invoices?.map((item, key) => <Invoice key={key} index={key} invoice={item} />)
      }   
    </div>
  );
}

export default Admin;