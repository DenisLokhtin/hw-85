import {FETCH_TRACK_HISTORY_SUCCESS,} from "../actions/TracksHistoryAction";

const initialState = {
    trackHistory: [],
};

const trackHistoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TRACK_HISTORY_SUCCESS:
            return {...state, loadingTrackHistory: false, trackHistory: action.payload};
        default:
            return state;
    }
};

export default trackHistoryReducer;
