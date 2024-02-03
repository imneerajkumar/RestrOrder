import React, { useState } from "react";
import CustomToast from "../UI/CustomToast";
import "./Item.css";
import { addToCart } from "../../store/action";
import { useDispatch } from "react-redux";

function Item({ item, editable = false, handleShow }) {
  const dispatch = useDispatch();
  const [toast, setToast] = useState({
    open: false,
    message: "",
    variant: "",
  });

  const addItem = () => {
    setToast({
      open: true,
      message: `${item.name} added to cart`,
      variant: "success",
    });
    dispatch(addToCart(item));
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
