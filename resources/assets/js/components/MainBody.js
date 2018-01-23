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
    	
        return (
           <div className="col-sm-5 col-md-5">
                <div className="tabulation animate-box">
                    <NavBar />
                    <TabPanes />
                    <Link to="/listflight">
                    <button>Go to About</button>
                </Link>
                </div>
          	</div>
        );
    }
}

export default MainBody;



