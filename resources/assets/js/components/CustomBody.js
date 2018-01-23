import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import BodyConatiner from './BodyContainer'

class CustomHeader extends Component {
      constructor(props) {
    super(props);
}
    render() {
    	var divStyle = {
    		backgroundImage: 'url(images/cover_bg_3.jpg)'
    	}
        return (
           <div className="fh5co-hero">
            <div className="fh5co-overlay"></div>
            <div className="fh5co-cover" style={divStyle}>
                <div className="desc">
                <BodyConatiner />
                </div>
            </div>
          	</div>
        );
    }
}

export default CustomHeader;



