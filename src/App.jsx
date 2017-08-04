import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    }
  }

  authorize() {
    const BASE_URL = "https://accounts.spotify.com/authorize?";
    const CLIENT_ID = "e43af2886eae425caeaa7c5891197b2b"
    const AUTHORIZE_URL = `${BASE_URL}client_id=${CLIENT_ID}&response_type=code&redirect_uri=https://milk4tea.github.io/music-master-prod/`
    let headers = new Headers();

    const auth = fetch(AUTHORIZE_URL, {
      method: 'GET',
      headers: headers,
    })
    // .then(response => response.json())
    // .then(json => console.log('json', json))
    .then(response => console.log(response))
    .catch(error => console.log('error', error));
    console.log(auth);
  }

  search() {
    this.authorize();
    const BASE_URL = "https://api.spotify.com/v1/search?";
    const FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;

    // fetch(FETCH_URL, {
    //   method: 'GET'
    // })
    // .then(response => response.json())
    // .then(json => console.log('json', json));
  }

  render() {
    return(
      <div className="App">
        <div className="App-title">Music Master</div>
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
        <div className="Profile">
          <div>Artist Picture</div>
          <div>Artist Name</div>
        </div>
        <div className="Gallery">
          Gallery
        </div>
      </div>
    );
  }
}

export default App;
