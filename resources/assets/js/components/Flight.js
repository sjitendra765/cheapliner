import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';

import CustomHeader from './CustomHeader';

import CustomBody from './CustomBody';
import MainBody from './MainBody';


class Flight extends Component {
  constructor(props) {
    super(props);
}

    render() {
        var divStyle = {
            backgroundImage: 'url(images/cover_bg_3.jpg)'
        }
        return (
            <div className="site-wrapper">

                	<CustomHeader/>
                                       {this.props.children}



                </div>
        );
    }
}

export default Flight;