import React, { Component } from 'react';
import ReactDOM from 'react-dom';


class NavBar extends Component {
    render() {
    	
        return (
            <ul className="nav nav-tabs" role="tablist">
                                      <li role="presentation" className="active">
                                        <a href="#flights" aria-controls="flights" role="tab" data-toggle="tab">Flights</a>
                                      </li>
                                      <li role="presentation">
                                           <a href="#hotels" aria-controls="hotels" role="tab" data-toggle="tab">Hotels</a>
                                      </li>
                                      <li role="presentation">
                                           <a href="#packages" aria-controls="packages" role="tab" data-toggle="tab">Packages</a>
                                      </li>
             </ul>
        );
    }
}

export default NavBar;



