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
import * as actions from './actions'


class TabPanes extends Component {
    constructor(props) {
    super(props);
    this.state = {
            flyingData:{
                from_place: '',
                  to_place:'',
                  date_start:'',
                    date_end: '',
                    flying_class:'economy',
                    adults: '',
                    children: ''
                },
                options:[]

                
            }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getautosuggest(input){
    if(input !=''){
    var val = input
    console.log(input)
    var query = querystring.stringify({"demo":"dsjcb"})
    axios.get('/autoSuggest/'+ val)
    .then(r=>{
        var option = [];
        console.log(r)
        r.data.Places.map(place=>{
            var placeId = place.PlaceId.replace("-sky","");
            var values = {value:placeId, label: placeId + "-" + place.PlaceName}
            option.push(values)
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
   handleChange(event) {
    console.log("gyhgfdfghj")
    const target = event.target;
    const value =  target.value;
    const name = target.name;
    var flyingData={
        ...this.state.flyingData,
        [name]:value
    };
    console.log("Sdgg",flyingData)
    this.setState({
      flyingData
    });
  }
   handleSubmit(event) {
    event.preventDefault();
    //alert('Your favorite flavor is: ' + this.state);
    var from_place = this.state.flyingData.from_place.value;
    var to_place = this.state.flyingData.to_place.value;
    console.log(from_place)
    
    var flyingData={...this.state.flyingData};
    flyingData.from_place=from_place;
    flyingData.to_place = to_place;
    this.setState({flyingData})
    console.log("jhvhfcfd",this.state.flyingData)
    var query  = querystring(this.state.flyingData)
    axios.post('/flightSearch',query)
  .then(function (response) {
    this.props.createFlight(response);
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
    
  }
    render() {
        const options = this.state.options;

      
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
        value={this.state.flyingData.from_place}
        options={options}
        selectComponent={Creatable}
        onChange={val => {var flyingData={...this.state.flyingData};flyingData.from_place=val;this.setState({flyingData})}}
        onInputChange={this.getautosuggest.bind(this)}
        
    />
                                                </div>
                                            </div>
                                            <div className="col-xxs-12 col-xs-6 mt">
                                                <div className="input-field">
                                                    <label htmlFor="from">To:</label>
                                                    <Select
        name="to_place"
        value={this.state.flyingData.to_place}
        options={options}
        selectComponent={Creatable}
        onChange={val => {var flyingData={...this.state.flyingData};flyingData.to_place=val;this.setState({flyingData})}}
        onInputChange={this.getautosuggest.bind(this)}
        
    />
                                                </div>
                                            </div>
                                            <div className="col-xxs-12 col-xs-6 mt alternate">
                                                <div className="input-field">
                                                    <label htmlFor="date-start">Check In:</label>
                                                    <input className="form-control datepicker" data-provide="datepicker" data-date-format="dd.mm.yyyy" name="date_start" value={this.state.flyingData.date_start} onChange={this.handleChange} placeholder="mm/dd/yyyy"/>
                                                </div>
                                            </div>
                                            <div className="col-xxs-12 col-xs-6 mt alternate">
                                                <div className="input-field">
                                                    <label htmlFor="date-end">Check Out:</label>
                                                    <input className="form-control datepicker" data-provide="datepicker" data-date-format="dd.mm.yyyy" name="date_end" value={this.state.flyingData.date_end} onChange={this.handleChange}  placeholder="mm/dd/yyyy"/>
                                                </div>
                                            </div>
                                            <div className="col-xxs-12 col-xs-6 mt alternate">
                                                <section>
                                                    <label htmlFor="className">className:</label>
                                                    <select className="cs-select cs-skin-border" name="flying_class" value={this.state.flyingData.flying_class} onChange={this.handleChange} >
                                                        <option value="" >Economy</option>
                                                        <option value="economy">Economy</option>
                                                        <option value="first">First</option>
                                                        <option value="business">Business</option>
                                                    </select>
                                                </section>
                                            </div>
                                            <div className="col-xxs-12 col-xs-6 mt">
                                                <section>
                                                    <label htmlFor="className">Adult:</label>
                                                    <select className="cs-select cs-skin-border" name="adults" value={this.state.flyingData.adults} onChange={this.handleChange} >
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
                                                    <select className="cs-select cs-skin-border" name="children" value={this.state.flyingData.children} onChange={this.handleChange} >
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                    </select>
                                                </section>
                                            </div>
                                            <div className="col-xs-12">
                                                <input type="submit" className="btn btn-primary btn-block" value="Search Flight" />
                                            </div>
                                        </div>
                                      </div>
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

const mapDsipatchToProps = (dispatch) =>{
    return {
        createFlight: flight => dispatch(actions.createFlight(flight))
    }
}


export default connect(mapStateToProps,mapDsipatchToProps)(TabPanes);


