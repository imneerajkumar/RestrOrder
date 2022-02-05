import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import "./Checkout.css";

function Checkout(props) {
	const history = useHistory();
	const [list, setList] = useState([]);
	const [[name,number], setDetails] = useState(["",""]);
	const [hide, setHide] = useState("hidden");

	useEffect(() => {
		if(list.length===0 && localStorage.getItem("order")!==null)
		{
			var temp = [];
			var order=JSON.parse(localStorage.getItem("order"));
			var li=JSON.parse(localStorage.getItem("list"));
			var total=JSON.parse(localStorage.getItem("total"));

			if(total <= 0){
				alert("OOPS, No Dish selected")
				history.push('/menu');
			}

			order.forEach((val,key) => {
				if(val>0)
					temp.push({key: key, name: li[key].name,price: li[key].price, qty: val})
			})
			setList(temp);
		}

	}, [list, history]);
	
	function handleSubtract(e){
		var key=Number(e.target.name);
		var order=JSON.parse(localStorage.getItem("order"));
		var li=JSON.parse(localStorage.getItem("list"));
		var total=JSON.parse(localStorage.getItem("total"));
		var temp=[];

		order[key]-=1;
		total-=Number(li[key].price);
		if(total <= 0){
			history.push('/');
		}

		localStorage.setItem("order",JSON.stringify(order));
		localStorage.setItem("total",JSON.stringify(total));
		
		order.forEach((val,key) => {
			if(val>0)
				temp.push({key: key, name: li[key].name,price: li[key].price, qty: val})
		})
		setList(temp);
	}
	
	function handleName(e) {
		setDetails([e.target.value,number]);
	}
	
	function handlePhone(e) {
		setDetails([name,e.target.value]);
	}

	function clear() {
		var l=JSON.parse(localStorage.getItem("order"));
		for(var i=0;i<l.length;i++){
			l[i]=0;
		}

		localStorage.setItem("order",JSON.stringify(l));
		localStorage.setItem("total",0);
	}

	function printBill(total) {
		const doc = new jsPDF('p', 'pt');
    doc.addFont('helvetica', 'normal')

    doc.text(230, 30, 'Restro Order - Your Bill')
    doc.text(70, 50, `Name: ${name}`);
    doc.text(360, 50, `Phone No.: ${number}`);
    doc.text(0, 60, "_______________________________________________________________________");
		doc.text(230, 80, `Total: Rs.${total}/-`);
		doc.text(0, 90, "_______________________________________________________________________");
		
    var i = 120;
    var c = 1;
    list.forEach(item => {
      doc.text(20, i, `${c}. `)
      doc.text(50, i, `${item.name}`)
      doc.text(240, i, `Qty: ${item.qty}`)
			doc.text(360, i, `Rs.${item.price}`)
      i = i + 40;
      c = c + 1;
    });
    
    doc.save("Bill.pdf");
	}
	
	function payCash() {
		if(name.length>0 && number.length===10){
			var total = JSON.parse(localStorage.getItem("total"));
			axios.post("/print",{
				list: list, 
				name: name, 
				number: number, 
				total: Number(localStorage.getItem("total"))
			});	
			printBill(total);
			clear();
			history.push("/");
		}
		else {
			alert("Please fill the correct details");
		}
	}

	function payOnline() {
		if(localStorage.getItem("total")>0){
			clear();
			history.push("/");
		} else {
			alert("OOPS! Cart is empty");
		}
	}
	
	return (
		<div className="Checkout">
			<div className="container">
				<div className="row checkout-row">
				<div className="col left">
					<div className="Total">
						Total: {"₹"+localStorage.getItem("total")}
					</div>
					<div className="Items">
						{list.map((item,key) => {
							return <div className="item" key={key}>
								<div className="Details">
									<p className="Name">{item.name}</p>
								</div>
								<div className="order">
									<p className="Price">{"₹ " +item.price}</p>
									{item.qty}
									<button name={item.key} className="Subt" onClick={handleSubtract}>-</button>
								</div>
							</div>
						})}
					</div>
					<div className="btnContainer">
						<button className="Pay cash" onClick={() => {if(localStorage.getItem("total")>0) setHide("shown")}}> 
							Pay in Cash
						</button>
						<button className="Pay upi" onClick={payOnline}> 
							UPI - PayTM, PhonePe... 
						</button>
					</div>
				</div>
				<div className={"col right "+hide}>
					<div className="Thank">
						Thank you for ordering
					</div>
					<div className={"details "+hide}>
						Enter your details to be printed on invoice
						<div className="Inputs">
							<div className="ind">
								<div className="cate">Name:</div><input className="input" type="text" value={name} onChange={handleName} />
							</div>
							<div className="ind">
								<div className="cate">Phone:</div><input className="input" type="number" value={number} onChange={handlePhone} />
							</div>
						</div>
					</div>
					<div className="Print Bill">
						<button className="print" onClick={payCash}> Print Bill </button>
					</div>
				</div>
				</div>
			</div>
		</div>
	)
}

export default Checkout;