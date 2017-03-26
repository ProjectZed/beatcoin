import React from 'react';
import ProductTile from './product-tile';

export default class Redeem extends React.Component {
    render() {
        return (
          <div className="container panelstyle">
            <div className= "row row-centered">
              <div className= "col-md-10 col-centered">
                <div className= "row row-centered">
                  <ProductTile productPhoto = "img/chipotle.png"/>
                  <ProductTile productPhoto = "img/amazon.png"/>
                </div>
                <div className= "row row-centered" style="margin-top: 15px">
                <ProductTile productPhoto = "img/beatcoinholder.png"/>
                <ProductTile productPhoto = "img/itunes.jpg"/>
                </div>
              </div>
            </div>
          </div>
        )
    }
}
