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
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',

    },
    body : {
        backgroundColor: 'black',
        opacity: '0.8',
        zIndex: '8888'
    }

};

class ListFlight extends Component {
    constructor(props) {
        super(props);
        this.state= {
            modalIsOpen: false,
            loading: true,
            flyingData: {
                from_place: '',
                to_place: '',
                date_start:'',
                date_end: '',
                adults:'',
                children:'',
                pagesize:'',
                pageindex:'',
                sorttype:'price',
                sortorder:'asc'
            },
            flights: this.props.flights,
            list: [],
            valueOutBound: {min: 0, max: 23},
            valueOnReturn: {min: 0, max: 23},
            valueD: 1800,
            sortedValue: '',
            timeArr: null,
            timeLan: null,
            sortedList: [],
            showData: true,
            stops: {
                onestop: 'checked',
                nonstop: 'checked',
                twoplus: 'checked'
            },
            place: {},
            options: [{value: this.props.query.from_place,label: this.props.query.from_place +"-"+ this.props.place.from_place.place}],
            options2: [{value: this.props.query.to_place,label: this.props.query.to_place +"-"+ this.props.place.to_place.place}],
            outboundDepartStartTime: '00:00',
            outboundDepartEndTime: '23:59',
            inboundDepartStartTime: '00:00',
            inboundDepartEndTime: '23:59',
            currencysign: '$',
            selectedOption: 'twoplus',
            outbound: {value: this.props.query.from_place,label: this.props.query.from_place +"-"+ this.props.place.from_place.place},
            inbound: {value: this.props.query.to_place,label: this.props.query.to_place +"-"+ this.props.place.to_place.place},

    }
        this.handleChange = this.handleChange.bind(this);
    }

