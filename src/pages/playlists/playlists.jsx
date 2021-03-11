import React, { Component } from "react";
import axios from "axios";
import queryString from "query-string";
import "./playlists.css";
import NewPlaylist from "../newPlaylist/newPlaylist";

export default class Playlists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      musics: [],
      artist: "",
      playListId: null,
    };
  }
  componentDidMount() {
    this.refresh();
  }
  refresh = () => {
    let access_token = localStorage.access_token;
    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };
    const params = queryString.parse(this.props.location.search);
    this.setState({
      playListId: params.id,
      artist: params.artist,
    }); // on récupère les paramètres se trouvant dans l'url
    console.log("PARAMS", params);
    axios
      .get(
        "https://api.spotify.com/v1/playlists/" + params.id + "/tracks",
        config
      )
      .then((res) => {
        this.setState({
          musics: res.data.items,
        });
        console.log(this.state.musics);
      });
  };
  render() {
    return (
      <div className="playListPage">
        <NewPlaylist
          playListId={this.state.playListId}
          refresh={this.refresh}
        />
        <h1 className='playlistTitle'>Contenu de la playlist {this.state.artist}</h1>
        <ul>
          {this.state.musics.map((music, index) => {
            return <div key={index}>{music.track.name}</div>;
          })}
        </ul>
      </div>
    );
  }
}
