import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { dataActions } from "./Redux/Actions";
import Home from "./Pages/Home";
import Cart from "./Components/Cart/Cart";
import Products from "./Components/Products/Products";
import SignIn from "./Components/SignIn";
import CreateAcc from "./Components/CreateAcc";
import NotFound from "./Components/NotFound";
import alertify from "alertifyjs";
import About from "./Components/About/About";
import Contact from "./Components/Contact/Contact";

const App = () => {
  const dispatch = useDispatch();
  const { selectUser } = bindActionCreators(dataActions, dispatch);
  useEffect(async () => {
    let localStorageCheck = localStorage.getItem("currentUser");
    if (localStorageCheck) {
      await selectUser(JSON.parse(localStorageCheck));
      alertify.success(
        `Welcome back to the system ${
          JSON.parse(localStorageCheck).gender === "Female" ? "Ms." : "Mr."
        } ${JSON.parse(localStorageCheck).name}`,
        1
      );
    }
  }, []);
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/cart" component={Cart} />
          <Route path="/products" component={Products} />
          <Route path="/signin" component={SignIn} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/create" component={CreateAcc} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
