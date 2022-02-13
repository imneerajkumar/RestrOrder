import React, { useEffect } from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './App.css';
import Header from "./Components/Header/Header";
import Home from "./Pages/Home/Home";
import Menu from "./Pages/Menu/Menu";
import Checkout from "./Pages/Checkout/Checkout";
import Admin from './Pages/Admin/Admin';

function App() {
  useEffect(() => {
    if(localStorage.getItem("total")===null)
      localStorage.setItem("total",0);
  }, []);

  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/checkout">
            <Checkout />
          </Route>
          <Route path="/menu">
            <Menu />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="*">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
