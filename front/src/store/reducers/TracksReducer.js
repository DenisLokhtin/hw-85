import {FETCH_TRACK_SUCCESS} from "../actions/TracksAction";

const initialState = {
    tracks: [],
};

const TracksReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TRACK_SUCCESS:
            return {...state, tracks: action.payload, loading: false}
        default:
            return state
    }
};

export default TracksReducer;