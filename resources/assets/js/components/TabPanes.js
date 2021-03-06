import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import querystring from 'querystring'
import { Creatable } from 'react-select'
import Select from 'react-virtualized-select';
import createFilterOptions from 'react-select-fast-filter-options';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'
import Modal from 'react-modal';
import { ClipLoader } from 'react-spinners';
import * as actions from './actions'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import 'babel-polyfill';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class TabPanes extends Component {
    constructor(props) {
    super(props);
    this.state = {
             modalIsOpen: false,
             loading: true,
            flyingData:{
                from_place: '',
                  to_place:'',
                  date_start:'',
                    date_end: '',
                    flying_className:'',
                    adults: '',
                    children: '0',
                    sorttype:'price',
                    sortorder:'asc',
                    inboundDepartEndTime: '23:59',
                    inboundDepartStartTime:'00:00',
                    outboundDepartEndTime:'23:59',
                    outboundDepartStartTime:'00:00',
                    duration: '',
                    pageindex: 0,
                    pagesize: 10,
		    currency: 'EUR'
                },
                options:[],
                options2:[],
                redirect: "false",
                errFrom:'hidden',
                errTo: 'hidden',
                errdateStart:'hidden',
                errDateEnd:'hidden',
                errdateE: 'hidden',
                errdate: 'hidden',
                sameair:'hidden',
                disabled: ''
                
            }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }
  getautosuggest(input){
    if(input !=''){
    var val = input
    console.log(input)
    var query = querystring.stringify({"demo":"dsjcb"})
    axios.get('/api/autoSuggest/'+ val)
    .then(r=>{
        var option = [];
        console.log(r)
        r.data.Places.map(place=>{
            if(place.CityId != '-sky'){
            var placeId = place.PlaceId;
            var values = {value:placeId, label: placeId.replace('-sky','') + "-" + place.PlaceName}
            option.push(values)
        }
        })
        console.log(option)        
       this.setState({
            options:option
        })
    })
    .catch(err=>console.log(err))
    return input;
    }
  }
   getautosuggest2(input){
    if(input !=''){
    var val = input
    console.log(input)
    var query = querystring.stringify({"demo":"dsjcb"})
    axios.get('/api/autoSuggest/'+ val)
    .then(r=>{      
        var option = [];
        console.log(r)
        r.data.Places.map(place=>{
            if(place.CityId != '-sky'){
            var placeId = place.PlaceId;
            var values = {value:placeId, label: placeId.replace('-sky','') + "-" + place.PlaceName}
            option.push(values)
            }
        })
        console.log(option)        
        this.setState({
            options2:option
        })
    })
    .catch(err=>console.log(err))
    return input;
    }
  }
   handleChange(event) {
    console.log("gyhgfdfghj date")
    const target = event.target;
    const value =  target.value;
    const name = target.name;
    if(name == 'date_start'){
        this.setState({ errdateStart: "hidden"})
        this.setState({ errdate: "hidden"})

    }
    if(name == 'date_end'){
        this.setState({errDateEnd: "hidden"})
        this.setState({ errdateE: "hidden"})

    }
    var flyingData={
        ...this.state.flyingData,
        [name]:value
    };
    console.log("Sdgg",flyingData)
    this.setState({
      flyingData
    });
  }
 async handleSubmit(event) {
   event.preventDefault(); 
    //alert('Your favorite flavor is: ' + this.state);
    
    var checked = false
    if (this.state.flyingData.from_place == ''){
        this.setState({ errFrom : ''})
        checked = true
    }
    if (this.state.flyingData.to_place == ''){
        console.log(this.state.errFrom)
        this.setState({ errTo : ''})
        checked = true
        
    }
    if (document.getElementById("date_start").value == ''){
        this.setState({ errdateStart : ''})
        checked = true
        
    }
    if (document.getElementById("date_end").value == ''){
        this.setState({ errDateEnd : ''})
        checked = true
        
    }
    if (date_start < new Date() ){
        this.setState({ errdate : ''})
        checked = true
    }
     if (date_start > date_end ){
        this.setState({ errdateE : ''})
        checked = true
    }
    if(document.getElementsByName('from_place')[0].value == document.getElementsByName('to_place')[0].value){
        this.setState({sameair:''})
        checked=true
    }


        console.log("redirect",this.state.redirect)
    if(checked){
        return;
    }else{
    //console.log("wht the fuck",this.state.modalValue)
    //if(this.state.modalValue != ''){
    //    this.setState({modalIsOpen:true})
    //    return;
    //}
    var date_start = document.getElementById("date_start").value
    var date_end = document.getElementById("date_end").value;
    var pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
    var date_start = new Date(date_start.replace(pattern,'$3-$2-$1'));
    var date_end = new Date(date_end.replace(pattern,'$3-$2-$1'));

    console.log("sfsdfxbfxb",this.state.flyingData.from_place)
    console.log("new data",document.getElementsByName('from_place')[0].value)
    var from_place = document.getElementsByName('from_place')[0].value;
    var to_place = document.getElementsByName('to_place')[0].value; 
    var date_start = document.getElementById("date_start").value
    var date_end = document.getElementById("date_end").value;   
    var flyingclassName = document.getElementById("flying_className").value
    var adults = document.getElementById("adults").value
    var children = document.getElementById("children").value
    var currency = document.getElementById("currency").value


    console.log(typeof date_end+ "date")

    //var flyingData={...this.state.flyingData};
    var flyingData = {};
    flyingData.from_place=from_place;
    flyingData.to_place = to_place;
    flyingData.flying_className = flyingclassName;
    flyingData.adults = adults;
    flyingData.children = children;
    flyingData.currency = currency;
    flyingData.date_start = date_start;
    flyingData.date_end = date_end;
    flyingData.sorttype = 'price';
    flyingData.sortorder = 'asc';
    flyingData.pagesize = 10;
    flyingData.pageindex =0;
    console.log("sfdfd")
    console.log("the data to send",flyingData)
    this.setState({
            flyingData:flyingData
        })
    console.log("jhvhfcfd",this.state)
    //flyingData.stops = null;
    var query = querystring.stringify(flyingData)
    console.log("final query", query)
    this.setState({modalIsOpen: true});
   var data = await axios.post('/api/flightSearch',query)



  
  this.props.createFlight(data.data);
  this.props.queryList(this.state.flyingData)
  this.setState({modalIsOpen: false});
  document.getElementById('hidbut').click();
  //this.props.router.push('localhost:8000/listflight')

 // window.location.href='/listflight';
 }
  }
    render() {
        const options = this.state.options;
        const options2 = this.state.options2;
        var pop = ( <Modal
          isOpen={this.state.modalIsOpen}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <ClipLoader
          color={'#123abc'} 
          loading={this.state.loading} 
        />
        </Modal>);
      
        return (
            <div role="tabpanel" className="tab-pane active" id="flight">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="col-md-12 product-search-title">Book Flight Tickets</div>
                                    <div className="col-md-12 search-col-padding">
                                        <label className="radio-inline">
                                            <input type="radio" name="inlineRadioOptions" id="inlineRadio1" value="One Way"> One Way
                                        </label>
                                        <label className="radio-inline">
                                            <input type="radio" name="inlineRadioOptions" id="inlineRadio2" value="Round Trip"> Round Trip
                                        </label>
                                    </div>
                                    <div className="clearfix"></div>
                                    <div className="col-md-6 col-sm-6 search-col-padding">
                                        <label>Leaving From</label>
                                        <div className="input-group">
                                            <input type="text" name="departure_city" className="form-control" required placeholder="E.g. London">
                                            <span className="input-group-addon"><i className="fa fa-map-marker fa-fw"></i></span>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-6 search-col-padding">
                                        <label>Leaving To</label>
                                        <div className="input-group">
                                            <input type="text" name="destination_city" className="form-control" required placeholder="E.g. New York">
                                            <span className="input-group-addon"><i className="fa fa-map-marker fa-fw"></i></span>
                                        </div>
                                    </div>
                                    <div className="clearfix"></div>
                                    <div className="col-md-6 col-sm-6 search-col-padding">
                                        <label>Departure</label>
                                        <div className="input-group">
                                            <input type="text" id="departure_date" name="departure_date" onSelect={this.handleChange} className="form-control" placeholder="DD/MM/YYYY">
                                            <span className="input-group-addon"><i className="fa fa-calendar fa-fw"></i></span>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-6 search-col-padding">
                                        <label>Return</label>
                                        <div className="input-group">
                                            <input type="text" id="return_date" className="form-control" onSelect={this.handleChange} name="return_date" placeholder="DD/MM/YYYY">
                                            <span className="input-group-addon"><i className="fa fa-calendar fa-fw"></i></span>
                                        </div>
                                    </div>
                                    <div className="clearfix"></div>
                                    <div className="col-md-4 col-sm-4 search-col-padding">
                                        <label>Adult</label><br>
                                        <input id="adult_count" name="adult_count" value={this.state.flyingData.adults} onChange={this.handleChange} className="form-control quantity-padding">
                                    </div>
                                    <div className="col-md-4 col-sm-4 search-col-padding">
                                        <label>Child</label><br>
                                        <input type="text" id="child_count" name="child_count" value={this.state.flyingData.children} onChange={this.handleChange}className="form-control quantity-padding">
                                    </div>
                                    <div className="col-md-4 col-sm-4 search-col-padding">
                                        <label>className</label><br>
                                        <select className="selectpicker" value={this.state.flyingData.flying_class} onChange={this.handleChange} >
                                            <option>Business</option>
                                            <option>Economy</option>
                                        </select>
                                    </div>
                                    <div className="clearfix"></div>
                                    <div className="col-md-12 search-col-padding">
                                        <button type="submit" className="search-button btn transition-effect">Search Flights</button>
                                    </div>
                                    <div className="clearfix"></div>
                                </form>
                            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) =>{
    return {
        flights: state.flight
    }
} 

const mapDispatchToProps = (dispatch) =>{
    return {
        createFlight: flight => dispatch(actions.createFlight(flight)),
        queryList : query => dispatch(actions.queryList(query))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(TabPanes);


