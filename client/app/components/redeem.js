import React from 'react';
import ProductTile from './product-tile';
import {getRedeemables} from '../server';

export default class Redeem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redeemables: []
    };
  }

  componentDidMount() {
    getRedeemables((items) => {
      this.setState({redeemables: items});
    });
  }

  render() {
    var redeemables = this.state.redeemables;
    var redeemList = []
    for (var i = 0; i < (redeemables.length); i++) {
      redeemList.push(
        <ProductTile key={i} productPhoto={redeemables[i].image}/>
      );
    }

    var rows = [];
    for (var j = 0; j < (redeemList.length / 2); j++) {
      rows.push([]);
      for (var k = 0; k < 2; k++) {
        if ((2 * j + k) < redeemList.length) {
          rows[j].push(redeemList[2 * j + k]);
        }
      }
    }
    return (
      <div>
        <div className="container panelstyle">
          <div className="row row-centered">
            <div className="col-md-10 col-centered">
              {rows.map((child) => {
                return (
                  <div className="row row-centered" key={rows.indexOf(child)}>
                    {child}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
