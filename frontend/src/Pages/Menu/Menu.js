import React, { useState, useEffect } from "react";
import axios from "axios";
import Item from "../../Components/Item/Item";
import Loader from "../../Components/UI/Loader";
import Order from "../../Components/UI/Order";
import "./Menu.css";

function Menu(props) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const filterList = (data) => {
    const set = new Set("");
    data.forEach((item) => set.add(item.category));
    const categories = Array.from(set);
    categories.forEach((category) => {
      let temp = [];
      data.forEach((item) => {
        if (item.category === category) {
          temp.push(item);
        }
      });
      setList((list) => [...list, temp]);
    });
  };

  const getMenu = async () => {
    const url = process.env.REACT_APP_API_URL;
    await axios.get(`${url}/user/loadmenu`).then((res) => {
      filterList(res.data);
      localStorage.setItem("list", JSON.stringify(res.data));
    });
    setTimeout(() => setLoading(false), 1500);
  };

  useEffect(() => {
    getMenu();
    // eslint-disable-next-line
  }, []);

  if (localStorage.getItem("order") === null) {
    var li = [];
    list?.forEach((item) => {
      item?.forEach((i) => li.push(0));
    });
    localStorage.setItem("order", JSON.stringify(li));
    localStorage.setItem("total", 0);
  }

  return (
    <div>
      {loading && <Loader />}
      {!loading && (
        <div className="Menu">
          <p className="menu">MENU</p>
          {list?.map((litem, key) => (
            <div key={key}>
              <h1>{litem[0]?.category}</h1>
              {litem.map((item, key) => (
                <Item key={key} item={item} index={key} />
              ))}
            </div>
          ))}
          <Order />
        </div>
      )}
    </div>
  );
}

export default Menu;
