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





  deleteTrack = (index,music) => {
    console.log("Index " + index + " Id " + music.track.id + "  Uri " + music.track.uri)
    const track_id = music.track.id;
    const uri = music.track.uri;
let access_token = localStorage.access_token;
    const config = {
      headers: {
         Accept: "application/json",
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",

      },
      params: {
 "tracks": [
    {
      "uri": uri,
      "positions": [
        track_id
      ]
    },
  ]},
    };

    axios
      .delete(`https://api.spotify.com/v1/playlists/${track_id}/tracks`, config)
      .then((res) => {
        console.log(res)
        this.setState({
          musics: this.state.musics.filter(music => {
            return music.track !== track_id
          })
        });

      })
      .catch((error) => {
        // Error
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } if ( error.response && error.response.status >= 400){
      this.setState({
        isNotFound: true
      })
        }
        
        else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });


}







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
            return <div key={index}>{music.track.name}<button key={index} onClick={()=>(this.deleteTrack(index,music))}>X</button></div>;
          })}
        </ul>
      </div>
    );
  }
}
