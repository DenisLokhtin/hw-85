import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchAlbums} from "../../store/actions/AlbumsAction";
import './Albums.css'
import AlbumCard from "../../components/AlbumCard/AlbumCard";


const Albums = (props) => {
    const dispatch = useDispatch();
    const albums = useSelector(state => state.albums.albums);
    const user = useSelector(state => state.users.user);


    useEffect(() => {
        dispatch(fetchAlbums(props.location.search));
    }, [dispatch, props.location.search]);

    return (
        <div>
            <h2>Albums</h2>
            {albums.map(albums => (
                albums?.published === true || user?.role === 'admin' ?
                    <AlbumCard
                        key={albums._id}
                        file={albums.file}
                        name={albums.name}
                        release={albums.release}
                        artist={albums.artist.name}
                        history={props.history}
                        id={albums._id}
                    /> : null
            ))}
        </div>
    )
};

export default Albums
