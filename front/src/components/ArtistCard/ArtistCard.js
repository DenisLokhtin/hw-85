import React from 'react';
import imageNotAvailable from '../../assets/images/not_available.png';
import './ArtistCard.css';
import {useDispatch, useSelector} from "react-redux";
import {deleteArtist, toPublishArtist} from "../../store/actions/ArtistsAction";

const ArtistCard = (props) => {
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
                    <button onClick={() => dispatch(toPublishArtist(props.id))} style={{'fontSize': '22px'}}>Publish</button>
                    <button onClick={() => dispatch(deleteArtist(props.id))} style={{'fontSize': '22px'}}>Delete</button>
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
                    <p>{props.title}</p>
                    <p style={{'fontSize': '16px'}}>{props.description}</p>
                    <div className="additional-info">
                        <div onClick={() => props.history.push(`/albums?artist=${props.id}`)} className="buttons-card">More >>></div>
                        {print()}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ArtistCard;