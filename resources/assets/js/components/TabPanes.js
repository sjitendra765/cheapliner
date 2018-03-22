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
import Slider from './sections/Slider'
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
                    flying_class:'',
                    adults: '1',
                    children: '0',
                    sorttype:'',
                    sortorder:'',
                    inboundDepartEndTime: '23:59',
                    inboundDepartStartTime:'00:00',
                    outboundDepartEndTime:'23:59',
                    outboundDepartStartTime:'00:00',
                    duration: '',
                    pageindex: 0,
                    pagesize: 10,
                    way:2,
		    currency: 'EUR'
                },
            place:{
                 from_place:{},
                to_place:{}
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
            var country = place.CountryName;
            var placeName = place.PlaceName;
            var val = {
                placeId: placeId,
                country: country,
                place: placeName
            }
            var values = {value:val, label: placeId.replace('-sky','') + "-" + place.PlaceName}
            option.push(values)
        }
        })
        console.log(option)        
       this.setState({
            options:option,
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
            var country = place.CountryName;
            var placeName = place.PlaceName;
            var val = {
                placeId: placeId,
                country: country,
                place: placeName
            }
            var values = {value:val, label: placeId.replace('-sky','') + "-" + place.PlaceName}
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
    if(name == 'departure_date'){
        this.setState({ errdateStart: "hidden"})
        this.setState({ errdate: "hidden"})

    }
    if(name == 'return_date'){
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
    setTrip(val){
       var flyingData = this.state.flyingData;
       flyingData.way = val;
       this.setState(
           {
               flyingData
           }
       )
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
    if (document.getElementById("departure_date").value == ''){
        this.setState({ errdateStart : ''})
        checked = true
        
    }
    if(this.state.flyingData.way==2) {
        if (document.getElementById("return_date").value == '') {
            this.setState({errDateEnd: ''})
            checked = true

        }
    }
    if (date_start < new Date() ){
        this.setState({ errdate : ''})
        checked = true
    }
     if (date_start > date_end ){
        this.setState({ errdateE : ''})
        checked = true
    }
    if(this.state.flyingData.from_place == this.state.flyingData.to_place){
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
        var date_start = document.getElementById("departure_date").value
        var date_end = document.getElementById("return_date").value;
        var pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
    var date_start = new Date(date_start.replace(pattern,'$3-$2-$1'));
    var date_end = new Date(date_end.replace(pattern,'$3-$2-$1'));

    console.log("sfsdfxbfxb",this.state.flyingData.from_place)
    console.log("new data",document.getElementsByName('from_place')[0].value)
    var from_place = document.getElementsByName('from_place')[0].value.placeId;
    var to_place = document.getElementsByName('to_place')[0].value.placeId;
    var date_start = document.getElementById("departure_date").value
    var date_end = document.getElementById("return_date").value;
    var flyingclass = document.getElementById("flying_class").value
    var adults = document.getElementById("adult_count").value
    var children = document.getElementById("child_count").value
  var currency = "EUR"


    console.log(typeof date_end+ "date")

    //var flyingData={...this.state.flyingData};
    var flyingData = {};
    flyingData.from_place=this.state.flyingData.from_place.value.placeId;
    flyingData.to_place = this.state.flyingData.to_place.value.placeId;
    flyingData.flying_class = flyingclass;
    flyingData.adults = adults;
    flyingData.children = children;
    flyingData.currency = currency;
    flyingData.date_start = date_start;
    flyingData.date_end = date_end;
    flyingData.sorttype = '';
    flyingData.sortorder = '';
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


        if(data.data[0].OutboundLegId) {
            this.props.createFlight(data.data);
            console.log("places",this.state.place)
            this.props.createPlace(this.state.place)
            this.props.queryList(this.state.flyingData)
            this.setState({modalIsOpen: false});
            console.log(typeof data.data);
            document.getElementById('hidbut').click();
        }
        else{
            this.setState({modalIsOpen: false});

            alert("No flights are available")
        }



  //this.props.router.push('localhost:8000/listflight')

/*window.location.href='/listflight?'+query;*/
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
          dataBackdrop={"static"}
          dataKeyboard={"false"}
        />
        </Modal>);
      
        return (
            <section>
            { pop }
            <div className="row full-width-search">
            <div className="container clear-padding">
            <div className="col-md-8 search-section">
            <div role="tabpanel">

        <ul className="nav nav-tabs search-top" role="tablist" id="searchTab">
            <li role="presentation" className="active text-center">
            <a href="#flight" aria-controls="flight" role="tab" data-toggle="tab">
            <i className="fa fa-plane"></i>
            <span>FLIGHTS</span>
            </a>
            </li>
            </ul>

            <div className="tab-content">

            <div role="tabpanel" className="tab-pane active" id="flight">
            <form onSubmit={this.handleSubmit} method="GET" action="/flightsearch">
           <input type='hidden' name='_token' value="<?php echo csrf_token() ?>" />
    <div className="col-md-12 product-search-title">Book Flight Tickets</div>
        <div className="col-md-12 search-col-padding">
            <label className="radio-inline">
            <input type="radio" className="radio-event-hanlder" name="inlineRadioOptions" id="inlineRadio1" value="1" onChange={this.setTrip.bind(this,1)}/> One Way
        </label>
        <label className="radio-inline">
            <input type="radio" className="radio-event-hanlder" name="inlineRadioOptions" id="inlineRadio2" value="2" onChange={this.setTrip.bind(this,2)} /> Round Trip
        </label>
        </div>
        <div className="clearfix"></div>
            <div className="col-md-6 col-sm-6 search-col-padding">
            <label>Leaving From</label>
        <div className="input-group">
            <Select
        name="from_place"
        value={this.state.flyingData.from_place}
        options={options}
        selectComponent={Creatable}
        onChange={val => {var flyingData={...this.state.flyingData};flyingData.from_place=val;var place={...this.state.place};place.from_place=val.value;this.setState({flyingData,place,errFrom: "hidden"})}}
        onInputChange={this.getautosuggest.bind(this)}
        arrowRender={null,null}





        />

            <span className="input-group-addon"><i className="fa fa-map-marker fa-fw"></i></span>


        </div>
        <span hidden={this.state.errFrom} style={{color:"red"}} className="col-md-12 col-sm-12">This field is required</span>
        </div>
        <div className="col-md-6 col-sm-6 search-col-padding">
            <label>Leaving To</label>
        <div className="input-group">

            <Select
        name="to_place"
        value={this.state.flyingData.to_place}
        options={options2}
        selectComponent={Creatable}
        onChange={val => {var flyingData={...this.state.flyingData};flyingData.to_place=val;console.log(val);var place = {...this.state.place};place.to_place=val.value;this.setState({flyingData,place,errTo: "hidden",sameair:"hidden",})}}
        onInputChange={this.getautosuggest2.bind(this)}


        />
            <span className="input-group-addon"><i className="fa fa-map-marker fa-fw"></i></span>

        </div>

        <span hidden={this.state.errTo} style={{color:"red"}} className="col-md-12 col-sm-12">This field is required</span>
        <span hidden={this.state.sameair} style={{color:"red"}} className="col-md-12 col-sm-12">The ariport should not be same</span>
        </div>
        <div className="clearfix"></div>
            <div className="col-md-6 col-sm-6 search-col-padding">
            <label>Departure</label>
            <div className="input-group">
            <input type="text" id="departure_date" name="departure_date" onSelect={this.handleChange}  className="form-control" placeholder="DD/MM/YYYY"/>
            <span className="input-group-addon"><i className="fa fa-calendar fa-fw"></i></span>

        </div>

        <span hidden={this.state.errdateStart} style={{color:"red"}} className="col-md-12 col-sm-12">This field is required</span>
        <span hidden={this.state.errdate} style={{color:"red"}} className="col-md-12 col-sm-12">Date must be today or future</span>
        </div>
        <div className="col-md-6 col-sm-6 search-col-padding">
            <label>Return</label>
            <div className="input-group">
            <input type="text" id="return_date" className="form-control" onSelect={this.handleChange} name="return_date" placeholder="DD/MM/YYYY" />
            <span className="input-group-addon"><i className="fa fa-calendar fa-fw"></i></span>
           </div>

        <span hidden={this.state.errDateEnd} style={{color:"red"}} className="col-md-12 col-sm-12">This field is required</span>
        <span hidden={this.state.errdateE} style={{color:"red"}} className="col-md-12 col-sm-12">The date must be after the Check In date</span>

        </div>
        <div className="clearfix"></div>
            <div className="col-md-4 col-sm-4 search-col-padding">
            <label>Adult</label><br />
            <input id="adult_count" name="adult_count" value={this.state.flyingData.adults} onChange={this.handleChange} className="form-control quantity-padding" />
            </div>
            <div className="col-md-4 col-sm-4 search-col-padding">
            <label>Child</label><br />
            <input type="text" id="child_count" name="child_count" value={this.state.flyingData.children} onChange={this.handleChange}className="form-control quantity-padding" />
            </div>
            <div className="col-md-4 col-sm-4 search-col-padding">
            <label>Class</label><br/>
            <div>
            <select className="selectpicker cs-select cs-skin-border" name="flying_class" id="flying_class" value={this.state.flyingData.flying_class} onChange={this.handleChange} >
            <option>Business</option>
            <option>Economy</option>
            </select>
            </div>
            </div>
        <div className="clearfix"></div>
            <div className="col-md-12 search-col-padding">
            <button type="submit" className="search-button btn transition-effect">Search Flights</button>
        </div>
        <div className="clearfix"></div>
            </form>
            <button hidden="hidden"><Link to="/listflight" id="hidbut"  >demo</Link></button>
            </div>


            </div>

            </div>
        </div>
            <Slider />
        </div>
        </div>
        </section>
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
        queryList : query => dispatch(actions.queryList(query)),
        createPlace: place=> dispatch(actions.createPlace(place))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(TabPanes);


