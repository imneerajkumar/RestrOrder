import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";
import Item from "../../Components/Item/Item";
import Loader from "../../Components/UI/Loader";
import Order from "../../Components/UI/Order";
import "./Menu.css";

function Menu(props) {
	const [list, setList]=useState([]);
	const [loading, setLoading] = useState(true);
	const history = useHistory();

	useEffect(() => {
		axios.get("/loadmenu").then((res) => {
			setList(res.data);	
			localStorage.setItem("list",JSON.stringify(list));
			setTimeout(() => setLoading(false), 1500);
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
		<div>
			{loading && <Loader /> } 
			{!loading &&  
				<div className="Menu">
					<p className="menu">MENU</p>
					{list?.map((item,key) => <Item item={item} key={key} index={key} />)}
					<Order onClick={() => history.push("/checkout")} />
				</div>
			}
		</div>
	);
}

export default Menu;