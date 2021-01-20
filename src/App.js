import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Home from "../src/components/Home";
import UserFormDetails from '../src/components/user/UserDetails'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path={`/`} component={Home} />
          <Route exact path={`/nasa-details`} component={UserFormDetails} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
