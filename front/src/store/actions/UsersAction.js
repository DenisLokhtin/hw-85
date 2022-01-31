import {historyPush} from "./historyActions";
import {toast} from "react-toastify";
import axiosApi from "../../axiosApi";

export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';

export const registerUserSuccess = user => ({type: REGISTER_USER_SUCCESS, payload: user});
export const loginUserSuccess = user => ({type: LOGIN_USER_SUCCESS, payload: user});
export const logoutUserSuccess = () => ({type: LOGOUT_USER_SUCCESS});

export const registerUser = (userData) => {
    return async (dispatch) => {
        try {
            const response = await axiosApi.post('/users', userData);
            dispatch(registerUserSuccess(response.data));
            toast.success('User registered!');
            dispatch(historyPush('/'));
        } catch (e) {
            toast.error(e.response.data.global);
            console.log(e)
        }
    };
};

export const loginUser = (userData) => {
    return async (dispatch) => {
        try {
            const response = await axiosApi.post("/users/sessions", userData);
            dispatch(loginUserSuccess(response.data.user));
            dispatch(historyPush("/"));
            toast.success('User logged in!');
        } catch (e) {
            toast.error(e.response.data.global);
            console.log(e);
        }
    };
};

export const facebookLogin = data => {
    return async dispatch => {
        try {
            const response = await axiosApi.post('/users/facebookLogin', data);
            dispatch(loginUserSuccess(response.data.user));
            dispatch(historyPush("/"));
            toast.success('User logged in!')
        } catch (e) {
            toast.error(e.response.data.global);
            console.log(e);
        }
    }
};

export const logoutUser = () => {
    return async (dispatch) => {
        try {
            dispatch(logoutUserSuccess());
            await axiosApi.delete('/users/sessions');
            dispatch(historyPush('/'));
            toast.success('Logout successful');
        } catch (e) {
            toast.error(e.response.data.global);
            console.log(e);
        }
    }
};