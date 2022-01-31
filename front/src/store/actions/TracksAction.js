import axiosApi from "../../axiosApi";
import {toast} from "react-toastify";
import {historyPush} from "./historyActions";

export const FETCH_TRACK_SUCCESS = 'FETCH_TRACK_SUCCESS';

export const fetchTrackSuccess = (track) => ({type: FETCH_TRACK_SUCCESS, payload: track});

export const fetchTracks = (_id) => {
    return async (dispatch) => {
        let url = '/tracks';

        if (url) {
            url += _id
        }

        try {
            const {data} = await axiosApi.get(url);
            dispatch(fetchTrackSuccess(data));
        } catch (e) {
            toast.error('unable to fetch tracks');
            console.log(e);
        }
    }
};

export const postTrack = (trackData) => {
    console.log(trackData)
    return async (dispatch) => {
        try {
            await axiosApi.post('/tracks', trackData);
            toast.success('Track has been created');
            dispatch(historyPush('/'));
        } catch (e) {
            toast.error('unable to add track');
            console.log(e);
        }
    }
};

export const deleteTrack = (id, location) => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token;
        if (token === null) {
            toast.warning('You are not logged in');
        }
        try {
            await axiosApi.delete(`/tracks/${id}`);
            dispatch(fetchTracks(location));
            toast.success('Track was deleted');
        } catch (e) {
            toast.error('unable to delete track');
            console.log(e);
        }
    }
};

export const publishTrack = (id) => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token;
        if (token === null) {
            toast.warning("You are not logged in");
        }
        try {
            await axiosApi.post(`/tracks/${id}/publish`);
        } catch (e) {
            toast.error('unable to publish track');
            console.log(e);
        }
    }
};
