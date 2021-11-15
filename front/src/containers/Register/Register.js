import React, {useState} from 'react';
import './Register.css'

const Register = () => {
    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    const inputChangeHandler = e => {
        const {name, value} = e.target;

        setUser(prevState => ({...prevState, [name]: value}))
    };

    const submitFormHandler = (e) => {
        e.preventDefault();
    }

    return (
        <div className="login">
            <h2>Register</h2>
            <form>
                <div>
                    <input defaultValue={user.username} onChange={inputChangeHandler} type="text" placeholder="Username"/>
                    <input defaultValue={user.password} onChange={inputChangeHandler} type="password" placeholder="Password"/>
                </div>
                <button onClick={submitFormHandler} type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Register;