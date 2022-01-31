import React, {useState} from 'react';
import '../Register/Register.css';
import {useDispatch} from "react-redux";
import {postArtist} from "../../store/actions/ArtistsAction";

const AddArtist = () => {
    const dispatch = useDispatch();

    const [artist, setArtist] = useState({
        name: '',
        description: '',
        image: '',
    });

    const inputChangeHandler = e => {
        const {name, value} = e.target;

        setArtist(prevState => ({...prevState, [name]: value}))
    };

    const fileChangeHandler = (e) => {
        const name = e.target.name;
        const file = e.target.files[0];

        setArtist((prevState) => ({
            ...prevState,
            [name]: file,
        }));
    };

    const submitFormHandler = e => {
        e.preventDefault();

        const formData = new FormData();

        Object.keys(artist).forEach((key) => {
            formData.append(key, artist[key]);
        });

        dispatch(postArtist(formData));
    };

    return (
        <div className="login">
            <h2>Add Artist</h2>
            <form>
                <div>
                    <input defaultValue={artist.name} onChange={inputChangeHandler} type="text"
                           placeholder="Artist name" name="name"/>
                    <input defaultValue={artist.description} onChange={inputChangeHandler} type="text"
                           placeholder="description" name="description"/>
                    <input onChange={fileChangeHandler} type="file" name="image"/>
                </div>
                <button onClick={submitFormHandler} type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AddArtist;