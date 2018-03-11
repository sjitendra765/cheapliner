import React, { Component } from 'react';
import ReactDOM from 'react-dom'; //use

class Slider extends Component {
    render() {
        return (

            <div className="offer-slider">
            <div className="owl-carousel col-md-4 text-right" id="offer1">
            <div className="item">
            <h3>Hong Kong Fun</h3>
        <h4>Starting From $599/Person</h4>
        <a href="#">KNOW MORE</a>
        </div>
        <div className="item">
            <h3>Romantic Paris</h3>
        <h4>Starting From $999/Person</h4>
        <a href="#">KNOW MORE</a>
        </div>
        <div className="item">
            <h3>Sky High Dubai</h3>
        <h4>Starting From $399/Person</h4>
        <a href="#">KNOW MORE</a>
        </div>
        </div>
        </div>

    );
    }
}

export default Slider;//namespace
