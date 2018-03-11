import React, { Component } from 'react';
import ReactDOM from 'react-dom'; //use

class SectionFour extends Component {
    render() {
        return (

            <section id="why-choose-us">
            <div className="row choose-us-row">
            <div className="container clear-padding">
            <div className="light-section-title text-center">
            <h2>WHY CHOOSE US?</h2>
        <h4>REASONS TO TRUST US</h4>
        <div className="space"></div>
            <p>
            Lorem Ipsum is simply dummy text. Lorem Ipsum is simply dummy text of the printing and typesetting industry.<br />
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
        </p>
        </div>
        <div className="col-md-4 col-sm-4 wow slideInLeft">
            <div className="choose-us-item text-center">
            <div className="choose-icon"><i className="fa fa-suitcase"></i></div>
        <h4>Handpicked Tour</h4>
        <p>Lorem Ipsum is simply dummy text. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        <a href="#">KNOW MORE</a>
        </div>
        </div>
        <div className="col-md-4 col-sm-4 wow slideInUp">
            <div className="choose-us-item text-center">
            <div className="choose-icon"><i className="fa fa-phone"></i></div>
        <h4>Dedicated Support</h4>
        <p>Lorem Ipsum is simply dummy text. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        <a href="#">KNOW MORE</a>
        </div>
        </div>
        <div className="col-md-4 col-sm-4 wow slideInRight">
            <div className="choose-us-item text-center">
            <div className="choose-icon"><i className="fa fa-smile-o"></i></div>
        <h4>Lowest Price</h4>
        <p>Lorem Ipsum is simply dummy text. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        <a href="#">KNOW MORE</a>
        </div>
        </div>
        </div>
        </div>
        </section>

    );
    }
}

export default SectionFour;//namespace
