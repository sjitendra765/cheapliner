import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import NavBar from './NavBar';
import TabPanes from './TabPanes'
import {Link} from 'react-router-dom';
 


class MainBody extends Component {
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
                                <div className="container">
                                      <div className="row">
                                        <div className="col-sm-5 col-md-5">
                                             <div className="tabulation animate-box">
                                                 <NavBar />
                                                 <TabPanes />
                                                 
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

export default MainBody;



