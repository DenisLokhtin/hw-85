import {historyPush} from "./historyActions";
import axiosApi from "../../axiosApi";
import {toast} from "react-toastify";

export const FETCH_TRACK_HISTORY_SUCCESS = "FETCH_TRACK_HISTORY_SUCCESS";

export const fetchTrackHistorySuccess = (trackHistory) => ({type: FETCH_TRACK_HISTORY_SUCCESS, payload: trackHistory,});

export const postTrackHistory = (id) => {
    return async (dispatch, getState) => {
        const user = getState().users.user;
        if (user === null) {
            dispatch(historyPush("/login"));
        } else {
            try {
                await axiosApi.post("/track_history", {track: id});
            } catch (e) {
                toast.error('unable to add track history');
                console.log(e);
            }
        }
    };
};

export const fetchTrackHistory = () => {
    return async (dispatch, getState) => {
        const user = getState().users.user;
        if (user === null) {
            dispatch(historyPush("/login"));
        } else {
            try {
                const response = await axiosApi.get("/track_history");
                dispatch(fetchTrackHistorySuccess(response.data));
            } catch (e) {
                toast.error('unable to fetch track history');
                console.log(e);
            }
        }
    };
};
