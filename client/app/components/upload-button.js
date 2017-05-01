import React from 'react';

import {getGenreLists} from '../server';

export default class UploadButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      lyrics: "",
      description: "",
      selectedCheckboxes: [],
      genreList: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);

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

  handleCheckboxChange(e) {
    if (this.selectedCheckboxes.has(e.target.value)) {
      this.selectedCheckboxes.delete(e.target.value);
    } else {
      this.selectedCheckboxes.push(e.target.value);
    }
  }

  handleSubmit(clickEvent) {
    clickEvent.preventDefault();
    var modal = document.getElementById('upload-modal');
    modal.style.display = "none";
  }

  render() {
    var genreList = this.state.genreList;
    var genres = [];
    for (var i = 0; i < (genreList.length); i++) {
      genres.push(
        <div className="col-md-2"><input id="genres" type="checkbox" label={genreList[i]._id} value={genreList[i].name} key={genreList[i]._id}/>{genreList[i].name}</div>
      );
    }

    return (
      <div id="upload-modal" className="modal">
        <button type="button" className="btn btn-default navbar-btn">
          Upload
        </button>
        <div className="modal-content">

          <div className="modal fade" id="myModal" role="dialog">
            <div className="modal-dialog modal-sm">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                  <h4 className="modal-title">Modal Header</h4>
                </div>
                <div className="modal-body">
                  <p>This is a small modal.</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
