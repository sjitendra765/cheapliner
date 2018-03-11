import React, { Component } from 'react';
import ReactDOM from 'react-dom'; //use

class SectionFive extends Component {
    render() {
        return (
            <section>
            <div className="row hot-deals">
            <div className="container clear-padding">
            <div className="section-title text-center">
            <h2>HOT DEALS</h2>
            <h4>SAVE MORE</h4>
            </div>
        <div role="tabpanel" className="text-center">

        <ul className="nav nav-tabs" role="tablist" id="hotDeal">
            <li role="presentation" className="active text-center">
            <a href="#tab1" aria-controls="tab1" role="tab" data-toggle="tab">
            <i className="fa fa-bed"></i>
            <span>HOTELS</span>
            </a>
            </li>
            <li role="presentation" className="text-center">
            <a href="#tab2" aria-controls="tab2" role="tab" data-toggle="tab">
            <i className="fa fa-suitcase"></i>
            <span>HOLIDAYS</span>
            </a>
            </li>
            <li role="presentation" className="text-center">
            <a href="#tab3" aria-controls="tab3" role="tab" data-toggle="tab">
            <i className="fa fa-plane"></i>
            <span>FLIGHTS</span>
            </a>
            </li>
            <li role="presentation" className="text-center">
            <a href="#tab4" aria-controls="tab4" role="tab" data-toggle="tab">
            <i className="fa fa-taxi"></i>
            <span>CARS</span>
            </a>
            </li>
            <li role="presentation" className="text-center">
            <a href="#tab5" aria-controls="tab5" role="tab" data-toggle="tab">
            <i className="fa fa-bed"></i>
            <span>HOTEL+FLIGHTS</span>
            </a>
            </li>
            </ul>

            <div className="clearfix"></div>

            <div className="tab-content">

        <div role="tabpanel" className="tab-pane active fade in" id="tab1">
            <div className="col-md-6 hot-deal-list wow slideInLeft">
            <div className="item">
            <div className="col-xs-3">
            <img src="assets/images/offer1.jpg" alt="Cruise" />
            </div>
            <div className="col-md-7 col-xs-6">
            <h5>Hotel Grand Lilly</h5>
        <p className="location"><i className="fa fa-map-marker"></i> New York, USA</p>
        <p className="text-sm">Lorem Ipsum is simply dummy text. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        </div>
        <div className="col-md-2 col-xs-3">
            <h4>$499</h4>
            <h6>Per Night</h6>
        <a href="#">BOOK</a>
            </div>
            </div>
            <div className="clearfix"></div>
            <div className="item">
            <div className="col-xs-3">
            <img src="assets/images/offer2.jpg" alt="Cruise" />
            </div>
            <div className="col-md-7 col-xs-6">
            <h5>Royal Resort</h5>
        <p className="location"><i className="fa fa-map-marker"></i> New York, USA</p>
        <p className="text-sm">Lorem Ipsum is simply dummy text. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        </div>
        <div className="col-md-2 col-xs-3">
            <h4>$399</h4>
            <h6>Per Night</h6>
        <a href="#">BOOK</a>
            </div>
            </div>
            <div className="clearfix"></div>
            <div className="item">
            <div className="col-xs-3">
            <img src="assets/images/offer3.jpg" alt="Cruise" />
            </div>
            <div className="col-md-7 col-xs-6">
            <h5>Hotel Grand Lilly</h5>
        <p className="location"><i className="fa fa-map-marker"></i> New York, USA</p>
        <p className="text-sm">Lorem Ipsum is simply dummy text. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        </div>
        <div className="col-md-2 col-xs-3">
            <h4>$499</h4>
            <h6>Per Night</h6>
        <a href="#">BOOK</a>
            </div>
            </div>
            <div className="clearfix"></div>
            </div>
            <div className="col-md-6 hot-deal-grid wow slideInRight">
            <div className="col-sm-6 item">
            <div className="wrapper">
            <img src="assets/images/tour1.jpg" alt="Cruise" />
            <h5>Paris Starting From $49/Night</h5>
        <a href="#">DETAILS</a>
            </div>
            </div>
            <div className="col-sm-6 item">
            <div className="wrapper">
            <img src="assets/images/tour1.jpg" alt="Cruise" />
            <h5>Bangkok Starting From $69/Night</h5>
        <a href="#">DETAILS</a>
            </div>
            </div>
            <div className="col-sm-6 item">
            <div className="wrapper">
            <img src="assets/images/tour1.jpg" alt="Cruise" />
            <h5>Dubai Starting From $99/Night</h5>
        <a href="#">DETAILS</a>
            </div>
            </div>
            <div className="col-sm-6 item">
            <div className="wrapper">
            <img src="assets/images/tour1.jpg" alt="Cruise" />
            <h5>Italy Starting From $59/Night</h5>
        <a href="#">DETAILS</a>
            </div>
            </div>
            </div>
            </div>
            <div role="tabpanel" className="tab-pane fade" id="tab2">
            <div className="col-md-6 hot-deal-list">
            <div className="item">
            <div className="col-xs-3">
            <img src="assets/images/offer3.jpg" alt="Cruise" />
            </div>
            <div className="col-md-7 col-xs-6">
            <h5>Hotel Grand Lilly</h5>
        <p className="location"><i className="fa fa-map-marker"></i> New York, USA</p>
        <p className="text-sm">Lorem Ipsum is simply dummy text. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        </div>
        <div className="col-md-2 col-xs-3">
            <h4>$499</h4>
            <h6>Per Night</h6>
        <a href="#">BOOK</a>
            </div>
            </div>
            <div className="clearfix"></div>
            <div className="item">
            <div className="col-xs-3">
            <img src="assets/images/offer2.jpg" alt="Cruise"/>
            </div>
            <div className="col-md-7 col-xs-6">
            <h5>Royal Resort</h5>
        <p className="location"><i className="fa fa-map-marker"></i> New York, USA</p>
        <p className="text-sm">Lorem Ipsum is simply dummy text. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        </div>
        <div className="col-md-2 col-xs-3">
            <h4>$399</h4>
            <h6>Per Night</h6>
        <a href="#">BOOK</a>
            </div>
            </div>
            <div className="clearfix"></div>
            <div className="item">
            <div className="col-xs-3">
            <img src="assets/images/offer1.jpg" alt="Cruise" />
            </div>
            <div className="col-md-7 col-xs-6">
            <h5>Hotel Grand Lilly</h5>
        <p className="location"><i className="fa fa-map-marker"></i> New York, USA</p>
        <p className="text-sm">Lorem Ipsum is simply dummy text. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        </div>
        <div className="col-md-2 col-xs-3">
            <h4>$499</h4>
            <h6>Per Night</h6>
        <a href="#">BOOK</a>
            </div>
            </div>
            <div className="clearfix"></div>
            </div>
            <div className="col-md-6 hot-deal-grid">
            <div className="col-sm-6 item">
            <div className="wrapper">
            <img src="assets/images/tour1.jpg" alt="Cruise" />
            <h5>Paris Starting From $49/Night</h5>
        <a href="#">DETAILS</a>
            </div>
            </div>
            <div className="col-sm-6 item">
            <div className="wrapper">
            <img src="assets/images/tour1.jpg" alt="Cruise" />
            <h5>Bangkok Starting From $69/Night</h5>
        <a href="#">DETAILS</a>
            </div>
            </div>
            <div className="col-sm-6 item">
            <div className="wrapper">
            <img src="assets/images/tour1.jpg" alt="Cruise" />
            <h5>Dubai Starting From $99/Night</h5>
        <a href="#">DETAILS</a>
            </div>
            </div>
            <div className="col-sm-6 item">
            <div className="wrapper">
            <img src="assets/images/tour1.jpg" alt="Cruise"/>
            <h5>Italy Starting From $59/Night</h5>
        <a href="#">DETAILS</a>
            </div>
            </div>
            </div>
            </div>
            <div role="tabpanel" className="tab-pane" id="tab3">
            Lorem Lpsum 3
        </div>
        <div role="tabpanel" className="tab-pane" id="tab4">
            Lorem Lpsum 4
        </div>
        <div role="tabpanel" className="tab-pane" id="tab5">
            Lorem Lpsum 5
        </div>
        </div>
        </div>
        </div>
        </div>
        </section>
    );
    }
}

export default SectionFive;//namespace
