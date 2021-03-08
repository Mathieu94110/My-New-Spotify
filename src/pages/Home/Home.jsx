import React, { Component } from "react";
import axios from "axios";

import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import { CardMedia } from "@material-ui/core";
import { Button } from "@material-ui/core";
import CreatingPLaylist from "../createPlaylist/createPlaylist";
import Search from "../Search/Search";
import "./Home.css";




export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: [],
    };
  }
  componentDidMount() {
    let access_token = localStorage.access_token;
    let userId = localStorage.id;

    if (access_token && userId) {
      let config = {
        headers: { Authorization: `Bearer ${access_token}` },
      };
      axios
        .get(
          "https://api.spotify.com/v1/users/" + userId + "/playlists",
          config
        )
        .then((res) => {
          console.log(res.data.items);
          this.setState({
            playlists: res.data.items,
          });
        });
    } else {//on retourne vers la page d'accueil
      this.props.history.push("/auth");
    }
  }

  render() {
    return (
      <div className="home_page">
        <h1 className="home_title">Bienvenue sur votre plateforme Spotify !</h1>
      <div className="home_content">
          <div className="createPlaylistAndAlbums_list">
           <div className="create_list"> <CreatingPLaylist/></div>

            <div className="albums_list">
         
          {this.state.playlists.map((playlist, index) => {
            return (
              <Card key={index} style={{ margin: "5px" }}>
                <CardActionArea>
                  {playlist.images[0] && (
                    <CardMedia
                      image={playlist.images[0].url}
                      style={{ height: "200px" }}
                    />
                  )}

                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {playlist.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() =>
                      (window.location =
                        "/playlists?id=" +
                        playlist.id +
                        "&artist=" +
                        playlist.name)
                    }
                  >
                    Voir les titres
                  </Button>
                </CardActions>
              </Card>
            );
          })}
        </div>

      </div>
        

<div className="searchPlaylist">
    

          
              <Search />
      
   
          </div>
          </div>
      </div>
    );
  }
}
