import React, { Component } from "react";
import axios from "axios";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import "./newPlaylist.css";
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { isWidthDown } from "@material-ui/core";
export default class newPlaylist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchActivated: false,
      tracks: [],
      search: "",
      playListId: null,
      currentPage: 1,
      offset: 0,
      disabled: false,
      next: "",
      isNotFound:false,
    };

  }
  handleChange = (e) => {
    this.setState({
      search: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    let access_token = localStorage.access_token;
    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      params: {
        q: this.state.search,
        type: "track",
             offset: this.state.offset,
        limit: 50,
   
      },
    };

    axios
      .get("https://api.spotify.com/v1/search", config)
      .then((res) => {
        console.log(res)
        this.setState({
          tracks: [...res.data.tracks.items],
          next: res.data.tracks.next,
          offset: this.state.offset 
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


  changeTracksOffsetPrev = (e) => {
    if (this.state.offset === 0) {
      return
    } else {
       this.setState({
              offset: this.state.offset -= 50
            })
    }
   
    this.handleSubmit(e);

}
  changeTracksOffsetNext = (e) => {
    console.log("NEXT : " + this.state.next)
    if (this.state.isNotFound) {
      return


    }
    this.setState({
              offset: this.state.offset += 50
            })
    this.handleSubmit(e);

}

 
  render() {
    console.log(this.state.offset)


    return (
      <div className="newPlaylistPage">
        <form className="searchForMyPlaylist" onSubmit={this.handleSubmit}>
          <label className="spaceItemAndInput">
            <span className="spaceItemAndInput_Item" >Musique :</span>
            <input type="text" onChange={this.handleChange} />
          </label>
          <input type="submit" value="Rechercher" />
        </form>


       {this.state.tracks.length > 2 && (<div className="tracksList">
          {this.state.tracks.map((track, index) => {
            return (
              <div key={index} className="tracks">
                <List
                  component="nav"
                  aria-label="main mailbox folders"
                  style={{ maxHeight: "200px", overflowY: "auto" }}
                >
                
                  <ListItem>
                    <div style={{display:"block"}}>
                    <ListItemText primary={"Titre :" + " " + track.name} />
                    <ListItemText primary={"Artiste(s) :" + " " + track.artists[0].name} />
</div>
                <ListItemAvatar>
          <Avatar alt={track.album.name} src={track.album.images[2].url} />
        </ListItemAvatar>    
                
               
                 <div style={{right:"5px"}}><button onClick={() => this.addTrack(track)}>+</button></div>       
                      </ListItem>
                
                </List>
              </div>
            );
          }
          
          
          )}
          <div className="buttons_container">
            <button onClick={this.changeTracksOffsetPrev} disabled={this.state.offset == 0 ? true : false} className="prev" >Précédent</button>

            <button onClick={this.changeTracksOffsetNext} disabled={this.state.isNotFound } className="next" >Suivant</button>
          
            </div>
        </div>
       )
        }
      </div>
    );
  }
}
