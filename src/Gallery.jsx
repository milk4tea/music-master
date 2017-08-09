import React, { Component } from 'react';
import './App.css';

class  Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playingAudio: '',
      audio: null,
      playing: false
    }
  }

  playAudio(audioId) {
    var audio = document.getElementById(audioId);
    if(!this.state.playing) {
      audio.play();
      this.setState({
        playingAudio: audioId,
        audio: audio,
        playing: true
      })
    } else {
      if(this.state.playingAudio === audioId) {
        this.state.audio.pause();
        this.setState({
          playing: false
        })
      } else {
        this.state.audio.pause();
        audio.play();
        this.setState({
          playing: true,
          playingAudio: audioId,
          audio: audio
        })
      }
    }

  }

  render() {
    const { tracks } = this.props;
    return (
      <div className="gallery">
        {tracks.map((track, k) => {
          const trackImg = track.album.images[0].url;
          const audioId = 'audio-' + k;
          return (
            <div
              key={k}
              className="track"
              onClick={() => this.playAudio(audioId)}
            >
              <img
                src={trackImg}
                alt="track"
                className="track-img"
              />
              <div className="track-play">
                <div className="track-play-inner">
                  {
                    this.state.playAudio === audioId
                      ? <span>| |</span>
                      : <span>&#9654;</span>
                  }
                </div>
              </div>
              <audio src={track.preview_url} key={k} id={audioId}></audio>
              <p className="track-text">
                {track.name}
              </p>
            </div>

          )
        })}
      </div>
    );
  }
}

export default Gallery;
