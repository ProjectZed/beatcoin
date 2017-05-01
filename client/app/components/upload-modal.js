import React from 'react';

import {getGenreLists} from '../server';
import {putSong} from '../server';

export default class UploadModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      author: props.userId,
      inputTitle: "",
      inputLyrics: "",
      inputSong: "TODO: Allow uploading songs",
      inputCover: "TODO: Allow uploading images",
      inputDescription: "",
      inputGenre: "",
      inputRewards: 0,
      genreList: []
    };

    getGenreLists((genreList) => {
      genreList = genreList.map((genre) => {
        return genre.name
      })
      this.setState({genreList: genreList, inputGenre: genreList[0]});
    });

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDismiss = this.handleDismiss.bind(this);
  }

  handleTitleChange(e) {
    this.setState({inputTitle: e.target.value});
  }

  handleLyricsChange(e) {
    this.setState({inputLyrics: e.target.value});
  }

  handleDescriptionChange(e) {
    this.setState({inputDescription: e.target.value});
  }

  handleGenreChange(e) {
    this.setState({inputGenre: e.target.value});
  }

  handleRewardsChange(e) {
    this.setState({inputRewards: e.target.value});
  }

  handleSubmit(clickEvent) {
    clickEvent.preventDefault();
    putSong(this.state.author, this.state.inputTitle, this.state.inputLyrics, this.state.inputDescription, this.state.inputGenre, this.state.inputRewards, (song) => {
      this.setState({inputTitle: "", inputDescription: "", inputGenre: this.state.genreList[0], inputRewards: 0});
    })
  }

  handleDismiss(clickEvent) {
    clickEvent.preventDefault();
    this.setState({inputTitle: "", inputDescription: "", inputGenre: this.state.genreList[0], inputRewards: 0});
  }

  render() {
    var genreList = [];
    for (var i = 0; i < this.state.genreList.length; i++) {
      genreList.push(
        <option key={i}>{this.state.genreList[i]}</option>
      );
    }
    return (
      <div className="modal fade" id="upload-modal" role="dialog">
        <div className="modal-dialog modal-sm">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">&times;</button >
              <h4 className="modal-title">Upload Song</h4>
            </div>
            <div className="modal-body">
              <form onSubmit={this.handleSubmit} role="form" data-toggle="validator">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="inputTitle" className="control-label">Title</label >
                      <input type="text" className="form-control" id="inputTitle" value={this.state.inputTitle} onChange={(e) => this.handleTitleChange(e)} required data-error="Failure"></input>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="inputDescription" className="control-label">Description</label>
                      <input type="text" className="form-control" id="inputDescription" value={this.state.inputDescription} onChange={(e) => this.handleDescriptionChange(e)} required data-error="Failure"></input>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="inputLyrics" className="control-label">Lyrics</label >
                      <input type="text" className="form-control" id="inputLyrics" value={this.state.inputLyrics} onChange={(e) => this.handleLyricsChange(e)} required data-error="Failure"></input>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="inputSong" className="control-label">Song File</label>
                      <input type="text" className="form-control" id="inputSong" value={this.state.inputSong} disabled required data-error="Failure"></input>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="inputCover" className="control-label">Song Cover</label>
                      <input type="text" className="form-control" id="inputCover" value={this.state.inputCover} disabled required data-error="Failure"></input>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="inputGenre">Genre</label>
                      <select className="form-control" id="inputGenre" value={this.state.inputGenre} onChange={(e) => this.handleGenreChange(e)}>
                        {genreList}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="inputRewards">Reward</label>
                      <input type="number" className="form-control" id="inputRewards" value={this.state.inputRewards} onChange={(e) => this.handleRewardsChange(e)} required data-error="Failure"></input>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal" onClick={(e) => this.handleDismiss(e)}>Close</button>
              <button type="button" className="btn btn-default" data-dismiss="modal" onClick={(e) => this.handleSubmit(e)}>Upload</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
