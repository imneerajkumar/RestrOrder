import React from 'react';
import {useHistory} from "react-router-dom";
import "./Home.css";

function Home() {
	const history = useHistory();

	function handleClick() {
		history.push("/menu");
	}
	
	return (
		<div className="Home">
			<div className="container home">
				<div className="row rowHome">
					<div className="col details">
						<img className="image" src={process.env.PUBLIC_URL + '/restaurant.png'} alt="Logo" />
					</div>
					<div className="col details">
						<div className="name">
							RestrOrder
						</div>
						<div className="features">
							"Best Dishes in the Town, Serve with love."
						</div>
						<div>
							<button className="Button" onClick={handleClick}>
								Hungry? Order Now
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;