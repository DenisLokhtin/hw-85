import {Route, Switch, BrowserRouter, withRouter} from "react-router-dom";
import Main from "./components/Main/Main";
import Albums from "./components/Albums/Albums";
import Header from "./components/Header/Header";
import React from "react";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import './App.css'

const App = (props) => {
    return (
        <div>
            <Header/>
            <div className="container">
                <div className="container-inner">
                    <BrowserRouter>
                        <Switch>
                            <Route path="/" exact component={Main}/>
                            <Route path="/music" exact component={Main}/>
                            <Route path="/music/:id" component={Albums}/>
                            <Route path="/register" exact component={Register}/>
                            <Route path="/login" exact component={Login}/>
                        </Switch>
                    </BrowserRouter>
                </div>
            </div>
        </div>
    )
};

export default App;