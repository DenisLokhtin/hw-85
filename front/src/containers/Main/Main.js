import React, {useEffect} from 'react';
import ArtistCard from "../../components/ArtistCard/ArtistCard";
import {useDispatch, useSelector} from "react-redux";
import {fetchArtist} from "../../store/actions/ArtistsAction";
import './Main.css'


const Main = (props) => {
    const dispatch = useDispatch();
    const artist = useSelector(state => state.artists.artists);
    const user = useSelector(state => state.users.user);

    useEffect(() => {
        dispatch(fetchArtist())
    }, [dispatch, props.location.search]);

    const printArtist = () => {
        if (artist) {
            return artist.map(artist => {
                return (
                    artist?.published === true || user?.role === 'admin' ?
                        <ArtistCard
                            key={artist._id}
                            file={artist.image}
                            title={artist.name}
                            history={props.history}
                            description={artist.description}
                            id={artist._id}
                        /> : null
                )
            })
        }
    };

    return (
        <div>
            <div className="main-header">
                <h2>Artist</h2>
            </div>
            <div>
                {printArtist()}
            </div>
        </div>
    )
};

export default Main;