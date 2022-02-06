import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Item.css";

toast.configure();
function Item(props) {
	const handleClick = (e) => {
		toast.success(`${props.item.name} added to cart`, {
			position: "top-center",
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			progress: undefined,
			theme: "colored"
		});

		var name = e.target.name;
		var list = JSON.parse(localStorage.getItem("order"));

		list[Number(name)] += 1;
		localStorage.setItem("order",JSON.stringify(list));

		var total = Number(localStorage.getItem("total"));
		localStorage.setItem("total", total+Number(props.item.price));
	}

	return (
		<div className="Item">
			<div className="img-container">
				<img className="img" src={props.item.logo} alt={props.item.name} />
			</div>
			<div className="Details">
				<p className="Name">{props.item.name}</p>
				<p className="Description">{props.item.description}</p>
			</div>
			<div className="Order">
				<p className="Price">{"₹" +props.item.price}</p>
				<button name={props.index} className="Add" onClick={handleClick}>+</button>
			</div>
		</div>
	);
}

export default Item;