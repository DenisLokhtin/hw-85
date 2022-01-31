import React from 'react';
import {withRouter} from "react-router-dom";
import {useSelector} from "react-redux";
import Anonymous from "../UI/Menu/Anonymous";
import User from "../UI/Menu/User";

const Header = (props) => {
    const user = useSelector(state => state.users.user);

    const toMain = () => {
        return props.history.push('/');
    };

    return (
        <div className="header">
            <h1 onClick={toMain}>MUSIC</h1>
            <div className="authorization">
                {user ? (
                    <User user={user}/>
                ) : (
                    <Anonymous/>
                )}
            </div>
        </div>
    );
};

export default withRouter(Header);