    async selectedStop(val){



        var flyingData = this.state.flyingData;

            flyingData.stops = val

        this.setState({modalIsOpen: true,flyingData:flyingData});

        var query = querystring.stringify(flyingData)
        console.log("flying data",flyingData)
        var data = await axios.post('/api/flightSearch',query)
        console.log(data)

        this.props.createFlight(data.data);
        this.setState({modalIsOpen: false});
    }
    componentWillMount(){
        //this.setState({flights:this.props.flights})
console.log(this.props.place)
        this.setState({flyingData: this.props.query,place:this.props.place})
        if(this.props.query.currency == 'GBP'){
            this.setState({currencysign: '£'})
        }
        else if(this.props.query.currency == 'USD'){
            this.setState({currencysign: '$'})
        }
        else {
            this.setState({currencysign: '€'})
        }

    }
    componentDidMount(){
        doListCall();
    }
// componentWillReceiveProps(nextProps){
//  console.log("next",nextProps)
//  //this.setState({flights:nextProps.flights})
// }
//  shouldComponentUpdate(nextProps, nextState) {
//    //this.setState({flights:this.nextProps.flights})
//    return (nextProps !== nextState)
//  }
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
    isSortBy(li,value){
        return li.sort((a,b) =>{
            return a.price- b.price
        })
    }
    async loadMore(){
        var flyingData = this.state.flyingData;
        var len = this.props.flights.length
        console.log("length",len)
        flyingData.pageindex += 1;
       /* this.setState({flyingData:flyingData})*/
        console.log("data", flyingData)
        this.setState({modalIsOpen: true});
        var query = querystring.stringify(flyingData)
        var data = await axios.post('/api/flightSearch',query)
        console.log("new data",data.data)
        this.props.addFlight(data.data)

        this.setState({modalIsOpen: false});

    }
    async onreturn(val){

        console.log(val)
        var flyingData = this.state.flyingData;
        if(val.min != 0)
            flyingData.inboundDepartStartTime = parseInt(val.min) + ':' + ((val.min%parseInt(val.min))*60);
        else
            flyingData.inboundDepartStartTime = "00:00"
        flyingData.inboundDepartEndTime = parseInt(val.max) + ':' + ((val.max%parseInt(val.max))*60);
        this.setState({flyingData:flyingData})
        this.setState({ valueOnReturn:val, inboundDepartStartTime: flyingData.inboundDepartStartTime,
            inboundDepartEndTime: flyingData.inboundDepartEndTime})
        this.setState({modalIsOpen: true});

        var query = querystring.stringify(flyingData)
        console.log("flying data",flyingData)
        var data = await axios.post('/api/flightSearch',query)
        console.log(data)
        if(typeof(data) != 'string'){
            this.props.createFlight(data.data);
            this.setState({modalIsOpen: false});
        }
        else{
            this.setState({modalIsOpen: false, showData: false});
            console.log("not found")
        }
    }
    async returnSlider(){
       var returnStartTime =  document.getElementsByClassName('return-slider-time')[0].innerHTML;
        var returnEndTime =  document.getElementsByClassName('return-slider-time2')[0].innerHTML;

       console.log(returnEndTime);
       var flyingData = this.state.flyingData;
        flyingData.inboundDepartEndTime = returnEndTime;
        this.setState({modalIsOpen: true});
        flyingData.inboundDepartStartTime = returnStartTime;
     this.setState({
         flyingData
     })
        var query = querystring.stringify(flyingData)
        var data = await axios.post('/api/flightSearch',query)
        console.log("new data",data.data)
        this.props.createFlight(data.data)
        this.setState({modalIsOpen: false});
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
    async inSlider(){

        var returnStartTime =  document.getElementsByClassName('outbound-slider-time')[0].innerHTML;
        var returnEndTime =  document.getElementsByClassName('outbound-slider-time2')[0].innerHTML;

        console.log(returnEndTime);
        var flyingData = this.state.flyingData;
        flyingData.outboundDepartEndTime = returnEndTime;

        flyingData.outboundDepartStartTime = returnStartTime;
        this.setState({
            flyingData
        })
        this.setState({modalIsOpen: true});
        var query = querystring.stringify(flyingData)
        var data = await axios.post('/api/flightSearch',query)
        console.log("new data",data.data)
        this.props.createFlight(data.data)
        this.setState({modalIsOpen: false});
    }
    async outbound(val){

        console.log(val)
        var flyingData = this.state.flyingData;
        if(val.min != 0)
            flyingData.outboundDepartStartTime = parseInt(val.min) + ':' + ((val.min%parseInt(val.min))*60);
        else
            flyingData.outboundDepartStartTime = "00:00"
        flyingData.outboundDepartEndTime = parseInt(val.max) + ':' + ((val.max%parseInt(val.max))*60);
        this.setState({flyingData:flyingData,
            outboundDepartEndTime: flyingData.outboundDepartEndTime,
            outboundDepartStartTime: flyingData.outboundDepartStartTime})
        this.setState({ valueOutBound:val})
        this.setState({modalIsOpen: true});

        var query = querystring.stringify(flyingData)
        console.log("flying data",flyingData)
        var data = await axios.post('/api/flightSearch',query)
        console.log(data)
        if(typeof(data) != 'string'){
            this.props.createFlight(data.data);
            this.setState({modalIsOpen: false});
        }
        else{
            this.setState({modalIsOpen: false, showData: false});
            console.log("not found")
        }

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
  async  modifysearch(event){
        event.preventDefault()
       console.log(this.props.query);
        var flyingData = this.state.flyingData;
        var date_start = document.getElementById("departure_date").value
        var date_end = document.getElementById("return_date").value;
        var adults = document.getElementById("adults_check").value;
        var children = document.getElementById("children_check").value;
        var from_place = document.getElementsByName("from_place")[0].value;
        var to_place = document.getElementsByName("to_place")[0].value;
        flyingData.date_start = from_place;
        flyingData.date_start = to_place;
        flyingData.date_start = date_start;
        flyingData.date_end = date_end;
        flyingData.adults = adults;
        flyingData.children = children,


        flyingData.sorttype = 'price';
        flyingData.sortorder = 'asc';
        flyingData.pagesize = "10";
        flyingData.pageindex = "0";
        flyingData.outboundDepartStartTime = "00:00";
        flyingData.outboundDepartEndTime="24:00";
        flyingData.inboundDepartStartTime = '00:00',
        flyingData.inboundDepartEndTime =  '24:00',


            this.setState({
                flyingData:flyingData
            })
        document.getElementsByClassName('outbound-slider-time')[0].innerHTM = "00:00";
        document.getElementsByClassName('outbound-slider-time2')[0].innerHTML ="24:00";
        document.getElementsByClassName('return-slider-time')[0].innerHTML="00:00";
        document.getElementsByClassName('return-slider-time2')[0].innerHTML="24:00";
        var query = querystring.stringify(flyingData)
        console.log("flying data",flyingData)
        this.setState({modalIsOpen: true});
        var data = await axios.post('/api/flightSearch',query)
        this.props.createFlight(data.data);
        this.setState({modalIsOpen: false});
    }
    async journeytime(val){
        console.log(val)
        var flyingData = this.state.flyingData;
        flyingData.duration = val
        this.setState({ valueD:val,flyingData:flyingData})
        this.setState({modalIsOpen: true});

        var query = querystring.stringify(flyingData)
        console.log("flying data",flyingData)
        var data = await axios.post('/api/flightSearch',query)
        console.log(data)
        if(typeof(data) != 'string'){
            this.props.createFlight(data.data);
            this.setState({modalIsOpen: false});
        }
        else{
            this.setState({modalIsOpen: false, showData: false});
            console.log("not found")
        }
    }
    render() {
        const options1 = this.state.options;
        const options2 = this.state.options2;
        const options = [
            {"value": "","label":"Price"},
            {"value": "cheapest","label":"Low to High"},
            {"value": "highest","label":"High to Low"},
            ];
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
        console.log("hey")
        //this.setState({flights:this.props.flights})
        var flightArr = []
        this.props.flights.map(f => {
            var list = {}

        list.price = f.Agent.Price;
        list.img = f.InboundLeg.FlightNumbers[0].Carrier.ImageUrl;
        list.iimg = f.OutboundLeg.FlightNumbers[0].Carrier.ImageUrl;
        list.odeparture = f.OutboundLeg.Departure.split('T')[1];
        list.odeparturedate = f.OutboundLeg.Departure.split('T')[0];
        list.oarrivaldate = f.OutboundLeg.Arrival.split('T')[0];

            list.od = f.OutboundLeg.Duration;
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
        console.log("ddasf",f.InboundLeg);
        list.oarrival = f.OutboundLeg.Arrival.split('T')[1];

        list.oduration = parseInt(list.od/60) + 'h(s) ' + (list.od)%60 + 'min'
        if(this.state.flyingData.date_end!='') {
            list.departure = f.InboundLeg.Departure.split('T')[1];
            list.d = f.InboundLeg.Duration;
            list.arrival = f.InboundLeg.Arrival.split('T')[1];
            list.name = f.Agent.Name;

            list.departuredate = f.InboundLeg.Departure.split('T')[0];
            list.arrivaldate = f.InboundLeg.Arrival.split('T')[0];
            list.stops = f.InboundLeg.Stops.length
            if (list.stops == 0) {
                list.stops = "Direct Flights"
            }
            else if (list.stops == 1) {
                list.stops = "One Stop"
            }
            else {
                list.stops = "More than one Stops"
            }
            list.duration = parseInt(list.d / 60) + 'h(s) ' + (list.d) % 60 + 'min'
        }

        flightArr.push(list)
        console.log("hey", flightArr)
    })
        //this.setState({list:flightArr})
        return (
            <div>
            <div className="row modify-search modify-flight">
            <div className="container clear-padding">
            <form >
            <div className="col-md-2 col-sm-6">
            <div className="form-gp">
            <label>Leaving From</label>
        <div className="input-group">
            <Select
        name="from_place"
        selectedValue={{value: this.state.flyingData.from_place,label: this.state.flyingData.from_place +"-"+ this.state.place.from_place.place}}
        value={this.state.outbound}
        options={options1}
        selectComponent={Creatable}
        onChange={val=>{console.log("value on change",val); var flyingData={...this.state.flyingData};flyingData.from_place=val.value.placeId;var place={...this.state.place};place.from_place=val.value;this.setState({outbound:val,flyingData,place})}}
        onInputChange={this.getautosuggest.bind(this)}
        arrowRender={null,null}





        />



            <span className="input-group-addon"><i className="fa fa-map-marker fa-fw"></i></span>
        </div>
        </div>
        </div>
        <div className="col-md-2 col-sm-6">
            <div className="form-gp">
            <label>Leaving To</label>
        <div className="input-group ">

            <Select
        name="to_place"
        value={this.state.inbound}
        options={options2}

        selectComponent={Creatable}
        onChange={val=>{console.log("value on change",val); var flyingData={...this.state.flyingData};flyingData.to_place=val.value.placeId;var place={...this.state.place};place.to_place=val.value;this.setState({inbound:val,flyingData,place})}}
        onInputChange={this.getautosuggest2.bind(this)}


        />

            <span className="input-group-addon"><i className="fa fa-map-marker fa-fw"></i></span>
            </div>
        </div>
        </div>

        <div className="col-md-2 col-sm-6 col-xs-6">
            <div className="form-gp">
            <label>Departure</label>
            <div className="input-group margin-bottom-sm">
            <input type="text" id="departure_date" name="date_start" className="form-control" onSelect={this.handleChange} value = {this.state.flyingData.date_start} required placeholder="DD/MM/YYYY"/>
            <span className="input-group-addon"><i className="fa fa-calendar fa-fw"></i></span>
        </div>
        </div>
        </div>
        <div className="col-md-2 col-sm-6 col-xs-6">
            <div className="form-gp">
            <label>Return</label>
            <div className="input-group margin-bottom-sm">
            <input type="text" id="return_date" name="date_end" className="form-control" onSelect={this.handleChange} value = {this.state.flyingData.date_end} required placeholder="DD/MM/YYYY"/>
            <span className="input-group-addon"><i className="fa fa-calendar fa-fw"></i></span>
        </div>
        </div>
        </div>
        <div className="col-md-1 col-sm-6 col-xs-3">
            <div className="form-gp">
            <label>Adult</label>
            <select className="selectpicker cs-select cs-skin-border" onChange={this.handleChange} value = {this.state.flyingData.adults} name="adults" id="adults_check">

            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            </select>
            </div>
            </div>
            <div className="col-md-1 col-sm-6 col-xs-3">
            <div className="form-gp">
            <label>Child</label>
            <select className="selectpicker cs-select cs-skin-border" onChange={this.handleChange} value = {this.state.flyingData.children} name="children" id="children_check">
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            </select>
            </div>
            </div>
            <div className="col-md-2 col-sm-6 col-xs-6">
            <div className="form-gp">
            <button type="submit" className="modify-search-button btn transition-effect" onClick={this.modifysearch.bind(this)}>MODIFY SEARCH</button>
        </div>
        </div>

        </form>
        </div>
        </div>

        <div className="row">
            <div className="container">

            <div className="col-md-3 clear-padding">
            <div className="filter-head text-center">
            <h4>Result Found Matching Your Search.</h4>
        </div>
        <div className="filter-area">

            <div className="price-filter filter">
            <h5>Outbound</h5>
            <div id="outbound-time-range">
            <p>
            <span className="outbound-slider-time">00:00</span> - <span className="outbound-slider-time2">24:00</span>
        </p>
        <div className="outbound-sliders_step1">
            <div id="outbound-range" onMouseUp={this.inSlider.bind(this)}></div>
            </div>
            </div>
            </div>

            <div className="price-filter filter">
            <h5>Return</h5>
            <div id="return-time-range" >
            <p>
            <span className="return-slider-time">00:00</span> - <span className="return-slider-time2">24:00</span>
        </p>
        <div className="return-sliders_step1">
            <div id="return-range" onMouseUp={this.returnSlider.bind(this)}></div>
            </div>
            </div>
            </div>


            <div className="stop-filter filter">
            <h5><i className="fa fa-stop"></i> Stops</h5>
        <div className="btn-group" data-toggle="buttons" >
            <label className="btn btn-primary" onClick ={this.selectedStop.bind(this,"0")}>
            <input type="radio" name="options" id="option1"/> 0 <br />Stop
            </label>
            <label className="btn btn-primary" onClick ={this.selectedStop.bind(this,"1" )}>
            <input type="radio" name="options"  id="option2"/> 1 <br />Stops
            </label>
            <label className="btn btn-primary" onClick ={this.selectedStop.bind(this ,"")}>
            <input type="radio" name="options"  id="option3"/> All <br />Stops
            </label>
            </div>
            </div>

            </div>
            </div>

            <div className="col-md-9 flight-listing">


            <div className="sort-area col-md-12">
            <div className="col-md-3 col-sm-3 col-xs-6 ">
            <Select
        name="sortedValue"

        value={this.state.sortedValue}
        options={options}
        selectComponent={Creatable}
        defaultValue="Select Option"
        onChange={this._onSelect.bind(this)}

        />
        </div>
        </div>

        <div className="clearfix"></div>

        {flightArr.map((r,i)=>
            <div className="flight-list-v2">
            <div className="flight-list-main">
            <div className="col-md-2 col-sm-2 text-center airline">
            <img src={r.iimg} alt="cruise"/>
            <h6>{r.name}  </h6>
            </div>
            <div className="col-md-3 col-sm-3 departure">
            <h3><i className="fa fa-plane"></i> {this.state.flyingData.from_place} {r.odeparture} </h3>
        <h5 className="bold">{r.odeparturedate}</h5>
        <h5>{this.state.place.from_place.place},{this.state.place.from_place.country}</h5>
        </div>
        <div className="col-md-4 col-sm-4 stop-duration">
            <div className="flight-direction">
            </div>
            <div className="stop">
            </div>
            <div className="stop-box">
            <span>{r.ostops}</span>
        </div>
        <div className="duration text-center">
            <span><i className="fa fa-clock-o"></i> {r.oduration}</span>
        </div>
        </div>
        <div className="col-md-3 col-sm-3 destination">
            <h3><i className="fa fa-plane fa-rotate-90"></i> {this.state.flyingData.to_place} {r.oarrival}</h3>
        <h5 className="bold">{r.oarrivaldate}</h5>
        <h5>{this.state.place.to_place.place},{this.state.place.to_place.country}</h5>
        </div>
        </div>
        <div className="clearfix"></div>
            {(this.state.flyingData.date_end=="")?"":
            <div className="flight-list-main">
            <div className="col-md-2 col-sm-2 text-center airline">
            <img src={r.img} alt="cruise"/>
            <h6>{r.name}</h6>
        </div>
        <div className="col-md-3 col-sm-3 departure">
            <h3><i className="fa fa-plane"></i> {this.state.flyingData.to_place} {r.departure} </h3>
        <h5 className="bold">{r.departuredate}</h5>
        <h5>{this.state.place.to_place.place},{this.state.place.to_place.country}</h5>
        </div>
        <div className="col-md-4 col-sm-4 stop-duration">
            <div className="flight-direction">
            </div>
            <div className="stop">
            </div>
            <div className="stop-box">
            <span>{r.stops }</span>
        </div>
        <div className="duration text-center">
            <span><i className="fa fa-clock-o"></i> {r.duration}</span>
        </div>
        </div>
        <div className="col-md-3 col-sm-3 destination">
            <h3><i className="fa fa-plane fa-rotate-90"></i> {this.state.flyingData.from_place} {r.arrival}</h3>
        <h5 className="bold">{r.arrivaldate}</h5>
        <h5>{this.state.place.from_place.place},{this.state.place.from_place.country}</h5>
        </div>
        </div>
        }
        <div className="clearfix"></div>
            <div className="flight-list-footer">
            <div className="col-md-6 col-sm-6 col-xs-6 sm-invisible">
            <span><i className="fa fa-plane"></i> {this.state.flyingData.flying_class}</span>
        </div>
        <div className="col-md-6 col-sm-6 col-xs-12 clear-padding">
            <div className="pull-right">
            <span>€{r.price}/Person</span>
            <a href="#">BOOK</a>
            </div>
            </div>
            </div>
            </div>
        )}


            <div className="row modify-search modify-flight">
            <div className="col-md-6 col-md-offset-3 col-sm-6 col-xs-6">
            <div className="form-gp">
            <button type="submit" className="modify-search-button btn transition-effect" onClick={this.loadMore.bind(this)}>Load more</button>
        </div>
        </div>
        </div>
        </div>
        {pop}
        </div>
        </div>
        </div>

    );
    }
}
const mapStateToProps = (state, ownProps) =>{
    console.log("places of destib",state.flightReducer)
    return {
        flights: state.flightReducer.flights,
        query: state.flightReducer.query[0],
        place: state.flightReducer.place,
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        createFlight: flight => dispatch(actions.createFlight(flight)),
        addFlight: (flight) => dispatch(actions.addFlight(flight))
}
}


export default connect(mapStateToProps,mapDispatchToProps)(ListFlight);



