import React from 'react';
import imageNotAvailable from '../../assets/images/not_available.png';
import './AlbumCard.css';
import {useDispatch, useSelector} from "react-redux";
import {deleteAlbum, publishAlbum} from "../../store/actions/AlbumsAction";
import {deleteTrack, publishTrack} from "../../store/actions/TracksAction";

const AlbumCard = (props) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user);

    const imgSrc = () => {
        if (props.file) {
            return 'http://localhost:8002/uploads/' + props.file;
        } else {
            return imageNotAvailable;
        }
    };

    const print = () => {
        if (user && user.role === 'admin') {
            return (
                <div>
                    <button onClick={() => dispatch(publishAlbum(props.id))} style={{'fontSize': '22px'}}>Publish</button>
                    <button onClick={() => dispatch(deleteAlbum(props.id))} style={{'fontSize': '22px'}}>Delete</button>
                </div>
            )
        } else return null
    }

    return (
        <div className="card">
            <div className="card-inner">
                <div className="img">
                    <img src={imgSrc()} alt="img"/>
                </div>
                <div className="card-container">
                    <p>{props.name}</p>
                    <p style={{'fontSize': '18px'}}>release: {props.release}</p>
                    <p style={{'fontSize': '18px'}}>author: {props.artist}</p>
                    <div className="additional-info">
                        <div onClick={() => props.history.push(`/tracks?album=${props.id}`)} className="buttons-card">More >>></div>
                        {print()}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AlbumCard;