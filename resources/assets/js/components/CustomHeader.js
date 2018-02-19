import React, { Component } from 'react';
import ReactDOM from 'react-dom'; //use

class CustomHeader extends Component {
    render() {
        return (
           <div>
            <header id="fh5co-header-section" className="sticky-banner">
            <div className="container">
                <div className="nav-header">
                	<a href="#" className="js-fh5co-nav-toggle fh5co-nav-toggle dark"><i></i></a>
                    <h1 id="fh5co-logo"><a href="index.html"><i className="icon-airplane"></i>Cheapliner</a></h1>
                	 <nav id="fh5co-menu-wrap" role="navigation">
                        <ul className="sf-menu" id="fh5co-primary-menu">
                            <li>
                                <a href="vacation.html" className="fh5co-sub-down">Currency</a>
                                <ul className="fh5co-sub-menu">
                                    <li><a href="#">USD</a></li>
                                    <li><a href="#">EUR</a></li>
                                    <li><a href="#">GBP</a></li>
                                    <li><a href="#">Node JS</a></li>
                                    <li><a href="#">Django &amp; Python</a></li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                
                </div>
            </div>
        </header>
        </div>
        );
    }
}

export default CustomHeader;//namespace
