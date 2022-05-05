import React, { useEffect, useState } from 'react';
import {useHistory} from "react-router-dom";
import Loader from "../../Components/UI/Loader";
import "./Home.css";

function Home() {
	const [loading, setLoading] = useState(true);
	const history = useHistory();

	function handleClick() {
		history.push("/menu");
	}

	useEffect(() => {
		setTimeout(() => setLoading(false), 1200);
	}, [])

	
	return (
		<div className="Home">
			{loading ? <Loader /> : (
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
			)}
		</div>
	);
}

export default Home;