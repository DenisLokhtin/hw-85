import {toast} from "react-toastify";
import axiosApi from "../../axiosApi";
import {historyPush} from "./historyActions";

export const FETCH_ARTIST_SUCCESS = "FETCH_ARTIST_SUCCESS";

export const fetchArtistSuccess = artist => ({type: FETCH_ARTIST_SUCCESS, payload: artist});

export const fetchArtist = () => {
    return async (dispatch) => {
        try {
            const {data} = await axiosApi.get('/artists');
            dispatch(fetchArtistSuccess(data));
        } catch (e) {
            toast.error('unable to fetch artist');
            console.log(e);
        }
    }
};

export const postArtist = (artistData) => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token;

        if (token === null) {
            dispatch(historyPush('/login'));
            toast.warning("You should login!");
        }

        try {
            await axiosApi.post('/artists', artistData);
            dispatch(historyPush('/'));
            toast.success("Artist has been added!");
        } catch (e) {
            toast.error('unable to add artist');
            console.log(e);

        }
    }
};


export const toPublishArtist = (id) => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token;
        if (token === null) {
            toast.warning("You are not logged in");
        }
        try {
            await axiosApi.post(`/artists/${id}/publish`);
        } catch (e) {
            toast.error('unable to publish artist');
            console.log(e);
        }
    };
};

export const deleteArtist = (id) => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token;
        if (token === null) {
            toast.warning("You are not logged in");
        }
        try {
            await axiosApi.delete(`/artists/${id}`);
            dispatch(fetchArtist());
            toast.success('Artist was deleted');
        } catch (e) {
            toast.error('unable to delete artist');
            console.log(e);
        }
    }
};