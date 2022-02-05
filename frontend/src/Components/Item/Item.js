import React from 'react';
import "./Item.css";

function Item(props) {
	const handleClick = (e) => {
		if(window.confirm(props.item.name+" added to cart")){
			var name = e.target.name;
			var list = JSON.parse(localStorage.getItem("order"));

			list[Number(name)] += 1;
			localStorage.setItem("order",JSON.stringify(list));

			var total = Number(localStorage.getItem("total"));
			localStorage.setItem("total", total+Number(props.item.price));
		}
	}

	return <div className="Item">
		<div className="Logo">
			<img className="images" src={props.item.logo} alt={props.item.name} />
		</div>
		<div className="Details">
			<p className="Name">{props.item.name}</p>
			<p className="Description">{props.item.description}</p>
		</div>
		<div className="Order">
			<p className="Price">{"₹ " +props.item.price}</p>
			<button name={props.index} className="Add" onClick={handleClick} >Add</button>
		</div>
	</div>
}

export default Item;