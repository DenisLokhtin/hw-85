import {Route, Switch, BrowserRouter} from "react-router-dom";
import Main from "./components/Main/Main";
import Albums from "./components/Albums/Albums";
import React from "react";
import './App.css'

const App = () => (
    <div>
        <div className="header">
            <h1>MUSIC</h1>
        </div>
        <div className="container">
            <div className="container-inner">
              <BrowserRouter>
                <Switch>
                  <Route path="/" exact component={Main}/>
                  <Route path="/music" exact component={Main}/>
                  <Route path="/music/:id" component={Albums}/>
                </Switch>
              </BrowserRouter>
            </div>
        </div>
    </div>
);

export default App;