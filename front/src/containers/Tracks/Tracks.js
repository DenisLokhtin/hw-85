import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import '../Albums/Albums.css'
import {fetchTracks} from "../../store/actions/TracksAction";
import TrackCard from "../../components/TrackCard/TrackCard";

const Tracks = (props) => {
    const dispatch = useDispatch();
    const tracks = useSelector(state => state.tracks.tracks);
    const user = useSelector(state => state.users.user);


    useEffect(() => {
        dispatch(fetchTracks(props.location.search));
    }, [dispatch, props.location.search]);

    return (
        <div>
            <h2>Tracks</h2>
            {tracks.map(tracks => (
                tracks?.published === true || user?.role === 'admin' ?
                    <TrackCard
                        key={tracks._id}
                        name={tracks.name}
                        duration={tracks.duration}
                        number={tracks.number}
                        history={props.history}
                        id={tracks._id}
                    /> : null
            ))}
        </div>
    )
};

export default Tracks;