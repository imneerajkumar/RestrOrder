import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Checkout.css";

toast.configure();
function Checkout(props) {
	const history = useHistory();
	const [list, setList] = useState([]);
	const [[name,number], setDetails] = useState(["",""]);
	const [hideCol, setHideCol] = useState("hidden");
	const [hideBtn, setHideBtn] = useState("show");

	function giveAlert(message) {
		toast.error(`Error: ${message}`, {
			position: "top-center",
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			progress: undefined,
			theme: "colored"
		});
	}

	function giveSucess() {
		toast.success("Placing your Order", {
			position: "top-center",
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			progress: undefined,
			theme: "colored"
		});
	}

	function clear() {
		var l=JSON.parse(localStorage.getItem("order"));
		for(var i=0;i<l.length;i++){
			l[i]=0;
		}

		localStorage.setItem("order",JSON.stringify(l));
		localStorage.setItem("total",0);
	}

	useEffect(() => {
		if(list.length===0 && localStorage.getItem("order")!==null && localStorage.getItem("list")!==null)
		{
			var temp = [];
			var order=JSON.parse(localStorage.getItem("order"));
			var li=JSON.parse(localStorage.getItem("list"));
			var total=localStorage.getItem("total");

			if(total <= 0){
				giveAlert("No order for Checkout");
				history.push('/');
			}
			
			order.forEach((val,key) => {
				if(val>0)
					temp.push({key: key, name: li[key].name,price: li[key].price, qty: val})
			})
			setList(temp);
		}	
	}, [list ,history]);

	function handleAdd(e){
		var key=Number(e.target.name);
		var order=JSON.parse(localStorage.getItem("order"));
		var li=JSON.parse(localStorage.getItem("list"));
		var total=JSON.parse(localStorage.getItem("total"));
		var temp=[];

		order[key]+=1;
		total += Number(li[key].price);
		localStorage.setItem("order",JSON.stringify(order));
		localStorage.setItem("total",JSON.stringify(total));
		
		order.forEach((val,key) => {
			if(val>0)
				temp.push({key: key, name: li[key].name,price: li[key].price, qty: val})
		})
		setList(temp);
	}
	
	function handleSubtract(e){
		var key=Number(e.target.name);
		var order=JSON.parse(localStorage.getItem("order"));
		var li=JSON.parse(localStorage.getItem("list"));
		var total=localStorage.getItem("total");
		var temp=[];

		order[key]-=1;
		total-=Number(li[key].price);
		if(total <= 0){
			giveAlert("No order for Checkout");
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

	function printBill() {
		var total = localStorage.getItem("total");
		const doc = new jsPDF('p', 'pt');
    doc.addFont('helvetica', 'normal')

    doc.text(200, 30, 'Restro Order - Your Bill')
    doc.text(70, 50, `Name: ${name}`);
    doc.text(360, 50, `Phone No.: ${number}`);
    doc.text(0, 60, "_______________________________________________________________________");
		doc.text(230, 80, `Total: Rs.${total}/-`);
		doc.text(0, 90, "_______________________________________________________________________");
		
    var i = 120;
    var c = 1;
    list.forEach(item => {
      doc.text(25, i, `${c}. `)
      doc.text(75, i, `${item.name}`)
      doc.text(255, i, `Qty: ${item.qty}`)
			doc.text(325, i, `Rs.${item.price}`)
			doc.text(455, i, `Rs.${item.qty * item.price}`)
      i = i + 40;
      c = c + 1;
    });
    
    doc.save("Bill.pdf");
	}

	function sendInvoice(mode) {
		axios.post("/print",{
			list: list, 
			name: name, 
			number: number, 
			total: Number(localStorage.getItem("total")),
			mode: mode
		});	
	}
	
	function payCash() {
		if(name.length>0 && number.length===10){
			sendInvoice("Cash");
			printBill();
			giveSucess();
			clear();
			history.push("/");
		}
		else {
			giveAlert("Please fill the correct details");
		}
	}

	function payOnline() {
		if(name.length>0 && number.length===10){
			// If online Payment is successful
			sendInvoice("Online");
			giveSucess();
			clear();
			history.push("/");
		}
		else {
			giveAlert("Please fill the correct details");
		}
	}

	function checkout() {
		if(localStorage.getItem("total")>0){
			setHideCol("show");
			setHideBtn("hidden");
		}
	}
	
	return (
		<div className="Checkout">
			<div className="container checkout">
				<div className="row checkout-row">
					<div className={"col left "+hideCol}>
						<div className="Thank">
							THANK YOU FOR ORDERING
						</div>
						<div className={"fills "+hideCol}>
							<div className="inst">
								Please fill the details below:
							</div>
							<div className="ind">
								<div className="label">Name :</div>
								<input className="input" type="text" value={name} onChange={handleName} />
							</div>
							<div className="ind">
								<div className="label">Phone:</div>
								<input className="input" type="number" value={number} onChange={handlePhone} />
							</div>
						</div>
						<div className="bill">
							<button className="pay cash" onClick={payCash}>Cash Payment</button>
							<button className="pay upi" onClick={payOnline}>UPI - PayTM, PhonePe..</button>
						</div>
					</div>
					<div className="col right">
						<div className="Total">
							Total: {"₹"+localStorage.getItem("total")}
						</div>
						<div className="Items">
							{list.map((item,key) => {
								return <div className="item" key={key}>
									<div className="order">
										<p className="Name">{item.name}</p>
										<p className="Price">{"₹ " +item.price}</p>
									</div>
									<div className={"changeBtns "+hideBtn}>
										<button name={item.key} className="change" onClick={handleSubtract}>-</button>
										<button name={item.key} className="change" onClick={handleAdd}>+</button>
										<p className={"qty"} >{item.qty}</p>
									</div>
								</div>
							})}
						</div>
						<button className={"confirm "+hideBtn} onClick={checkout}> 
							Checkout
						</button>
					</div>					
				</div>
			</div>
		</div>
	)
}

export default Checkout;