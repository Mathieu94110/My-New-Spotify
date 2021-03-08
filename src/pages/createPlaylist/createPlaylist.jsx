import React, { Component } from "react";
import axios from "axios";
import "./createPlaylist.css"
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formisactiv: false,
      name: "",
      description: "",
    };
  }

  activateform = () => {
    this.setState({
      formisactiv: !this.state.formisactiv,
    });
  };
  handleChange = (e) => {
 
    this.setState({

      [e.target.name]: e.target.value,
      [e.target.description]: e.target.value,
    });
  };

  searchPlaylist = (e) => {

    e.preventDefault();
    let userId = localStorage.id;
    let access_token = localStorage.access_token;
    if (access_token && userId) {
      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };
      axios
        .post(
          "https://api.spotify.com/v1/users/" + userId + "/playlists",

          {
            name: this.state.name,
            description: this.state.description,
          },
          config
        )
        .then((res) => console.log(res));
    }
  };

  render() {
    console.log(this.state.name);
    console.log(this.state.description);
    return (
      <div className="createListContainer">
        <Button variant="outlined" color="primary" onClick={this.activateform} className="createList">
 Créer une playlist
</Button>
       
        {this.state.formisactiv && (
 <form className="createForm"  onSubmit={this.searchPlaylist}>
          <TextField  label="Nom"  name="name" variant="outlined" value={this.state.name} onChange={this.handleChange} className="textfield"/>
      <TextField label="Description" name="description" variant="outlined"  value={this.state.description}  onChange={this.handleChange} className="textfield"/>
            <Button type="submit" variant="outlined" color="primary"  className="createButton">
Valider
</Button>
    </form>

          
          
 
        )}
      </div>
    );
  }
}
