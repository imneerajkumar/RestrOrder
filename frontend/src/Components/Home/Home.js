import React from 'react';
import {useHistory} from "react-router-dom";
import "./Home.css";

function Home() {
	const history = useHistory();

	function handleClick() {
		history.push("/menu");
	}
	
	return <div className="Home">
		<div className="container">
		  <div className="row rowHome">
			<div className="col">
				<div className="name">
					Restro Order
				</div>
				<div className="features">
					Best Dishes in Town
					<br />
					Made with Love
				</div>
			</div>
			<div className="col">
				<div className="Image">
					<img className="image" src={process.env.PUBLIC_URL + '/restaurant.png'} alt="Logo" />
				</div>
				<div>
					<button className="Button" onClick={handleClick}>Order Now</button>
				</div>
			</div>
		  </div>
		</div>
	</div>
}

export default Home;