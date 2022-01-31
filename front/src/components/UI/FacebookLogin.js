import React from 'react';
import {useDispatch} from "react-redux";
import FacebookLoginButton from 'react-facebook-login/dist/facebook-login-render-props';
import {Button} from "@material-ui/core";
import {facebookLogin} from "../../store/actions/UsersAction";
import {facebookAppId} from "../../config";

const FacebookLogin = () => {
    const dispatch = useDispatch();

    const responseFacebook = response => {
        console.log(response);
        dispatch(facebookLogin(response));
    };

    return (
        <FacebookLoginButton
            appId={facebookAppId}
            fields="name,email,picture"
            render={props => (
                <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    onClick={props.onClick}
                >
                    Login with facebook
                </Button>
            )}
            callback={responseFacebook} />
    );
};

export default FacebookLogin;