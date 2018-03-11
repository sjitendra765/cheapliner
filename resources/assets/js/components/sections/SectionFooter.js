import React, { Component } from 'react';
import ReactDOM from 'react-dom'; //use

class SectionFooter extends Component {
    render() {
        return (
            <section id="footer">
            <div className="filter-area">

            <div className="price-filter filter">
            <h5>Outbound</h5>
            <div id="outbound-time-range">
            <p>
            <span className="outbound-slider-time">06:00</span> - <span className="outbound-slider-time2">24:00</span>
        </p>
        <div className="outbound-sliders_step1">
            <div id="outbound-range"></div>
            </div>
            </div>
            </div></div>
            <footer>
            <div className="row main-footer-sub">
            <div className="container clear-padding">
            <div className="col-md-7 col-sm-7">
            <form >
            <label>SUBSCRIBE TO OUR NEWSLETTER</label>
        <div className="clearfix"></div>
            <div className="col-md-9 col-sm-8 col-xs-6 clear-padding">
            <input className="form-control" type="email" required placeholder="Enter Your Email" name="email" />
            </div>
            <div className="col-md-3 col-sm-4 col-xs-6 clear-padding">
            <button type="submit"><i className="fa fa-paper-plane"></i>SUBSCRIBE</button>
        </div>
        </form>
        </div>
        <div className="col-md-5 col-sm-5">
            <div className="social-media pull-right">
            <ul>
            <li><a href="#"><i className="fa fa-facebook"></i></a></li>
        <li><a href="#"><i className="fa fa-twitter"></i></a></li>
        <li><a href="#"><i className="fa fa-instagram"></i></a></li>
        <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
        <li><a href="#"><i className="fa fa-youtube"></i></a></li>
        </ul>
        </div>
        </div>
        </div>
        </div>
        <div className="main-footer row">
            <div className="container clear-padding">
            <div className="col-md-3 col-sm-6 about-box">
            <h3>CHEAPLINER</h3>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
        <a href="#">READ MORE</a>
        </div>
        <div className="col-md-3 col-sm-6 links">
            <h4>Popular Tours</h4>
        <ul>
        <li><a href="#">Romantic France</a></li>
        <li><a href="#">Wonderful Lodnon</a></li>
        <li><a href="#">Awesome Amsterdam</a></li>
        <li><a href="#">Wild Africa</a></li>
        <li><a href="#">Beach Goa</a></li>
        <li><a href="#">Casino Los Vages</a></li>
        <li><a href="#">Romantic France</a></li>
        </ul>
        </div>
        <div className="clearfix visible-sm-block"></div>
            <div className="col-md-3 col-sm-6 links">
            <h4>Our Services</h4>
        <ul>
        <li><a href="#">Domestic Flights</a></li>
        <li><a href="#">International Flights</a></li>
        <li><a href="#">Tours & Holidays</a></li>
        <li><a href="#">Domestic Hotels</a></li>
        <li><a href="#">International Hotels</a></li>
        <li><a href="#">Cruise Holidays</a></li>
        <li><a href="#">Car Rental</a></li>
        </ul>
        </div>
        <div className="col-md-3 col-sm-6 contact-box">
            <h4>Contact Us</h4>
        <p><i className="fa fa-home"></i> Street #156 Burbank, Studio City Hollywood, California USA</p>
        <p><i className="fa fa-phone"></i> +91 1234567890</p>
        <p><i className="fa fa-envelope-o"></i> info@cheapliner.com</p>
        </div>
        <div className="clearfix"></div>
            <div className="col-md-12 text-center we-accept">
            <h4>We Accept</h4>
        <ul>
        <li><img src="assets/images/card/card.jpg" alt="cruise"/></li>
            <li><img src="assets/images/card/card.jpg" alt="cruise"/></li>
            <li><img src="assets/images/card/card.jpg" alt="cruise"/></li>
            <li><img src="assets/images/card/card.jpg" alt="cruise"/></li>
            </ul>
            </div>
            </div>
            </div>
            <div className="main-footer-nav row">
            <div className="container clear-padding">
            <div className="col-md-6 col-sm-6">
            <p>Copyright &copy; 2018 Cheapliner. All Rights Reserved.</p>
        </div>
        <div className="col-md-6 col-sm-6">
            <ul>
            <li><a href="#">FLIGHTS</a></li>
        <li><a href="#">TOURS</a></li>
        <li><a href="#">CARS</a></li>
        <li><a href="#">HOTELS</a></li>
        <li><a href="#">BLOG</a></li>
        </ul>
        </div>
        <div className="go-up">
            <a href="#"><i className="fa fa-arrow-up"></i></a>
        </div>
        </div>
        </div>
        </footer>
        </section>
    );
    }
}

export default SectionFooter;//namespace
