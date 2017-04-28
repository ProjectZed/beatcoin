import React from 'react';

export default class UploadModal extends React.Component {

  // Get the modal
  onClickUpload(e) {
      var modal = document.getElementById('upload-modal');
      e.preventDefault();
      modal.style.display = "block";
  }
  onClickClose(e) {
      var modal = document.getElementById('upload-modal');
      e.preventDefault();
      modal.style.display = "none";
  }

  render() {
    return (
      <div id="upload-modal" className="modal">
          <div className="modal-content">

              <header className="w3-container w3-teal">
                  <span onClick={(e) => this.onClickClose(e)} className="supertimes">&times;</span>
                  <h2>Modal Header</h2>
              </header>

              <div className="w3-container">
                  <p>Some text..</p>
                  <p>Some text..</p>
              </div>

              <footer className="w3-container w3-teal">
                  <p>Modal Footer</p>
              </footer>

          </div>
      </div>
    )
  }
}
