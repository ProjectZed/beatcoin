import React from 'react';

export default class Profile extends React.Component {
  render() {
    return (
      <div className="container main-container">
       <div className="row bc-upper-profile">
         <div className="col-md-3">
           <div className="row" align="right">
             <div src="img/bach.jpg" className="profile-picture img-circle">
             </div>

           </div>
           <div className="row" align="right">
             <button type="button" className="donate-button btn btn-default every-button">
               <span className="" styles="width:100%">Donate</span>
             </button>
           </div>
         </div>
         <div className="col-md-9 bc-profile-name">
           Johann Bach
         </div>
       </div>

       <div className="row bc-middle-profile">
       </div>

       <div className="row bc-lower-profile">
         <div className="col-md-4">
           <h4 className="timeline-title">Timeline</h4>

           <div className="row" className="song-timestamp">
             <span className="glyphicon glyphicon-time"></span>
             2017-02-27
           </div>

           <div className="panel box">
             <div className="panel-body">
               Ave Maria
             </div>
           </div>

           <div className="panel box">
             <div className="panel-body">
               Magnificat
             </div>
           </div>

           <div className="row" className="song-timestamp">
             <span className="glyphicon glyphicon-time"></span>
             2017-02-26
           </div>

           <div className="panel box">
             <div className="panel-body">
               Cello Suites
             </div>
           </div>
         </div>

         <div className="col-md-4">
           <div className="comments-image">
           </div>
         </div>

         <div className="col-md-4 comments-container" align="right">
           <h4 className="comments-title">Comments</h4>

           <div className="container col-md-12 list-group-item">
             <div className="row">
               <div className="col-md-3 col-img">
                 <div className="comments-image profile-pic img-circle">
                 </div>
               </div>
               <div className="col-md-6 col-name-message">
                 <div className="comments-name">
                   Doggie Doggo
                 </div>
                 <div className="comments-message">
                   Bark Bark Bark Bark
                 </div>
               </div>
               <div className="col-md-3 col-actions-date">
                 <div className="comments-date pull-right">Today</div>
                 <div className="pull-right">
                   <span className="comments-like glyphicon glyphicon-thumbs-up">
                   </span>
                   <span className="comments-reply">Reply</span>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
      </div>
    )
  }
}
