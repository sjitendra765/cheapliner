import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import NavBar from './NavBar';
import { Creatable } from 'react-select'
import Select from 'react-virtualized-select';
import createFilterOptions from 'react-select-fast-filter-options';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'
import InputRange from 'react-input-range';
import axios from 'axios';
import querystring from 'querystring'
import TabPanes from './TabPanes'
import { connect } from 'react-redux'
import 'react-input-range/lib/css/index.css'
import 'babel-polyfill';
import * as actions from './actions'
import Modal from 'react-modal';
import { ClipLoader } from 'react-spinners';

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

class ListFlight extends Component {
       constructor(props) {
    super(props);
    this.state={
      modalIsOpen: false,
             loading: true,
      flyingData: {},
      flights: this.props.flights,
      list: [],
      value: { min: 0, max: 23 },
      sortedValue: '',
      timeArr:null,
      timeLan:null,
      sortedList:[],
      stops:{
        onestop: 'checked',
        nonstop: 'checked',
        twoplus: 'checked'
      }
    }
}

 componentWillMount(){
  this.setState({flights:this.props.flights})
  this.setState({flyingData: this.props.query})
  var flightArr = []
  this.state.flights.map(f => {
      var list = {}
      
      list.price = f.Agent.Price;
      list.img = f.OutboundLeg.FlightNumbers[0].Carrier.ImageUrl;
      list.odeparture = f.OutboundLeg.Departure.split('T')[1];
      list.od = f.OutboundLeg.Duration;
      list.oarrival = f.OutboundLeg.Arrival.split('T')[1];
      list.departure =  f.InboundLeg.Departure.split('T')[1];
      list.d = f.InboundLeg.Duration;
      list.arrival = f.InboundLeg.Arrival.split('T')[1];
      list.name = f.Agent.Name;
      list.ostops = f.OutboundLeg.Stops.length
      if(list.ostops == 0){
        list.ostops = "Direct Flights"
      }
      else if( list.ostops == 1){
        list.ostops = "One Stop"
      }
      else{
        list.ostops = "More than one Stops"
      }
      list.stops = f.InboundLeg.Stops.length
      if(list.stops == 0){
        list.stops = "Direct Flights"
      }
      else if( list.stops == 1){
        list.stops = "One Stop"
      }
      else{
        list.stops = "More than one Stops"
      }
      list.duration = parseInt(list.d/60) + 'h(s) ' + (list.d)%60 + 'min'
      list.oduration = parseInt(list.od/60) + 'h(s) ' + (list.od)%60 + 'min'

      flightArr.push(list)
  })
  this.setState({list:flightArr})
 }
 componentWillReceiveProps(nextProps){
  console.log("next",nextProps)
  this.setState({flights:nextProps.flights})
  var flightArr = []
  nextProps.flights.map(f => {
      var list = {}
      
      list.price = f.Agent.Price;
      list.img = f.OutboundLeg.FlightNumbers[0].Carrier.ImageUrl;
      list.odeparture = f.OutboundLeg.Departure.split('T')[1];
      list.od = f.OutboundLeg.Duration;
      list.oarrival = f.OutboundLeg.Arrival.split('T')[1];
      list.departure =  f.InboundLeg.Departure.split('T')[1];
      list.d = f.InboundLeg.Duration;
      list.arrival = f.InboundLeg.Arrival.split('T')[1];
      list.name = f.Agent.Name;
      list.ostops = f.OutboundLeg.Stops.length
      if(list.ostops == 0){
        list.ostops = "Direct Flights"
      }
      else if( list.ostops == 1){
        list.ostops = "One Stop"
      }
      else{
        list.ostops = "More than one Stops"
      }
      list.stops = f.InboundLeg.Stops.length
      if(list.stops == 0){
        list.stops = "Direct Flights"
      }
      else if( list.stops == 1){
        list.stops = "One Stop"
      }
      else{
        list.stops = "More than one Stops"
      }
      list.duration = parseInt(list.d/60) + 'h(s) ' + (list.d)%60 + 'min'
      list.oduration = parseInt(list.od/60) + 'h(s) ' + (list.od)%60 + 'min'

      flightArr.push(list)
  })
  console.log(flightArr)
  this.setState({list:flightArr})
 }
  shouldComponentUpdate(nextProps, nextState) {
    //this.setState({flights:this.nextProps.flights})
    console.log("test",nextProps)
    return (nextProps !== nextState)
  }
 timeChange(val){
  var list = [];
console.log(val.min)
  this.state.list.map(r=>{
  if(r.oarrival.split(':')[0] > val.min && r.oarrival.split(':')[0] <= val.max){
      list.push(r)
  }
  })
  this.setState({list:list,value:val})
 }
async _onSelect(val){
  console.log("va;ue",val)
  this.setState({sortedValue:val})
  console.log(val.value)
  console.log(this.state.sortedValue)
  var flyingData = this.props.query;
  if(val.value=="cheapest"){
    flyingData.sorttype = 'price';
    flyingData.sortorder = 'asc';
  }
  if(val.value=="highest"){
    
    flyingData.sorttype = 'price';
    flyingData.sortorder = 'desc';
    
  }
  if(val.value=="quickest"){

    flyingData.sorttype = 'duration';
    flyingData.sortorder = 'asc';
  }
  if(val.value=="slowest"){
   flyingData.sorttype = 'duration';
    flyingData.sortorder = 'desc';
  }
  this.setState({
    flyingData: flyingData
  })
  this.setState({modalIsOpen: true});
  var query = querystring.stringify(flyingData)
    console.log(flyingData)
   var data = await axios.post('/api/flightSearch',query) 
   console.log(data) 
  this.props.createFlight(data.data);
  this.setState({modalIsOpen: false});
}
async changeStop(val){
   var flyingData = this.state.flyingData;
  if(val == 'one'){

      console.log("ayoone")

            if(this.state.stops.onestop == 'checked'){
              console.log("ayo")
              var stops = {...this.state.stops};
              stops.onestop = ''
            this.setState({stops: stops})
                  if(this.state.stops.nonstop == 'checked'){
                  flyingData.stops = 0;
                  }
                  else {
                    flyingData.stops = '';
                  }
        }
        else{
           var stops = {...this.state.stops};
          stops.onestop = 'checked'
        this.setState({stops: stops})
                  if(this.state.stops.nonstop == 'checked'){
                 flyingData.stops = '';
                 }
                 else {
                   flyingData.stops = 1;
                 }
        }
        if(this.state.stops.twoplus == 'checked'){
          flyingData.stops = '';
        }
  
  }
   else if(val == 'non'){
    
        if(this.state.stops.nonstop == 'checked'){
          var stops = {...this.state.stops};
          stops.nonstop = ''
        this.setState({stops: stops})
            if(this.state.stops.onestop == 'checked'){
            flyingData.stops = 1;
            }
            else {
              flyingData.stops = '';
            }
        }
        else  {
               var stops = {...this.state.stops};
              stops.nonstop = 'checked'
            this.setState({stops: stops})
            if(this.state.stops.onestop == 'checked'){
            flyingData.stops = '';
            }
            else {
              flyingData.stops = 0;
            }
        }
if(this.state.stops.twoplus == 'checked'){
          flyingData.stops = '';
        }
        }
  else
  {
    flyingData.stops = '';
  }

  if( val == 'two'){
     if(this.state.stops.twoplus == 'checked'){
          var stops = {...this.state.stops};
          stops.twoplus = ''
        this.setState({stops: stops})
      }
      else{
        var stops = {...this.state.stops};
          stops.twoplus = 'checked'
        this.setState({stops: stops}) 
      }
  }
 
  this.setState({modalIsOpen: true});
    
  var query = querystring.stringify(flyingData)
    console.log("flying data",flyingData)
   var data = await axios.post('/api/flightSearch',query) 
   console.log(data) 
  this.props.createFlight(data.data);
  this.setState({modalIsOpen: false});
}
   isSortBy(li,value){
          return li.sort((a,b) =>{
            return a.price- b.price
          })
      }

