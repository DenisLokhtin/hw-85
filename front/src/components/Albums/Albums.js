import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchAlbums} from "../../store/actions/Actions";
import './Albums.css'

const Albums = (props) => {
    // const dispatch = useDispatch();
    // const Albums = useSelector(state => state.Albums);
    // const comments = useSelector(state => state.comments);
    //
    // const id = window.location.pathname.slice(-1);
    //
    // useEffect(() => {
    //     dispatch(fetchCurrentNews(id));
    //     dispatch(fetchComments(id))
    // }, []);
    //
    // const toMain = () => {
    //     return props.history.push('/')
    // }

    return (
        <div>
            <h1>Albums</h1>
        </div>
    )
};

export default Albums
