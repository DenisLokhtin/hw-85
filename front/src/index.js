import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from "react-router-dom";
import {Provider} from "react-redux";
import App from './App';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import store from "./store/configureStore";
import history from "./history";

const app = (
    <Provider store={store}>
        <Router history={history}>
            <App/>
            <ToastContainer/>
        </Router>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));