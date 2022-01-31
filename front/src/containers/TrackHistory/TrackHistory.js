import {Card, CardHeader, Container, Grid, Typography} from "@material-ui/core";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchTrackHistory} from "../../store/actions/TracksHistoryAction";
import TrackCard from "../../components/TrackCard/TrackCard";

const TrackHistory = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTrackHistory());
    }, [dispatch]);

    const trackHistory = useSelector(state => state.tracksHistory.trackHistory);

    return (
        <div>
            <h2>Tracks</h2>
            {trackHistory.map(tracks => (
                    <div key={tracks._id}>
                        d
                    </div>
            ))}
        </div>
    );
};

export default TrackHistory;