import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchAlbums} from "../../store/actions/Actions";
import './Albums.css'
import AlbumCard from "../AlbumCard/AlbumCard";

const Albums = (props) => {
    const dispatch = useDispatch();
    const albums = useSelector(state => state.Albums);

    useEffect(() => {
        dispatch(fetchAlbums());
    }, [dispatch]);

    const toMain = () => {
        return props.history.push('/')
    }

    const  printAlbums = () => {
        if (albums) {
            return albums.map(albums => {
                return (
                    <AlbumCard
                        key={albums._id}
                        file={albums.file}
                        title={albums.title}
                        release={albums.release}
                        history={props.history}
                        id={albums._id}
                    />
                )
            })
        }
    };

    return (
        <div>
            <h1>Albums</h1>
            {printAlbums()}
            <button onClick={toMain}>To main page</button>
        </div>
    )
};

export default Albums
