import React, { Component } from "react";
import axios from "axios";
import './authentication.css';
import logo from "../../images/logo_spotify.png";

export default class authentication extends Component {
  componentDidMount() {
    let hash = this.props.location.hash;
    let access_token = hash.split("access_token=").pop().split("&")[0];
    localStorage.access_token = access_token;
    if (access_token.length > 0) {
      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };
      axios.get("https://api.spotify.com/v1/me", config).then((res) => {
        let identifiant = res.data.id;
        localStorage.id = identifiant;
      });
      setTimeout(() => this.props.history.push("/home"), 1000);
    } else {
    }
  }
  render() {
    return (
      <div className="auth_page" >

        
          <div className="auth_text">
          <h1>Authentification</h1>
        <div>
          <a href="https://accounts.spotify.com/authorize?response_type=token&scope=playlist-modify-public playlist-modify-private&client_id=de2017d063ae4b7d87f7d52b9d8c7d31&redirect_uri=http://localhost:3000/auth">
            Se connecter
          </a>
            </div>
        </div>
        <div className="auth_image_container">
          <div className="auth_image">
            <div className="auth_image_content">
              <img src={logo} alt="Logo spotify" className="logo_spotify" />
              <div className="text_spotify">Spotify</div>
            </div>
</div>
          </div>
        </div>

    
    );
  }
}
