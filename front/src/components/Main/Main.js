import React, {useEffect} from 'react';
import ArtistCard from "../ArtistCard/ArtistCard";
import {useDispatch, useSelector} from "react-redux";
import {fetchArtist} from "../../store/actions/Actions";
import './Main.css'


const Main = (props) => {
    const dispatch = useDispatch();
    const artist = useSelector(state => state.artist);

    useEffect(() => {
        dispatch(fetchArtist())
    }, [dispatch])

    const  printArtist = () => {
        if (artist) {
            return artist.map(artist => {
                return (
                    <ArtistCard
                        key={artist._id}
                        file={artist.file}
                        title={artist.title}
                        history={props.history}
                        id={artist._id}
                    />
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