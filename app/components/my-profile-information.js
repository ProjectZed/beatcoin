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
        )
    }
}
