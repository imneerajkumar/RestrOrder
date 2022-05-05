import React, { useState } from 'react';
import axios from 'axios';
import './Invoice.css';

function Invoice({ invoice, index }) {
  const [cut, setCut] = useState(invoice.served ? "cut" : "");

  const handleClick = () => {
    setCut("cut")
    axios.patch("/invoices", {
      id: invoice._id,
      served: true
    });
  }

  return (
    <div className='invoice'>
			<div className='invoice-owner'>
				<p className={cut}>{invoice.name}</p>
        <p className={cut}>{invoice.number}</p>
			</div>
			<div className='invoice-list'>
				{invoice.list.map((item, key) => 
          <div className='invoice-order' key={key} >
            <p className={cut}>{item.name}</p>
            <p className={cut}>{item.qty+ " X " +item.price}</p>
          </div>
        )}
			</div>
			<div className='invoice-total'>
				<p className={cut}>{"₹" +invoice.total+ " ("+ invoice.mode+ ")"}</p>
        <button name={index} className={'invoice-served '+ cut} onClick={handleClick}>Served</button>
			</div>
		</div>
  );
}

export default Invoice;