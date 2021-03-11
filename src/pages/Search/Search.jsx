import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import "./Search.css";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchactivated: false,
      input: "",
      tracks: [],
      album: [],
      artist: [],
    };
  }
  handleChange = (e) => {
    this.setState({
      input: e.target.value,
    });
  };
  addTracks = () => {
    this.setState({ searchactivated: true });
    let access_token = localStorage.access_token;
    let config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      params: {
        q: this.state.input,
        type: "artist,album,track",
      },
    };
    axios.get("https://api.spotify.com/v1/search", config).then((res) => {
      console.log(res.data);
      this.setState({
        tracks: res.data.tracks.items,
        album: res.data.albums.items,
        artist: res.data.artists.items,
      });
    });
  };

  render() {
    return (
      <>
        {this.state.searchactivated && this.state.input !== "" && this.state.tracks.length > 2 ? (
          <div className="globalSearchContainer">
        
        
        
        
        
        <div className="searchContainer">
        <Button variant="outlined" color="primary" onClick={this.addTracks}>
          Rechercher
        </Button>

        <TextField
          id="outlined-basic"
          label="Album, Titre ou Artiste "
          value={this.state.search}
          onChange={this.handleChange}
          className="searchTextField"
        />
        </div>
        
          <div className="searchedColumns">
          <div
          className="searchCategories"
     
          >
            <h2>Titres</h2>
            {this.state.tracks.map((track, index) => {
              return (
                <List>
                  <ul>
                    <ListItem textAlign="center" key={index}>
                      <ListItemText primary={track.name}></ListItemText>
                    </ListItem>
                  </ul>
                </List>
              );
            })}
          </div>
          <div

className="searchCategories"

        
          >
            <h2>Artistes</h2>
            {this.state.artist.map((artist, index) => {
              return (
                <List>
                  <ul>
                    <ListItem textAlign="center" key={index}>
                      <ListItemText primary={artist.name}></ListItemText>
                    </ListItem>
                  </ul>
                </List>
              );
            })}
          </div>
          <div
className="searchCategories"

         
          >
            <h2>Album</h2>
            {this.state.album.map((album, index) => {
              return (
                <List>
                  <ul>
                    <ListItem textAlign="center" key={index} >
                      <ListItemAvatar>
                        <Avatar src={album.images[2].url} />
                      </ListItemAvatar>
                      <ListItemText primary={album.name}></ListItemText>
                    </ListItem>
                  </ul>
                </List>
              );
            })}
            </div>
            </div>
          </div>
        ) :    (<div className="searchContainer">
        <Button variant="outlined" color="primary" onClick={this.addTracks} className="homePageSearchButton">
          Rechercher
        </Button>

        <TextField
          id="outlined-basic"
          label="Album, Titre ou Artiste "
          value={this.state.search}
          onChange={this.handleChange}
             className="searchTextField"
        />
        </div>)
        

}
    </>
   
    );
  }
      
}
