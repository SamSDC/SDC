import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ProductDetail from "./ProductDetail.jsx";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/products/:product_id">
          <ProductDetail />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
