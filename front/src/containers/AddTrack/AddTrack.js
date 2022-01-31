import React, {useEffect, useState} from 'react';
import '../Register/Register.css';
import {MenuItem, TextField} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {postArtist} from "../../store/actions/ArtistsAction";
import {fetchAlbums} from "../../store/actions/AlbumsAction";
import {postTrack} from "../../store/actions/TracksAction";

const AddTrack = (props) => {
    const dispatch = useDispatch();

    const [track, setTrack] = useState({
        name: '',
        album: '',
        duration: '',
        number: '',
    });

    const inputChangeHandler = e => {
        const {name, value} = e.target;

        setTrack(prevState => ({...prevState, [name]: value}))
    };

    useEffect(() => {
        dispatch(fetchAlbums(props.location.search));
    }, [dispatch, props.location.search]);

    const album = useSelector(state => state.albums.albums);

    const submitFormHandler = e => {
        e.preventDefault();

        dispatch(postTrack(track));
    };

    return (
        <div className="login">
            <h2>Add Track</h2>
            <form>
                <div>
                    <input defaultValue={track.name} onChange={inputChangeHandler} type="text"
                           placeholder="Track name" name="name"/>
                    <input defaultValue={track.duration} onChange={inputChangeHandler} type="text"
                           placeholder="duration" name="duration"/>
                    <input defaultValue={track.number} onChange={inputChangeHandler} type="text"
                           placeholder="number" name="number"/>
                </div>
                <TextField
                    type='text'
                    required
                    fullWidth
                    select
                    variant={'outlined'}
                    name={'album'}
                    style={{marginLeft: '27%'}}
                    value={track.album}
                    onChange={inputChangeHandler}
                >
                    {album.map((album) => (
                        <MenuItem key={album._id} value={album._id}>
                            {album.name}
                        </MenuItem>
                    ))}
                </TextField>
                <button onClick={submitFormHandler} type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AddTrack;