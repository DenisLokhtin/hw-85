import React from 'react';
import {useDispatch} from "react-redux";
import {logoutUser} from "../../../store/actions/UsersAction";
import {APIURL} from "../../../config";

const UserMenu = ({user}) => {
    const dispatch = useDispatch();

    let cardImage;

    if (user.avatarImage) {
        if (user.avatarImage.indexOf("fixtures") === 0 || user.avatarImage.indexOf("uploads") === 0) {
            cardImage = APIURL + "/" + user.avatarImage;
        } else {
            cardImage = user.avatarImage;
        }
    }

    return (
        <>
            <a href={'/add_artist'} style={{marginRight: '15px'}}>Add artist</a>
            <a href={'/add_album'} style={{marginRight: '15px'}}>Add album</a>
            <a href={'/add_track'} style={{marginRight: '15px'}}>Add track</a>
            <a href={'/track_history'} style={{marginRight: '15px'}}>Track History</a>
            Hello, {user.displayName}!
            <img alt={user.displayName} src={cardImage} style={{marginLeft: '10px', width: '30px', marginRight: '15px', borderRadius: '50%', border: '1px solid black'}}/>
            <a href={'/'} onClick={() => dispatch(logoutUser())}>Logout</a>
        </>
    );
};

export default UserMenu;