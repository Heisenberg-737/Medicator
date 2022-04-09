import React, { useEffect } from "react";
import "./App.css";
import { AuthProvider } from "./Context/Context";
import PrivateRoute from "./Components/utils/PrivateRoute/PrivateRoute";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Signup } from "./Components/Pages/Signup/Signup";
import { Login } from "./Components/Pages/Login/Login";
import { Home } from "./Components/Pages/Home/Home";
import { Manufacturer } from "./Components/Pages/Manufacturer/Manufacturer";
import { Create_Record } from "./Components/Pages/Create_Record/Create_Record";
import { Know_Your_Vaccine } from "./Components/Pages/Know_Your_Vaccine/Know_Your_Vaccine";
import { History } from "./Components/Pages/History/History";
import { Hospital } from "./Components/Pages/Hospital/Hospital";
import { Scan_Vaccine } from "./Components/Pages/Scan_Vaccine/Scan_Vaccine";

function App() {
  return (
    <div className="app">
      <Router>
        <AuthProvider>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <PrivateRoute exact path="/manufacturer" component={Manufacturer} />
            <PrivateRoute exact path="/hospital" component={Hospital} />
            <PrivateRoute
              exact
              path="/manufacturer/create_record"
              component={Create_Record}
            />
            <PrivateRoute
              exact
              path="/hospital/scan_vaccine"
              component={Scan_Vaccine}
            />
            <PrivateRoute
              exact
              path="/manufacturer/history"
              component={History}
            />
            <PrivateRoute
              exact
              path="/hospital/history"
              component={History}
            />
            <Route exact path="/know_your_vaccine">
              <Know_Your_Vaccine />
            </Route>
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
