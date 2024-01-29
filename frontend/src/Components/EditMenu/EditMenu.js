import React, { useState, useEffect } from "react";
import Loader from "../UI/Loader";
import Item from "../Item/Item";
import axios from "axios";

export default function EditMenu() {
  const url = process.env.REACT_APP_API_URL;
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMenu = async () => {
    await axios.get(`${url}/user/loadmenu`).then((res) => {
      setMenu(res.data);
    });
    setTimeout(() => setLoading(false), 1000);
  };

  useEffect(() => {
    getMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {loading && <Loader />}
      {!loading && (
        <div className="Menu">
          {menu?.map((item, key) => (
            <Item item={item} key={key} index={key} editable={true} />
          ))}
        </div>
      )}
    </div>
  );
}
