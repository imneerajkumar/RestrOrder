import React, {useState, useEffect} from "react";
import axios from "axios";
import Item from "../../Components/Item/Item";
import "./Menu.css";

function Menu(props) {
	const [list, setList]=useState([]);

	useEffect(() => {
		axios.get("/loadmenu").then((res) => {
			setList(res.data);	
			localStorage.setItem("list",JSON.stringify(list));
		})
	}, [list]);

	if(localStorage.getItem("order")===null || JSON.parse(localStorage.getItem("order")).length!==list.length)
	{
		var li=[]
		list.forEach((item) => {li.push(0)})
		localStorage.setItem("order",JSON.stringify(li));
		localStorage.setItem("total",0);
	}
	
	return (
		<div className="Menu">
			<p className="menu">MENU</p>
			{list?.map((item,key) => <Item item={item} key={key} index={key} />)}
		</div>
	);
}

export default Menu;