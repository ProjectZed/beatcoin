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
                <Footer songs={
            [{
                "url": "audio/star-spangled-banner.mp3",
                "cover": "img/songs/covers/star-spangled-banner.jpg",
                "artist":{
                    "song": "The Star Spangled Banner",
                    "name": "USA"
                }
            },
            {
                "url": "audio/o-canada.mp3",
                "cover": "img/songs/covers/o-canada.jpg",
                "artist":{
                    "song": "O Canada",
                    "name": "Canada"
                }
            }
          ]}/>,
            </div>
        )
    }
}
