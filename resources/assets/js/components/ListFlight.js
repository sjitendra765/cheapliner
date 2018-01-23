import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import NavBar from './NavBar';
import TabPanes from './TabPanes'


class ListFlight extends Component {
       constructor(props) {
    super(props);
    this.state={
      list: [{
        'from': "ktm",
        'to':'pokhara',
        'amount':480,
        'Date': '2018-09-09'
      },
      {
        'from': "ktm",
        'to':'pokhara',
        'amount':477,
        'Date': '2018-09-09'
      }]
    }
}

 


    render() {
      console.log(this.state.list)
      //var list = this.state.list;
      function isAutobot(list) {
        console.log(list)
  return list.from === "ktm";
}
      function isSortBy(li){
          return li.sort((a,b) =>{
            return a.amount- b.amount
          })
      }
      var autobots = this.state.list.filter(isAutobot);
      var sortbypayment = isSortBy(this.state.list)
    	console.log(autobots)
      console.log(sortbypayment)
        return (
          <div className="row">
            <div className="col-md-4 col-sm-4">
              <p>Price Range</p>
                <section className="range-slider">
                  <span className="rangeValues"></span>
                  <input defaultValue="500" min="500" max="5000" step="500" type="range" />
                  <input defaultValue="50000" min="500" max="5000" step="500" type="range" />
                </section>
            </div>
           <div className="col-md-8 col-sm-4">
               <table className="table table-strip">
               <tbody>
                 <tr>
                    <th>from</th>
                    <th>to</th>
                    <th>amount</th>
                    <th>Date</th>
                    <th>from</th>
                 </tr>
                { this.state.list.map((r,k) => 
                  <tr>
                    <th>{r.from}</th>
                    <th>{r.to}</th>
                    <th>{r.amount}</th>
                    <th>{r.Date}</th>
                    <th>{r.from}</th>
                 </tr>
                 )
              }
                 </tbody>
               </table>
          	</div>
          </div>
        );
    }
}

export default ListFlight;



