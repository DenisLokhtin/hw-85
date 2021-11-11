import {SET_ARTIST, SET_ALBUMS, SET_TRACKS} from "../actions/Actions";

const initialState = {
  artist: [],
  albums: [],
  tracks: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ARTIST:
      return {...state, artist: action.payload};
    case SET_ALBUMS:
      return {...state, albums: action.payload};
    case SET_TRACKS:
      return {...state, tracks: action.payload};
    default:
      return state;
  }
};

export default reducer;