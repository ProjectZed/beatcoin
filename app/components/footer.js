import React from 'react';

export default class Footer extends React.Component {
  state = {
      active: this.props.songs[0],
      current: 0,
      progress: 0,
      random: false,
      repeat: false,
      mute: false,
      play: this.props.autoplay || false,
      songs: this.props.songs
  }

  componentDidMount = () => {
      let playerElement = this.refs.player;
      playerElement.addEventListener('timeupdate', this.updateProgress);
      playerElement.addEventListener('ended', this.end);
      playerElement.addEventListener('error', this.next);
  }

  componentWillUnmount = () => {
      let playerElement = this.refs.player;
      playerElement.removeEventListener('timeupdate', this.updateProgress);
      playerElement.removeEventListener('ended', this.end);
      playerElement.removeEventListener('error', this.next);
  }

  setProgress = (e) => {
      let target = e.target.nodeName === 'SPAN' ? e.target.parentNode : e.target;
      let width = "500px";
      let rect = target.getBoundingClientRect();
      let offsetX = e.clientX - rect.left;
      let duration = this.refs.player.duration;
      let currentTime = (duration * offsetX) / width;
      let progress = (currentTime * 100) / duration;

      this.refs.player.currentTime = currentTime;
      this.setState({ progress: progress });
      this.play();
  }

  updateProgress = () => {
      let duration = this.refs.player.duration;
      let currentTime = this.refs.player.currentTime;
      let progress = (currentTime * 100) / duration;

      this.setState({ progress: progress });
  }

  play = () => {
      this.setState({ play: true });
      this.refs.player.play();
  }

  pause = () => {
      this.setState({ play: false });
      this.refs.player.pause();
  }

  toggle = () => {
      this.state.play ? this.pause() : this.play();
  }

  end = () => {
      (this.state.repeat) ? this.play() : this.setState({ play: false });
  }

  next = () => {
      var total = this.state.songs.length;
      var current = (this.state.repeat) ? this.state.current : (this.state.current < total - 1) ? this.state.current + 1 : 0;
      var active = this.state.songs[current];

      this.setState({ current: current, active: active, progress: 0 });

      this.refs.player.src = active.url;
      this.play();
  }

  previous = () => {
      var total = this.state.songs.length;
      var current = (this.state.current > 0) ? this.state.current - 1 : total - 1;
      var active = this.state.songs[current];

      this.setState({ current: current, active: active, progress: 0 });

      this.refs.player.src = active.url;
      this.play();
  }

  randomize = () => {
      var s = shuffle(this.state.songs.slice());

      this.setState({ songs: (!this.state.random) ? s : this.state.songs, random: !this.state.random });
  }

  repeat = () => {
      this.setState({ repeat: !this.state.repeat });
  }

  toggleMute = () => {
      let mute = this.state.mute;

      this.setState({ mute: !this.state.mute });
      this.refs.player.volume = (mute) ? 1 : 0;
}
    render() {
      const { active, play, progress } = this.state;
      let coverClass = classnames('song-pic', {'no-height': !!!active.cover });
      let playPauseClass = classnames('fa', {'fa-pause': play}, {'fa-play': !play});
      let volumeClass = classnames('btn btn-defaultm navbar-btn fa', {'fa-volume-up': !this.state.mute}, {'fa-volume-off': this.state.mute});
      let repeatClass = classnames('btn', 'btn-default', 'navbar-btn', {'active': this.state.repeat});
      let randomClass = classnames('player-btn small random', {'active': this.state.random });
        return (
          <nav className="navbar navbar-fixed-bottom navbar-default">
            <div className="container">
              <audio src={active.url} autoPlay={this.state.play} preload="auto" ref="player"></audio>
              <div className="navbar navbar-static-top">
              <div className="navbar-left">
                  <div className="btn-group" role="group">
                    <button onClick={this.previous} type="button" className="btn btn-default navbar-btn" title="Previous Song">
                      <i className="fa fa-backward" />
                    </button>
                    <button onClick={this.toggle} type="button" className="btn btn-default navbar-btn" title="Play/Pause">
                      <i className={playPauseClass} />
                    </button>
                    <button onClick={this.next} type="button" className="btn btn-default navbar-btn" title="Next Song">
                      <i className="fa fa-forward" />
                    </button>
                  </div>
                </div>
            <div className="navbar-inner" style={{display: "inline-block"}}>
            <div className="player-progress-container" onClick={this.setProgress}>
              <span className="player-progress-value" style={{width: progress + '%'}}></span>
            </div>
            <button onClick={this.repeat} type="button" className={repeatClass} title="Repeat">
                    <span className="glyphicon glyphicon-repeat"></span>
            </button>
            <button onClick={this.toggleMute} type="button" className={repeatClass}>
                    <span className="glyphicon glyphicon-volume-down"></span>
            </button>
            </div>
                <div className="nav navbar-nav navbar-right">
                  <div className={coverClass} style={{backgroundImage: 'url('+ active.cover +')'}}></div>
                  <p className="nav navbar-text" style={{marginTop:"10px"}}>{active.artist.song}<br></br>{active.artist.name}</p>
                  <button type="button" className="btn btn-default navbar-btn">
                    <span className="glyphicon glyphicon-thumbs-up"></span>
                  </button>
                </div>
              </div>
            </div>
          </nav>
        )
    }
}
