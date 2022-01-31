import axiosApi from "../../axiosApi";
import {historyPush} from "./historyActions";
import {toast} from "react-toastify";

export const FETCH_ALBUM_SUCCESS = 'FETCH_ALBUM_SUCCESS';

export const fetchAlbumSuccess = album => ({type: FETCH_ALBUM_SUCCESS, payload: album});

export const fetchAlbums = (_id) => {
    return async (dispatch) => {
        let url = '/albums';

        if (url) {
            url += _id
        }

        try {
            const {data} = await axiosApi.get(url);
            dispatch(fetchAlbumSuccess(data));
        } catch (e) {
            toast.error("album cannot be fetch!");
            console.log(e);
        }
    }
};

export const postAlbum = (albumData) => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token;

        if (token === null) {
            dispatch(historyPush('/login'));
            toast.warning("You should login!");
        }

        try {
            await axiosApi.post('/albums', albumData);
            dispatch(historyPush('/'));
            toast.success("Album has been added!");
        } catch (e) {
            toast.error("album cannot be added!");
            console.log(e);
        }
    }
};

export const publishAlbum = (id) => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token;
        if (token === null) {
            toast.warning("You are not logged in");
        }
        try {
            await axiosApi.post(`/albums/${id}/publish`);
            toast.success("Album has been published!");
        } catch (e) {
            toast.error("album cannot be published!");
            console.log(e);
        }
    };
};

export const deleteAlbum = (id, location) => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token;
        if (token === null) {
            toast.warning('You are not logged in');
        }
        try {
            await axiosApi.delete(`/albums/${id}`);
            dispatch(fetchAlbums(location));
            toast.success('Album was deleted');
        } catch (e) {
            toast.error("album cannot be deleted!");
            console.log(e);
        }
    }
};