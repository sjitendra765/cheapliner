import React, { Component } from 'react';
import ReactDOM from 'react-dom'; //use

class HowItWorks extends Component {
    render() {
        return (
            <section id="how-it-work">
            <div className="row work-row">
            <div className="container">
            <div className="section-title text-center">
            <h2>HOW IT WORKS?</h2>
        <h4>SEARCH - SELECT - BOOK</h4>
        <div className="space"></div>
            <p>
            Lorem Ipsum is simply dummy text. Lorem Ipsum is simply dummy text of the printing and typesetting industry.<br />
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
        </p>
        </div>
        <div className="work-step">
            <div className="col-md-4 col-sm-4 first-step text-center">
            <i className="fa fa-search"></i>
            <h5>SEARCH</h5>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        </div>
        <div className="col-md-4 col-sm-4 second-step text-center">
            <i className="fa fa-heart-o"></i>
            <h5>SELECT</h5>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        </div>
        <div className="col-md-4 col-sm-4 third-step text-center">
            <i className="fa fa-shopping-cart"></i>
            <h5>BOOK</h5>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        </div>
        </div>
        </div>
        </div>
        </section>
    );
    }
}

export default HowItWorks;//namespace
