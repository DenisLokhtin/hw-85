import {Route, Switch} from "react-router-dom";
import Main from "./containers/Main/Main";
import Albums from "./containers/Albums/Albums";
import Header from "./components/Header/Header";
import React from "react";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import './App.css'
import AddArtist from "./containers/AddArtist/AddArtist";
import AddAlbum from "./containers/AddAlbum/AddAlbum";
import AddTrack from "./containers/AddTrack/AddTrack";
import Tracks from "./containers/Tracks/Tracks";
import TrackHistory from "./containers/TrackHistory/TrackHistory";

const App = (props) => {
    return (
        <div>
            <Header/>
            <div className="container">
                <div className="container-inner">
                    <Switch>
                        <Route path="/" exact component={Main}/>
                        <Route path="/albums" component={Albums}/>
                        <Route path="/tracks" component={Tracks}/>
                        <Route path="/track_history" component={TrackHistory}/>
                        <Route path="/add_artist" component={AddArtist}/>
                        <Route path="/add_album" component={AddAlbum}/>
                        <Route path="/add_track" component={AddTrack}/>
                        <Route path="/register" exact component={Register}/>
                        <Route path="/login" exact component={Login}/>
                    </Switch>
                </div>
            </div>
        </div>
    )
};

export default App;