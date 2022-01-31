import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import ArtistsReducer, {initialState} from "./reducers/ArtistsReducer";
import AlbumsReducer from "./reducers/AlbumsReducer";
import TracksReducer from "./reducers/TracksReducer";
import UsersReducer from "./reducers/UsersReducer";
import TracksHistoryReducer from "./reducers/TracksHistoryReducer";
import thunk from "redux-thunk";
import {loadFromLocalStorage, saveToLocalStorage} from "./localStorage";
import axiosApi from "../axiosApi";


const rootReducer = combineReducers({
    artists: ArtistsReducer,
    albums: AlbumsReducer,
    tracks: TracksReducer,
    users: UsersReducer,
    tracksHistory: TracksHistoryReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedState = loadFromLocalStorage();

const enhancers = composeEnhancers(applyMiddleware(thunk));
const store = createStore(rootReducer, persistedState, enhancers);

store.subscribe(() => {
    saveToLocalStorage({
        users: {
            ...initialState,
            user: store.getState().users.user
        }
    });
});

axiosApi.interceptors.request.use(config => {
    try {
        config.headers['Authorization'] = store.getState().users.user.token
    } catch (e) {
    }
    return config;
});

axiosApi.interceptors.response.use(res => res, e => {
    if (!e.response) {
        e.response = {data: {message: 'No internet!'}};
    }
    throw e;
});


export default store;