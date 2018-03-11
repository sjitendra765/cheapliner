import React, { Component } from 'react';
import ReactDOM from 'react-dom'; //use

class SectionOne extends Component {
    render() {
        return (
            <section className="hotel-product home-product">
           
        <div className="row light-row">
            <div className="col-md-6 clear-padding wow slideInLeft">
            <div className="product-wrapper">
            <div className="col-md-6 col-sm-6 home-product-padding tooltip-right">
            <h4>Romantic Paris</h4>
        <h5><i className="fa fa-map-marker"></i> France</h5>
        <p>Lorem Ipsum is simply dummy text. Lorem Ipsum is simply dummy text of the printing.</p>
        <div className="rating-box">
            <div className="pull-left">
            <img src="assets/images/tripadvisor.png" alt="cruise"/><span>4.0/5</span>
            </div>
            <div className="pull-right">
            <i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star-half-o"></i><span>4.5/5</span>
        </div>
        </div>
        <div className="clearfix"></div>
            <div className="pricing-info">
            <div className="pull-left">
            <span>$999/Person</span>
            </div>
            <div className="pull-right">
            <a href="#" className="wow fadeIn">BOOK NOW</a>
        </div>
        </div>
        <div className="clearfix"></div>
            </div>
            <div className="col-md-6 col-sm-6 clear-padding image-sm text-center">
            <img src="assets/images/home2.jpg" alt="cruise"/>
            <div className="detail-link-wrapper">
            <div className="detail-link">
            <a href="#"><i className="fa fa-search"></i></a>
        </div>
        </div>
        </div>
        </div>
        <div className="clearfix"></div>
            <div className="product-wrapper">
            <div className="col-md-6 col-sm-6 clear-padding image-sm text-center">
            <img src="assets/images/home2.jpg" alt="cruise"/>
            <div className="detail-link-wrapper">
            <div className="detail-link">
            <a href="#"><i className="fa fa-search"></i></a>
        </div>
        </div>
        </div>
        <div className="col-md-6 col-sm-6 home-product-padding tooltip-left">
            <h4>Blue Beach</h4>
        <h5><i className="fa fa-map-marker"></i> Dubai</h5>
        <p>Lorem Ipsum is simply dummy text. Lorem Ipsum is simply dummy text of the printing.</p>
        <div className="rating-box">
            <div className="pull-left">
            <img src="assets/images/tripadvisor.png" alt="cruise"/><span>4.0/5</span>
            </div>
            <div className="pull-right">
            <i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star-half-o"></i><span>4.5/5</span>
        </div>
        </div>
        <div className="clearfix"></div>
            <div className="pricing-info">
            <div className="pull-left">
            <span>$899/Person</span>
            </div>
            <div className="pull-right">
            <a href="#" className="wow fadeIn">BOOK NOW</a>
        </div>
        </div>
        <div className="clearfix"></div>
            </div>
            </div>
            </div>
            <div className="clearfix visible-sm-block"></div>
            <div className="col-md-6 clear-padding image-lg wow slideInRight">
            <img src="assets/images/home.jpg" alt="cruise"/>
            <div className="overlay">
            <div className="product-detail text-center">
            <h3>Africa Safari</h3>
        <h5><i className="fa fa-map-marker"></i> KENYA</h5>
        <p>Lorem Ipsum is simply dummy text. Lorem Ipsum is simply dummy text of the printing.</p>
        <div className="rating-box">
            <div className="pull-left">
            <img src="assets/images/tripadvisor.png" alt="cruise"/><span>4.0/5</span>
            </div>
            <div className="pull-right">
            <i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star-half-o"></i><span>4.5/5</span>
        </div>
        </div>
        <div className="clearfix"></div>
            <div className="pricing-info">
            <div className="pull-left">
            <span>$499/Person</span>
            </div>
            <div className="pull-right">
            <a href="#" className="wow fadeIn">BOOK NOW</a>
        </div>
        </div>
        <div className="clearfix"></div>
            </div>
            </div>
            </div>
            </div>

            </section>
    );
    }
}

export default SectionOne;//namespace
