import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import CustomHeader from './CustomHeader';
import CustomBody from './CustomBody';


class Flight extends Component {
    render() {
        var divStyle = {
            backgroundImage: 'url(images/cover_bg_3.jpg)'
        }
        return (
            <div id="fh5co-wrapper">
            	<div id="fh5co-page">
                	<CustomHeader />
                	<div className="fh5co-hero">
                      <div className="fh5co-overlay"></div>
                      <div className="fh5co-cover" style={divStyle}>
                          <div className="desc">
                                <div className="container">
                                      <div className="row">
                                     <main> {this.props.children}</main>
                                      </div>
                                  </div>
                          </div>
                      </div>
                      </div>

                </div>
            </div>
        );
    }
}

export default Flight;