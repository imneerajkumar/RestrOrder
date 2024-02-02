import React, { useState, useEffect } from "react";
import axios from "axios";
import Item from "../../Components/Item/Item";
import Loader from "../../Components/UI/Loader";
import Order from "../../Components/UI/Order";
import "./Menu.css";

function Menu(props) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menu, setMenu] = useState([]);

  const filterList = (data) => {
    setMenu([]);
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
      setMenu((menu) => [...menu, temp]);
    });
  };

  const getMenu = async () => {
    const url = process.env.REACT_APP_API_URL;
    await axios.get(`${url}/user/loadmenu`).then((res) => {
      filterList(res.data);
      setList(res.data);
      localStorage.setItem("list", JSON.stringify(res.data));
    });
    setTimeout(() => setLoading(false), 1500);
  };

  useEffect(() => {
    getMenu();
    // eslint-disable-next-line
  }, []);

  if (
    localStorage.getItem("order") === null ||
    JSON.parse(localStorage.getItem("order")).length !== list.length
  ) {
    var li = [];
    menu?.forEach((item) => {
      item?.forEach((i) => li.push(0));
    });
    localStorage.setItem("order", JSON.stringify(li));
    localStorage.setItem("total", 0);
  }

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <div className="Menu">
          <p className="menu-title">MENU</p>
          {menu?.map((litem, key) => (
            <div key={key}>
              <h1 className="category">{litem[0]?.category}</h1>
              {litem.map((item, key) => (
                <Item key={key} item={item} index={key} list={list} />
              ))}
            </div>
          ))}
          <Order />
        </div>
      )}
    </>
  );
}

export default Menu;