    render() {
      const options = [{"value": "cheapest","label":"Cheapest"},
      {"value": "highest","label":"Highest price"},
      {"value": "quickest","label":"Quickest"},
      {"value": "slowest","label":"Slowest"}];
      const defaultOption = options[0];
      var listTime = [];
      this.state.list.map(r=>{
        var l = r.oarrival.split(':')[0];
        listTime.push(l)
      })
      console.log(Math.max(...listTime));
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
      console.log("props",this.props.flights)
        return (
          <div className="fh5co-hero">
          <div className="row">
          <div className="col-md-9">
          <div className="container">
          


          {this.state.list.map((r,i)=>
          <div className="row" style={{marginTop: 20,marginRight: 0,margiButtom: 20, marginLeft: 0}}>
      <div className="col-md-10">
      <div className="card">
          <div className="card-header">
            <strong>{r.name}</strong>
             <strong className="float-right" style={{fontSize: 24,float: 'right'}}>{r.price}€</strong>
          </div>

        <div className="card-body">
          <div className="row">
          <div className="col-md-4">
            <h5 className="card-title"><img src={r.img} /></h5>
          </div>
          <div className="col-md-4">
             <p className="card-text"><strong>{r.odeparture} - {r.oarrival}</strong></p>
          </div>
          <div className="col-md-4" style={{marginBottom: 30}}>
            <p className="card-title"><strong>{r.oduration}</strong></p>
            <p className="card-title"><strong>{r.ostops}</strong></p>
          </div>
        </div>
          <div className="row">
          <div className="col-md-4">
            <h5 className="card-title"><img src={r.img} /></h5>
          </div>
          <div className="col-md-4">
             <p><strong>{r.departure} - {r.arrival}</strong></p>
          </div>
          <div className="col-md-4">
            <p className="card-title"><strong>{r.duration}</strong></p>
            <p className="card-title"><strong>{r.stops}</strong></p>
          </div>
        </div>
      </div>
      <div className="card-footer text-muted">
          <a href="#" className="btn btn-primary float-right">Buy now</a>
      </div>
    </div>
    </div>

  </div>
  )}
          </div>
          </div>
          <div className="col-md-3">Sort
      <Select
        name="sortedValue"
        value={this.state.sortedValue}
        options={options}
        selectComponent={Creatable}
        onChange={this._onSelect.bind(this)}
        
    />
      {/*  <div>
          <h3>Stops</h3>
          <input type="checkbox" name="nonstop" checked={this.state.stops.nonstop} onChange ={this.changeStop.bind(this,'non')} value="0"/>Non-stop Flights <br />
          <input type="checkbox" name="onestop" checked={this.state.stops.onestop} onChange ={this.changeStop.bind(this,'one')} value="1"/> One Stop <br />
          <input type="checkbox" name="twoplus" checked={this.state.stops.twoplus} onChange ={this.changeStop.bind(this,'two')} value="2"/> More than 1 Stops

        </div> */}
        {pop}

</div>
</div>
</div>
        );
    }
}
const mapStateToProps = (state, ownProps) =>{
  console.log(state.flightReducer.flights)
    return {
        flights: state.flightReducer.flights,
        query: state.flightReducer.query[0]
    }
} 

const mapDispatchToProps = (dispatch) =>{
    return {
       createFlight: flight => dispatch(actions.createFlight(flight)),
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(ListFlight);




