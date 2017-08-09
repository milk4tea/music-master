import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './Profile';
import Gallery from './Gallery';

class App extends Component {
  token = null;
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      artist: null,
      tracks: []
    }
  }

  componentDidMount() {
    const url = window.location.href;
    if(url.indexOf('#') !== -1) {
      const params = url.split('#')[1].split('&');
      const accessToken = params[0].split('=')[1];
      localStorage.setItem('token', accessToken);
      this.token = accessToken;
    } else {
      const localToken = localStorage.getItem('token');
      // const AUTHORIZATION_URL = 'https://accounts.spotify.com/authorize?client_id=fbb7012b580e4d4fb437cffd16c3f3d3&response_type=token&redirect_uri=http://localhost:3000/index.html';
      if(localToken === null) {
        this.token = localToken;
      }

    }

  }


  search() {
    let headers = new Headers();
    headers.set('Authorization',  'Bearer ' +  this.token);
    const BASE_URL = "https://api.spotify.com/v1/search?";
    let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist`;
    const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
    fetch(FETCH_URL, {
      method: 'GET',
      headers: headers
    })
    .then(response => response.json())
    .then(json => {
      const artist = json.artists.items[0];
      this.setState({artist});

      FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`;
      fetch(FETCH_URL, {
        method: 'GET',
        headers: headers
      })
      .then(response => response.json())
      .then(json => {
        const { tracks } = json;
        this.setState({tracks});
      })
      .catch(error => console.log(error));
    })
    .catch(error => console.log(error));
  }

  render() {
    return(
      <div className="App">
        <div className="App-title">Music Master</div>
        {
          localStorage.getItem('token') === null
            ?
              <a href="https://accounts.spotify.com/authorize?client_id=fbb7012b580e4d4fb437cffd16c3f3d3&response_type=token&redirect_uri=http://localhost:3000/index.html">Authorize</a>
            :
          <FormGroup>
            <InputGroup>
              <FormControl
                type="text"
                placeholder="Search an artist..."
                value={this.state.query}
                onChange={event => {this.setState({query: event.target.value})}}
                onKeyPress={event => {
                  if(event.key === 'Enter') {
                    this.search()
                  }
                }}
              />
              <InputGroup.Addon onClick={() => this.search()}>
                <Glyphicon glyph="search"></Glyphicon>
              </InputGroup.Addon>
            </InputGroup>
          </FormGroup>
        }
        {
          this.state.artist !== null
            ?
              <div>
                <Profile
                  artist={this.state.artist}
                />
                <Gallery
                  tracks={this.state.tracks}
                />

              </div>
            : <div></div>
        }

      </div>
    );
  }
}

export default App;
