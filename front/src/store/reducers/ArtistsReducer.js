import {
    FETCH_ARTIST_SUCCESS,
} from "../actions/ArtistsAction";

export const initialState = {
    artists: [],
};

const ArtistReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ARTIST_SUCCESS:
            return {...state, artists: action.payload, loading: false};
        default:
            return state;
    }
};

export default ArtistReducer;