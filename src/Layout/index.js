import React from "react";
import {Switch, Route} from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../components/Home"

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/" >
            <Home />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
