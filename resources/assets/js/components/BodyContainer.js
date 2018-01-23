import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MainBody from './MainBody';

class BodyContainer extends Component {
     constructor(props) {
    super(props);
}
    render() {
    	
        return (
           <div className="container">
                <div className="row">
               <main> {this.props.children}</main>
                </div>
          	</div>
        );
    }
}

export default BodyContainer;



