import React from 'react';
import {withRouter} from "react-router-dom";

const Header = (props) => {
    const toLogin = () => {
        return props.history.push('/login');
    };

    const toRegister = () => {
        return props.history.push('/register');
    };

    return (
        <div className="header">
            <h1>MUSIC</h1>
            <div className="authorization">
                <span onClick={toLogin}>Login</span>
                <span>Register</span>
            </div>
        </div>
    );
};

export default withRouter(Header);