import React, {useEffect, useState} from 'react';
import '../Register/Register.css';
import {useDispatch, useSelector} from "react-redux";
import {MenuItem, TextField} from "@material-ui/core";
import {postAlbum} from "../../store/actions/AlbumsAction";
import {fetchArtist} from "../../store/actions/ArtistsAction";

const AddAlbum = () => {
    const dispatch = useDispatch();

    const [album, setAlbum] = useState({
        name: '',
        artist: '',
        year: '',
        image: '',
    });

    useEffect(() => {
        dispatch(fetchArtist());
    }, [dispatch]);

    const artists = useSelector(state => state.artists.artists);

    const inputChangeHandler = e => {
        const {name, value} = e.target;

        setAlbum(prevState => ({...prevState, [name]: value}));
    };

    const fileChangeHandler = (e) => {
        const name = e.target.name;
        const file = e.target.files[0];

        setAlbum((prevState) => ({
            ...prevState,
            [name]: file,
        }));
    };

    const submitFormHandler = e => {
        e.preventDefault();

        const formData = new FormData();

        Object.keys(album).forEach((key) => {
            formData.append(key, album[key]);
        });

        dispatch(postAlbum(formData));
    };

    return (
        <div className="login">
            <h2>Add Album</h2>
            <form>
                <div>
                    <input defaultValue={album.name} onChange={inputChangeHandler} type="text"
                           placeholder="album name" name="name"/>
                    <input defaultValue={album.year} onChange={inputChangeHandler} type="text"
                           placeholder="year" name="year"/>
                    <input onChange={fileChangeHandler} type="file" name="image"/>
                </div>
                <TextField
                    required
                    fullWidth
                    select
                    variant={'outlined'}
                    name={'artist'}
                    style={{marginLeft: '27%'}}
                    value={album.artist}
                    onChange={inputChangeHandler}
                >
                    {artists.map((artist) => (
                        <MenuItem key={artist._id} value={artist._id}>
                            {artist.name}
                        </MenuItem>
                    ))}
                </TextField>
                <button onClick={submitFormHandler} type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AddAlbum;