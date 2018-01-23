import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Creatable } from 'react-select'
import Select from 'react-virtualized-select';
import createFilterOptions from 'react-select-fast-filter-options';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'



class TabPanes extends Component {
    constructor(props) {
    super(props);
    this.state = {from_place: '',
                  to_place:'',
                  date_start:'',
                    date_end: '',
                    flying_class:'economy',
                    adults: '',
                    children: ''
                };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
   handleChange(event) {
    const target = event.target;
    const value =  target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
   handleSubmit(event) {
    //alert('Your favorite flavor is: ' + this.state);
    axios.get('/airportList')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
    event.preventDefault();
  }
    render() {
        const options = [
    // ..
    { value: 'Stanford University', label: 'Stanford University' },
    { value: 'Standord University', label: 'Standord University' },
    { value: 'sidney University', label: 'sidney University' },
    { value: 'paris University', label: 'paris University' },
    { value: 'south dakota University', label: 'south dakota University' },
    { value: 'sanfransisco University', label: 'sanfransisco University' },
    { value: 'south korea University', label: 'south korea University' },
    // ...
];

      
        return (
            <div className="tab-content">
            <form className="form-horizontal" role="form" onSubmit={this.handleSubmit}>
                                    
                                     <div role="tabpanel" className="tab-pane active" id="flights">
                                        <div className="row">
                                            <div className="col-xxs-12 col-xs-6 mt">
                                                <div className="input-field">
                                                    <label htmlFor="from">From:</label>
                                                    <Select
        name="university"
        value="one"
        options={options}
        selectComponent={Creatable}
        onChange={val => console.log(val)}
    />
                                                </div>
                                            </div>
                                            <div className="col-xxs-12 col-xs-6 mt">
                                                <div className="input-field">
                                                    <label htmlFor="from">To:</label>
                                                    <input type="text" className="form-control"  id="from-place" name="to_place" value={this.state.to_place} onChange={this.handleChange}  placeholder="Tokyo, Japan"/>
                                                </div>
                                            </div>
                                            <div className="col-xxs-12 col-xs-6 mt alternate">
                                                <div className="input-field">
                                                    <label htmlFor="date-start">Check In:</label>
                                                    <input className="form-control datepicker" data-provide="datepicker" data-date-format="dd.mm.yyyy" name="date_start" value={this.state.date_start} onChange={this.handleChange} placeholder="mm/dd/yyyy"/>
                                                </div>
                                            </div>
                                            <div className="col-xxs-12 col-xs-6 mt alternate">
                                                <div className="input-field">
                                                    <label htmlFor="date-end">Check Out:</label>
                                                    <input className="form-control datepicker" data-provide="datepicker" data-date-format="dd.mm.yyyy" name="date_end" value={this.state.date_end} onChange={this.handleChange}  placeholder="mm/dd/yyyy"/>
                                                </div>
                                            </div>
                                            <div className="col-xxs-12 col-xs-6 mt alternate">
                                                <section>
                                                    <label htmlFor="className">className:</label>
                                                    <select className="cs-select cs-skin-border" name="flying_class" value={this.state.flying_class} onChange={this.handleChange} >
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
                                                    <select className="cs-select cs-skin-border" name="adults" value={this.state.adults} onChange={this.handleChange} >
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
                                                    <select className="cs-select cs-skin-border" name="children" value={this.state.children} onChange={this.handleChange} >
                                                        <option value="" >1</option>
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

export default TabPanes;



