import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/UI/Loader";
import "./Home.css";

function Home() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  function handleClick() {
    navigate("/menu");
  }

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <div className="Home">
          <div className="container">
            <div className="row rowHome">
              <div className="col details">
                <img
                  className="image"
                  src={process.env.PUBLIC_URL + "/restaurant.png"}
                  alt="Logo"
                />
              </div>
              <div className="col details">
                <div className="name">RestrOrder</div>
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
      )}
    </>
  );
}

export default Home;
