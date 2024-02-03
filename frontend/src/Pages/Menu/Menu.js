import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Item from "../../Components/Item/Item";
import Loader from "../../Components/UI/Loader";
import Order from "../../Components/UI/Order";
import "./Menu.css";
import { getMenu } from "../../store/action";

function Menu(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const menu = useSelector((state) => state.menu);

  const getMenuList = () => {
    dispatch(getMenu());
    setTimeout(() => setLoading(false), 1500);
  };

  useEffect(() => {
    getMenuList();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <div className="Menu">
          <p className="menu-title">MENU</p>
          {menu?.map((litem, key) => (
            <div key={key}>
              <h1 className="category">{litem[0]?.category}</h1>
              {litem.map((item) => (
                <Item key={item._id} item={item} />
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
