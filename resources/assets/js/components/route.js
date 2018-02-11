import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import Home from './Example' ;
import MainBody from './MainBody';
import Flight from './Flight'
import ListFlight from './ListFlight';
import store from './store';

export default () => {
	return (
  
		<BrowserRouter>
			<Flight>
			<Switch>
			  <Route exact path='/' render={(props) => <MainBody />} />
			  <Route path='/listflight' render={(props) => <ListFlight  />} />
			</Switch>
			 </Flight>
		</BrowserRouter>
 
)
}