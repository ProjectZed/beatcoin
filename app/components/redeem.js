import React from 'react';
import ProductTile from './product-tile';
import Navbar from './navbar';
import Footer from './footer';

export default class Redeem extends React.Component {

    render() {
        return (
		<div>
			<Navbar></Navbar>
          <div className="container panelstyle">
            <div className= "row row-centered">
              <div className= "col-md-10 col-centered">
                <div className= "row row-centered">
                  <ProductTile productPhoto = "img/chipotle.png"/>
                  <ProductTile productPhoto = "img/amazon.jpg"/>
                </div>
								<div className= "row row-centered" style={{marginTop: "15px"}}>
                <ProductTile productPhoto = "img/beatcoinholder.png"/>
                <ProductTile productPhoto = "img/itunes.jpg"/>
                </div>
              </div>
            </div>
          </div>
		<Footer data={{songTime:'13:37',songTitle:'Sherlock',songArtist:'Blasphemy Frumblesnatch'}}/>,
		</div>
        )
    }
}
