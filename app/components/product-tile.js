import React from 'react';

export default class ProductTile extends React.Component {
    render() {
        return (
          <div className="col-md-5 col-centered">
            <div className="relative">
              <img className="img" src={this.props.productPhoto} alt=""/>
              <div className="btn-group btn-group-justified" role="group" aria-label="...">
                <a href="#" className="btn btn-default" role="button">$5</a>
                <a href="#" className="btn btn-default" role="button">$10</a>
                <a href="#" className="btn btn-default" role="button">$20</a>
              </div>
            </div>
          </div>
        )
    }
}
