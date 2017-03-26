import React from 'react';

export default class MyProfileInformation extends React.Component {
    render() {
        return (
            <div>
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
                      {this.props.data.Name}
                      <br/> {this.props.data.birthday}
                      <br/> {this.props.data.gender}
                      <br/> {this.props.data.address}
                      <br/> {this.props.data.education}
                  </div>
                  <div className="col-md-4 displayed-info">
                      <br/>
                      <span className="glyphicon glyphicon-remove"></span> {this.props.data.birthdaystatus}
                      <br/>
                      <span className="glyphicon glyphicon-remove"></span> {this.props.data.genderstatus}
                      <br/>
                      <span className="glyphicon glyphicon-ok"></span> {this.props.data.addressstatus}
                      <br/>
                      <span className="glyphicon glyphicon-remove"></span> {this.props.data.educationstatus}
                  </div>
              </div>
            </div>
        )
    }
}
