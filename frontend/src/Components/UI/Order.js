import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./UI.css";

function Order(props) {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate("/checkout")}>
      <Tooltip title="Checkout">
        <button
          className="cartbtn"
          style={{ display: "block" }}
          onClick={() => navigate("/checkout")}
        >
          <ShoppingCartIcon />
        </button>
      </Tooltip>
    </div>
  );
}

export default Order;
