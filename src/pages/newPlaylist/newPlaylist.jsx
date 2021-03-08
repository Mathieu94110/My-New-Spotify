import React, { Component } from "react";
import axios from "axios";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

export default class newPlaylist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchActivated: false,
      tracks: [],
      search: "",
      playListId: null,
    };
  }
  handleChange = (e) => {
    this.setState({
      search: e.target.value,
    });
  };
  handleSubmit = () => {
    let access_token = localStorage.access_token;
    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      params: {
        q: this.state.search,
        type: "track",
        limit: 50,
      },
    };

    axios
      .get("https://api.spotify.com/v1/search", config)
      .then((res) => {
        this.setState({
          tracks: res.data.tracks.items,
        });
      })
      .catch((error) => {
        // Error
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
  };

  addTrack = (track) => {
    let access_token = localStorage.access_token;
    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      params: {
        uris: track.uri,
      },
    };

    axios
      .post(
        "https://api.spotify.com/v1/playlists/" +
          this.props.playListId +
          "/tracks",
        {},
        config
      )
      .then((res) => {
        console.log(res);
        this.props.refresh();
      });
  };
  render() {
    return (
      <div>
        <form>
          <label>
            Musique:
            <input type="text" onChange={this.handleChange} />
          </label>
          <input type="submit" value="Rechercher" onClick={this.handleSubmit} />
        </form>
        <div>
          {this.state.tracks.map((track, index) => {
            return (
              <div key={index}>
                {track.name}
                <button onClick={() => this.addTrack(track)}>X</button>
                <List
                  component="nav"
                  aria-label="main mailbox folders"
                  style={{ maxHeight: "200px", overflowY: "auto" }}
                >
                  {this.state.tracks.map((track, index) => {
                    return (
                      <ListItem>
                        <ListItemText primary={track.name} />
                        <button onClick={() => this.addTrack(track)}>+</button>
                      </ListItem>
                    );
                  })}
                </List>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
