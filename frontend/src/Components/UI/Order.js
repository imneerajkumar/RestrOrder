import React from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Tooltip } from '@material-ui/core';
import './UI.css';

function Order(props) {
  return (
    <Tooltip title="Checkout">
      <button
        className='cartbtn' 
        style={{display: "block"}}
        onClick={props.onClick}
      >      
        <ShoppingCartIcon />
      </button>
    </Tooltip>
  );
}

export default Order;