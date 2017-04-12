import React from 'react';
import {Link} from 'react-router';

export default class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.setProgress = this.setProgress.bind(this);
        this.updateProgress = this.updateProgress.bind(this);
        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
        this.toggle = this.toggle.bind(this);
        this.end = this.end.bind(this);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.toggleMute = this.toggleMute.bind(this);
        this.repeat = this.repeat.bind(this);

        this.state = {
            songChangeCallback: this.props.songChangeCallback,
            currentSongIndex: this.props.currentSongIndex || 0,
            active: this.props.songList[this.props.currentSongIndex || 0],
            progress: 0,
            random: false,
            repeat: false,
            mute: false,
            play: this.props.autoplay || false,
            songList: this.props.songList
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.state.songList != nextProps.songList) {
            this.setState({songList: nextProps.songList, currentSongIndex: 0, active: nextProps.songList[0], play: true, progress: 0});
        } else if (this.state.currentSongIndex != nextProps.currentSongIndex) {
            this.setState({
                currentSongIndex: nextProps.currentSongIndex,
                active: this.state.songList[nextProps.currentSongIndex],
                progress: 0
            });
        }
    }

    componentDidMount() {
        let playerElement = this.refs.player;
        playerElement.addEventListener('timeupdate', this.updateProgress);
        playerElement.addEventListener('ended', this.end);
        playerElement.addEventListener('error', this.next);
    }

    componentWillUnmount() {
        let playerElement = this.refs.player;
        playerElement.removeEventListener('timeupdate', this.updateProgress);
        playerElement.removeEventListener('ended', this.end);
        playerElement.removeEventListener('error', this.next);
    }

    setProgress(e) {
        let target = e.target.nodeName === 'SPAN'
            ? e.target.parentNode
            : e.target;
        let width = target.clientWidth;
        let rect = target.getBoundingClientRect();
        let offsetX = e.clientX - rect.left;
        let duration = this.refs.player.duration;
        let currentTime = (duration * offsetX) / width;
        let progress = (currentTime * 100) / duration;

        this.refs.player.currentTime = currentTime;
        this.setState({progress: progress});
        this.play();
    }

    updateProgress() {
        let duration = this.refs.player.duration;
        let currentTime = this.refs.player.currentTime;
        let progress = (currentTime * 100) / duration;
        this.setState({progress: progress});
    }

    play() {
        this.setState({play: true});
        this.refs.player.play();
    }

    pause() {
        this.setState({play: false});
        this.refs.player.pause();
    }

    toggle() {
        this.state.play
            ? this.pause()
            : this.play();
    }

    end() {
        (this.state.repeat)
            ? this.play()
            : this.setState({play: false});
    }

    next() {
        var total = this.state.songList.length;
        var current = (this.state.repeat)
            ? this.state.currentSongIndex
            : (this.state.currentSongIndex < total - 1)
                ? this.state.currentSongIndex + 1
                : 0;
        // var active = this.state.songList[current];

        this.state.songChangeCallback(current);
        // this.refs.player.src = active.audio;
        // this.play();
    }

    previous() {
        var total = this.state.songList.length;
        var current = (this.state.currentSongIndex > 0)
            ? this.state.currentSongIndex - 1
            : total - 1;
        // var active = this.state.songList[current];

        // this.setState({currentSongIndex: current, active: active, progress: 0});
        this.state.songChangeCallback(current);

        // this.refs.player.src = active.audio;
        // this.play();
    }

    repeat() {
        this.setState({
            repeat: !this.state.repeat
        });
    }

    toggleMute() {
        let mute = this.state.mute;

        this.setState({
            mute: !this.state.mute
        });
        this.refs.player.volume = (mute)
            ? 1
            : 0;
    }
    render() {
        var audio = ""
        if (this.state.active) {
            audio = this.state.active.audio;
        }
        var cover = ""
        if (this.state.active) {
            cover = this.state.active.cover;
        }
        var title = ""
        if (this.state.active) {
            title = this.state.active.title;
        }
        var name = ""
        if (this.state.active) {
            name = this.state.active.uploader.name;
        }
        return (
            <nav className="navbar navbar-fixed-bottom navbar-default">
                <div className="container">
                    <audio src={audio} autoPlay={this.state.play} preload="auto" ref="player"></audio>
                    <div className="navbar navbar-static-top">
                        <div className="navbar-left">
                            <div className="btn-group" role="group">
                                <button onClick={this.previous} type="button" className="btn btn-default navbar-btn" title="Previous Song">
                                    <span className="glyphicon glyphicon-fast-backward"></span>
                                </button>
                                <button onClick={this.toggle} type="button" className="btn btn-default navbar-btn" title="Play/Pause">
                                    <span className="glyphicon glyphicon-play-circle"></span>
                                </button>
                                <button onClick={this.next} type="button" className="btn btn-default navbar-btn" title="Next Song">
                                    <span className="glyphicon glyphicon-fast-forward"></span>
                                </button>
                            </div>
                        </div>
                        <div className="navbar-inner" style={{
                            display: "inline-block"
                        }}>
                            <div className="player-progress-container" onClick={this.setProgress}>
                                <span className="player-progress-value" style={{
                                    width: this.state.progress + '%'
                                }}></span>
                            </div>
                            <p className="nav navbar-text">4:26</p>
                            <button onClick={this.repeat} type="button" className='btn btn-defaultm navbar-btn' title="Repeat">
                                <span className="glyphicon glyphicon-repeat"></span>
                            </button>
                            <button onClick={this.toggleMute} type="button" className='btn btn-defaultm navbar-btn'>
                                <span className="glyphicon glyphicon-volume-down"></span>
                            </button>
                        </div>
                        <div className="nav navbar-nav navbar-right">
                            <Link to={'/playlist-view'}>
                                <div className="song-pic" style={{
                                    backgroundImage: 'url(/' + cover + ')'
                                }}></div>
                                <p className="nav navbar-text" style={{
                                    marginTop: "10px"
                                }}>{title}
                                    <br></br>{name}</p>
                            </Link>
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
