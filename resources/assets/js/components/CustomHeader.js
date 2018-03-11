import React, { Component } from 'react';
import ReactDOM from 'react-dom'; //use

class CustomHeader extends Component {
    render() {
        return (
            <section>
            <div className="clearfix"></div>
            <div className="row transparent-menu">
            <div className="container clear-padding">

        <div className="navbar-wrapper">
            <div className="navbar navbar-default" role="navigation">

        <div className="nav-container">
            <div className="navbar-header">

        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            </button>

            <a className="navbar-brand logo" href="index.html">CHEAPLINER</a>
            </div>
            </div>

            </div>
            </div>

            </div>
            </div>
            </section>
        );
    }
}

export default CustomHeader;//namespace
