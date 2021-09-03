import React from "react";
import "./App.css";
import Homepage from "./pages/homepage/homepage.component";
import { Route, Switch } from "react-router-dom";

const hats = () => {
  return <h1>Hats page.</h1>;
};

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/hats" component={hats} />
      </Switch>
    </div>
  );
}

export default App;
