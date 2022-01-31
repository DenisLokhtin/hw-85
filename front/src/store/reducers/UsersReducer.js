import {
    LOGIN_USER_SUCCESS,
    LOGOUT_USER_SUCCESS,
    REGISTER_USER_SUCCESS
} from "../actions/UsersAction";

const initialState = {
    user: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER_SUCCESS:
            return {...state, user: action.payload, registerError: null};
        case LOGIN_USER_SUCCESS:
            return {...state, user: action.payload, loginError: null};
        case LOGOUT_USER_SUCCESS:
            return {...state, user: null};
        default:
            return state;
    }
};

export default userReducer;