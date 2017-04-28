import React from 'react';

export default class UploadModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      lyrics: "",
      description: ""
    }
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
                    <input type="submit"/>
                    </form>
                    <form action="/action_page.php">
                    Select a cover: <input type="file" name="pic" accept="image/*"/>
                    <input type="submit"/>
                    </form>
                  </div>

                  <label htmlFor="lyrics">Lyrics:</label>
                  <textarea className="form-control" rows="5" id="lyrics" value={this.state.lyrics}
                  onChange={(e) => this.handleLyricsChange(e)} required data-error=""></textarea>

                  <label htmlFor="description">Description:</label>
                  <textarea className="form-control" rows="5" id="description" value={this.state.description}
                  onChange={(e) => this.handleDescriptionChange(e)} required data-error=""></textarea>

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
