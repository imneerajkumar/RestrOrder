import React, { useState } from "react";
import CustomToast from "../UI/CustomToast";
import "./Item.css";

function Item({ item, index, editable = false, handleShow, list }) {
  const [toast, setToast] = useState({
    open: false,
    message: "",
    variant: "",
  });

  const addItem = (e) => {
    setToast({
      open: true,
      message: `${item.name} added to cart`,
      variant: "success",
    });
    var idx = 0;
    list.forEach((element, index) => {
      if (element.name === e.target.name) {
        idx = index;
      }
    });

    var localList = JSON.parse(localStorage.getItem("order"));
    localList[idx] += 1;
    localStorage.setItem("order", JSON.stringify(localList));

    var total = Number(localStorage.getItem("total"));
    localStorage.setItem("total", total + Number(item.price));
  };

  return (
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
      <div
        className={`Item ${editable && "editable"}`}
        onClick={() => editable && handleShow(item._id, item)}
      >
        <div className={`img-container ${item.veg === "true" && "veg"}`}>
          <img className="img" src={item.logo} alt={item.name} />
        </div>
        <div className="Details">
          <p className="Name">{item.name}</p>
          <p className="Description">{item.description}</p>
        </div>
        <div className="Order">
          <p className="Price">{"₹" + item.price}</p>
          {!editable && (
            <button
              name={item.name}
              className={`Add ${item.veg === "true" && "veg"}`}
              onClick={addItem}
            >
              +
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Item;
