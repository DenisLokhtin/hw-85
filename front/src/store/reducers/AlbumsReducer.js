import {FETCH_ALBUM_SUCCESS} from "../actions/AlbumsAction";

const initialState = {
    albums: [],
};

const albumReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALBUM_SUCCESS:
            return {...state, albums: action.payload, loading: false}
        default:
            return state
    }
};

export default albumReducer;