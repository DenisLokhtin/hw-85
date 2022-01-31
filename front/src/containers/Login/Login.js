import React, {useState} from 'react';
import './Login.css'
import {useDispatch} from "react-redux";
import {loginUser} from "../../store/actions/UsersAction";
import FacebookLogin from "../../components/UI/FacebookLogin";


const Login = () => {
    const dispatch = useDispatch();

    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const inputChangeHandler = e => {
        const {name, value} = e.target;

        setUser(prevState => ({...prevState, [name]: value}));
    };

    const submitFormHandler = (e) => {
        e.preventDefault();
        dispatch(loginUser({...user}))
    };

    return (
        <div className="login">
            <h2>Login</h2>
            <form>
                <div>
                    <input defaultValue={user.email} onChange={inputChangeHandler} name="email" type="text"
                           placeholder="email" autoComplete="on"/>
                    <input defaultValue={user.password} onChange={inputChangeHandler} name="password" type="password"
                           placeholder="Password" autoComplete="on"/>
                </div>
                <button onClick={submitFormHandler} type="submit">Submit</button>
                <div>
                    <FacebookLogin/>
                </div>
            </form>
        </div>
    );
};

export default Login;