import React from 'react';

export default class MyProfile extends React.Component {
    render() {
        return (
            <div>
            <div className="container main-container">
                <div className="row bc-upper-profile">
                    <div className="col-md-4">
                        <div className="row" align="right">
                            <img src="img/bach.jpg" className="profile-picture img-circle"></img>
                        </div>
                        <div className="row" align="right">
                            <button className="upload-profile-link">

                        <span className="glyphicon glyphicon-pencil"></span>
                        Change Profile Picture
                    </button>
                        </div>
                    </div>
                    <div className="col-md-8 my-profile-name">
                        Johann Bach
                    </div>
                </div>
                <div className="row bc-upper-profile">
                    <div className="col-md-4">
                        <div className="row selector-col">
                            <b>
                        <button className="row selector-button">
                            General
                        </button>
                        <button className="row selector-button">
                            Listening Preferences
                        </button>
                        <button className="row selector-button">
                            Songs
                        </button>
                        <button className="row selector-button">
                            Favorites
                        </button>
                        <button className="row selector-button">
                            Redeem
                        </button>
                      </b>
                        </div>
                    </div>

                    <div className="col-md-8 profile-info">
                        <font size="6">General </font>
                        <font size="4"><a href="#"><span className="glyphicon glyphicon-pencil"></span></a></font>
                        <hr/>
                        <div className="col-md-3 displayed-info">
                            Displayed Name
                            <br/> Birthday
                            <br/> Gender
                            <br/> Address
                            <br/> Education
                        </div>
                        <div className="col-md-3 displayed-info">
                            Johann Bach
                            <br/> 1685/03/31
                            <br/> Male
                            <br/> Germany
                            <br/> High School
                        </div>
                        <div className="col-md-4 displayed-info">
                            <br/>
                            <span className="glyphicon glyphicon-remove"></span> Hidden
                            <br/>
                            <span className="glyphicon glyphicon-remove"></span> Hidden
                            <br/>
                            <span className="glyphicon glyphicon-ok"></span> Displayed
                            <br/>
                            <span className="glyphicon glyphicon-remove"></span> Hidden
                        </div>
                    </div>
                </div>

            </div>
            </div>
        )
    }
}
