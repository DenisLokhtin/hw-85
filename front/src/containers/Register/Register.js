import React, {useState} from 'react';
import './Register.css'
import {useDispatch} from "react-redux";
import {registerUser} from "../../store/actions/UsersAction";

const Register = () => {
    const dispatch = useDispatch();

    const [user, setUser] = useState({
        email: '',
        password: '',
        displayName: '',
        image: '',
    });

    const inputChangeHandler = e => {
        const {name, value} = e.target;

        setUser(prevState => ({...prevState, [name]: value}))
    };

    const submitFormHandler = e => {
        e.preventDefault();

        const formData = new FormData();

        Object.keys(user).forEach((key) => {
            formData.append(key, user[key]);
        });

        dispatch(registerUser(formData));
    };

    const fileChangeHandler = (e) => {
        const name = e.target.name;
        const file = e.target.files[0];

        setUser((prevState) => ({
            ...prevState,
            [name]: file,
        }));
    };

    return (
        <div className="login">
            <h2>Register</h2>
            <form>
                <div>
                    <input defaultValue={user.email} onChange={inputChangeHandler} type="text" placeholder="email" name="email"/>
                    <input defaultValue={user.displayName} onChange={inputChangeHandler} type="text" placeholder="display Name" name="displayName"/>
                    <input defaultValue={user.password} onChange={inputChangeHandler} type="password" placeholder="Password" name="password"/>
                    <input defaultValue={user.image} onChange={fileChangeHandler} type="file" name="image"/>
                </div>
                <button onClick={submitFormHandler} type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Register;