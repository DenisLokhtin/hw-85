import axios from "axios";

export const SET_ARTIST = 'SET_ARTIST';
export const SET_ALBUMS = 'SET_ALBUMS';
export const SET_TRACKS = 'SET_TRACKS';

export const setArtist = value => ({type: SET_ARTIST, payload: value});
export const setAlbums = value => ({type: SET_ALBUMS, payload: value});
export const setTracks = value => ({type: SET_TRACKS, payload: value});

export const fetchArtist = () => {
  return async dispatch => {
    try {
      const response = await axios.get('http://localhost:8001/artist');
      dispatch(setArtist(response.data));
    } catch (e) {
      console.log(e)
    }
  };
};

export const fetchAlbums = () => {
  return async dispatch => {
    try {
      const response = await axios.get('http://localhost:8001/album');
      dispatch(setAlbums(response.data));
    } catch (e) {
      console.log(e)
    }
  };
};

export const fetchTracks = () => {
  return async dispatch => {
    try {
      const response = await axios.get('http://localhost:8001/track');
      dispatch(setTracks(response.data));
    } catch (e) {
      console.log(e)
    }
  };
};


