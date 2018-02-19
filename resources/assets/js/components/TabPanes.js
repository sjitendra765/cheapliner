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
                    flying_class:'',
                    adults: '',
                    children: '0',
                    sorttype:'price',
                    sortorder:'asc',
                    inboundDepartEndTime: '23:59',
                    inboundDepartStartTime:'00:00',
                    outboundDepartEndTime:'23:59',
                    outboundDepartStartTime:'00:00',
                    duration: 1800,
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
    var date_start = document.getElementById("date_start").value
    var date_end = document.getElementById("date_end").value;
    var pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
    var date_start = new Date(date_start.replace(pattern,'$3-$2-$1'));
    var date_end = new Date(date_end.replace(pattern,'$3-$2-$1'));

    console.log("sfsdfxbfxb",this.state.flyingData.from_place)
    console.log("new data",document.getElementsByName('from_place')[0].value)
    var checked = false
    if (document.getElementsByName('from_place')[0].value == ''){
        this.setState({ errFrom : ''})
        checked = true
    }
    if (document.getElementsByName('to_place')[0].value == ''){
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
    var from_place = document.getElementsByName('from_place')[0].value;
    var to_place = document.getElementsByName('to_place')[0].value; 
    var date_start = document.getElementById("date_start").value
    var date_end = document.getElementById("date_end").value;   
    var flyingclass = document.getElementById("flying_class").value
    var adults = document.getElementById("adults").value
    var children = document.getElementById("children").value
    var currency = document.getElementById("currency").value


    console.log(typeof date_end+ "date")

    //var flyingData={...this.state.flyingData};
    var flyingData = {};
    flyingData.from_place=from_place;
    flyingData.to_place = to_place;
    flyingData.flying_class = flyingclass;
    flyingData.adults = adults;
    flyingData.children = children;
    flyingData.currency = currency;
    flyingData.date_start = date_start;
    flyingData.date_end = date_end;
    flyingData.sorttype = 'price';
    flyingData.sortorder = 'asc';
    console.log("sfdfd")
    console.log("the data to send",flyingData)
    this.setState({
            flyingData:flyingData
        })
    console.log("jhvhfcfd",this.state)
    //flyingData.stops = null;
    var query = querystring.stringify(flyingData)
    console.log("final query", query)
    this.setState({modalIsOpen: true, disabled: "disabled"});
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
            <div className="tab-content">
            <form className="form-horizontal" role="form" onSubmit={this.handleSubmit}>
                                    
                                     <div role="tabpanel" className="tab-pane active" id="flights">
                                        <div className="row">
                                            <div className="col-xxs-12 col-xs-6 mt">
                                                <div className="input-field">
                                                    <label htmlFor="from">From:</label>
                                                    <Select
        name="from_place"
        id="from_place"
        value={this.state.flyingData.from_place}
        options={options}
        disabled= {this.state.disabled}
        selectComponent={Creatable}
        onInputChange={this.getautosuggest.bind(this)}
        onChange={val => {var flyingData={...this.state.flyingData};flyingData.from_place=val;this.setState({flyingData: flyingData,errFrom: "hidden"})}}
        
        
    /><span hidden={this.state.errFrom} style={{color:"red"}}>This field is required</span>
                                                </div>
                                            </div>
                                            <div className="col-xxs-12 col-xs-6 mt">
                                                <div className="input-field">
                                                    <label htmlFor="from">To:</label>
                                                    <Select
        name="to_place"
        id="to_place"
        value={this.state.flyingData.to_place}
        options={options2}
        disabled= {this.state.disabled}
        selectComponent={Creatable}
        onChange={val => {var flyingData={...this.state.flyingData};flyingData.to_place=val;this.setState({flyingData:flyingData,errTo: "hidden",sameair:"hidden"})}}
        onInputChange={this.getautosuggest2.bind(this)}
        
    /><span hidden={this.state.errTo} style={{color:"red"}}>This field is required</span>
    <span hidden={this.state.sameair} style={{color:"red"}}>The ariport should not be same</span>
                                                </div>
                                            </div>
                                            <div className="col-xxs-12 col-xs-6 mt alternate">
                                                <div className="input-field">
                                                    <label htmlFor="date-start">Check In:</label>
                                                    <input className="form-control datepicker" disabled= {this.state.disabled} data-provide="datepicker" data-date-format="dd.mm.yyyy" id = "date_start" name="date_start" onSelect={this.handleChange} placeholder="dd.mm.yyyy"/>
                                                    <span hidden={this.state.errdateStart} style={{color:"red"}}>This field is required</span>
                                                    <span hidden={this.state.errdate} style={{color:"red"}}>Date must be today or future</span>
                                                    
                                                </div>
                                            </div>
                                            <div className="col-xxs-12 col-xs-6 mt alternate">
                                                <div className="input-field">
                                                    <label htmlFor="date-end">Check Out:</label>
                                                    <input className="form-control datepicker" disabled= {this.state.disabled} data-provide="datepicker" id = "date_end" data-date-format="dd.mm.yyyy" name="date_end"  onSelect={this.handleChange}  placeholder="dd.mm.yyyy"/>
                                                    <span hidden={this.state.errDateEnd} style={{color:"red"}}>This field is required</span>
                                                    <span hidden={this.state.errdateE} style={{color:"red"}}>The date must be after the Check In date</span>
                                                    
                                                </div>
                                            </div>
                                            <div className="col-xxs-12 col-xs-6 mt alternate">
                                                <section>
                                                    <label htmlFor="className">class:</label>
                                                    <select className="cs-select cs-skin-border" disabled= {this.state.disabled} name="flying_class" id="flying_class" value={this.state.flyingData.flying_class} onChange={this.handleChange} >
                                                    
                                                        <option value="economy">Economy</option>
                                                        <option value="first">First</option>
                                                        <option value="business">Business</option>
                                                    </select>
                                                </section>
                                            </div>
                                            <div className="col-xxs-12 col-xs-6 mt">
                                                <section>
                                                    <label htmlFor="className">Adult:</label>
                                                    <select className="cs-select cs-skin-border" disabled= {this.state.disabled} name="adults" id="adults" value={this.state.flyingData.adults} onChange={this.handleChange} >
                                                        
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                    </select>
                                                </section>
                                            </div>
                                            <div className="col-xxs-12 col-xs-6 mt">
                                                <section>
                                                    <label htmlFor="className">Children:</label>
                                                    <select className="cs-select cs-skin-border" disabled id="children" name="children" value={this.state.flyingData.children} onChange={this.handleChange} >
                                                        <option value="0">0</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                    </select>
                                                </section>
                                            </div>
					   <div className="col-xxs-12 col-xs-6 mt">
						<section>
                                                    <label htmlFor="className">Currency:</label>
                                                    <select className="cs-select cs-skin-border" disabled id="currency" name="currency" value={this.state.flyingData.currency} onChange={this.handleChange} >
                                                        <option value="EUR">EUR</option>
                                                        <option value="USD">USD</option>
                                                        <option value="GBP">GBP</option>
                                                    </select>
                                                </section>
                                            </div>
                                            <div className="col-xs-12">
                                                <input type="submit" className="btn btn-primary btn-block" disabled= {this.state.disabled} value="Search Flight" />
                                            </div>
                                        </div>
                                      </div>
                                        </form>
                                        {pop}
                                        <button hidden="hidden"><Link to="/listflight" id="hidbut"  >demo</Link></button>
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


