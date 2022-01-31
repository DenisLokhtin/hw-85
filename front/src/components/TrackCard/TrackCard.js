import React from 'react';
import '../AlbumCard/AlbumCard.css';
import {useDispatch, useSelector} from "react-redux";
import {deleteTrack, publishTrack} from "../../store/actions/TracksAction";
import {deleteArtist, toPublishArtist} from "../../store/actions/ArtistsAction";
import {postTrackHistory} from "../../store/actions/TracksHistoryAction";

const TrackCard = (props) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user);

    const add = () => {
        dispatch(postTrackHistory(props.id))
    };

    const print = () => {
        if (user && user.role === 'admin') {
            return (
                <div>
                    <button onClick={() => dispatch(publishTrack(props.id))} style={{'fontSize': '22px'}}>Publish</button>
                    <button onClick={() => dispatch(deleteTrack(props.id))} style={{'fontSize': '22px'}}>Delete</button>
                </div>
            )
        } else return null
    }

    return (
        <div className="card">
            <div className="card-inner">
                <div className="card-container">
                    <p>{props.name}</p>
                    <p style={{'fontSize': '18px'}}>duration: {props.duration}</p>
                    <p style={{'fontSize': '18px'}}>number: {props.number}</p>
                </div>
                <div className="additional-info">
                    <div onClick={add} className="buttons-card">Add to history</div>
                    {print()}
                </div>
            </div>
        </div>
    )
};

export default TrackCard;