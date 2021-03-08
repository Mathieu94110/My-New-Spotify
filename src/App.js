import React from "react";
import { Link, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Authenticate from "./pages/authentication/authentication";
import Home from "./pages/Home/Home";
import Playlist from "./pages/playlists/playlists";

function App() {
  return (
    <div className="app_container">
      <Router>
        <div className="app_page">
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/playlists" component={Playlist} />
            <Route path="/" component={Authenticate} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
