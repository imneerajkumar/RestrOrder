import React from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Tooltip } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import "./UI.css";

function Order(props) {
  const history = useHistory();

  return (
    <div onClick={() => history.push("/checkout")}>
      <Tooltip title="Checkout">
        <button
          className="cartbtn"
          style={{ display: "block" }}
          onClick={() => history.push("/checkout")}
        >
          <ShoppingCartIcon />
        </button>
      </Tooltip>
    </div>
  );
}

export default Order;
