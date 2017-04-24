import React from 'react';
import ProductTile from './product-tile';
import {getPublicProfile} from '../server';


export default class Redeem extends React.Component {
  constructor(props) {
    super(props);
    this.state.redeemables = {};
  }
  refresh() {
    redeemables((items) => {
      this.setState({redeemables: items});
    });
  }
  componentDidMount() {
    this.refresh();
  }
  render() {
    var one = this.state.redeemables[0];
    var two = this.state.redeemables[1];
    var three = this.state.redeemables[2];
    var four = this.state.redeemables[3];
    return (
      <div>
        <div className="container panelstyle">
          <div className="row row-centered">
            <div className="col-md-10 col-centered">
              <div className="row row-centered">
                <ProductTile productPhoto="img/chipotle.png"/>
                <ProductTile productPhoto="img/amazon.jpg"/>
              </div>
              <div className="row row-centered" style={{
                marginTop: "15px"
              }}>
                <ProductTile productPhoto="img/beatcoinholder.png"/>
                <ProductTile productPhoto="img/itunes.jpg"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
