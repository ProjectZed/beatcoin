import React from 'react';

import {getGenreLists} from '../server';

export default class UploadModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      lyrics: "",
      description: "",
      genreList: []
    };

    getGenreLists((genreList) => {
        this.setState({genreList: genreList});
    });
  }

  onClickClose(e) {
      var modal = document.getElementById('upload-modal');
      e.preventDefault();
      modal.style.display = "none";
  }

  handleTitleChange(e) {
    this.setState({title: e.target.value});
  }

  handleLyricsChange(e) {
    this.setState({lyrics: e.target.value});
  }

  handleDescriptionChange(e) {
    this.setState({description: e.target.value});
  }

  handleSubmit(clickEvent) {
    clickEvent.preventDefault();

  }

  render() {
    var genreList = this.state.genreList;
    var genres = [];
    for (var i = 0; i < (genreList.length); i++) {
      genres.push(
        <div className="col-md-2"><input id="genres" type="checkbox" value={genreList[i].name} key={genreList[i]._id} />{genreList[i].name}</div>
      );
    }

    return (
      <div id="upload-modal" className="modal">
          <div className="modal-content">

              <header className="modal-nonbody">
                  <span type="button" onClick={(e) => this.onClickClose(e)}
                  className="supertimes">&times;</span>
                  <h2>Upload A Song</h2>
              </header>

              <div className="form-group">
                  <label htmlFor="title" className="control-label">Title:</label>
                  <input type="text" className="form-control" id="title" value={this.state.title}
                  onChange={(e) => this.handleTitleChange(e)} required data-error="Failure"></input>


                  <div className="form-wrapper">
                    <form action="/action_page.php">
                    Select a song: <input type="file" name="song" accept="audio/*"/>
                    </form>
                    <form action="/action_page.php">
                    Select a cover: <input type="file" name="pic" accept="image/*"/>
                    </form>
                  </div>

                  <div className="row">
                  <form action="">
                    <label htmlFor="genres" className="control-label">Genres:</label><br></br>
                    {genres}
                  </form>
                  </div>

                  <div className="row">
                  <label htmlFor="lyrics">Lyrics:</label>
                  <textarea className="form-control" rows="3" id="lyrics" value={this.state.lyrics}
                  onChange={(e) => this.handleLyricsChange(e)} required data-error=""></textarea>

                  <label htmlFor="description">Description:</label>
                  <textarea className="form-control" rows="3" id="description" value={this.state.description}
                  onChange={(e) => this.handleDescriptionChange(e)} required data-error=""></textarea>
                </div>

              </div>

              <footer className="modal-nonbody">
                <div className="group-btn" role="group">
                    <button id="upload-btn" type="button"
                      className="btn btn-default navbar-btn" onClick={(e) => this.handleSubmit(e)}>
                        Submit</button>
                </div>
                <div className="group-btn" role="group">
                    <button id="upload-btn" type="button"
                      className="btn btn-default navbar-btn" onClick={(e) => this.onClickClose(e)}>
                        Cancel</button>
                </div>
              </footer>

          </div>
      </div>
    )
  }
}
