import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import NavBar from './NavBar';
import TabPanes from './TabPanes'
import {Link} from 'react-router-dom';
import Slider from './sections/Slider';
import HowItworks from './sections/HowItworks';
import SectionOne from './sections/SectionOne';
import SectionTwo from './sections/SectionTwo';
import SectionThree from './sections/SectionThree';
import SectionFour from './sections/SectionFour';
import SectionFive from './sections/SectionFive';
import Footer from './sections/SectionFooter';
 


class MainBody extends Component {
       constructor(props) {
    super(props);
}
    render() {
    	 var divStyle = {
            backgroundImage: 'url(images/cover_bg_3.jpg)'
        }
        return (
            <div>


                                                 <TabPanes />

            <HowItworks />
            <SectionOne />
            <SectionTwo />
            <SectionThree />
            <SectionFour />
            <SectionFive />
            <Footer />
            </div>

        );
    }
}

export default MainBody;



