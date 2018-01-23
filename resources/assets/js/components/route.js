import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import Home from './Example' ;
import MainBody from './MainBody';
import Flight from './Flight'
import ListFlight from './ListFlight';

export default () => {
	return (
  
		<BrowserRouter>
			<Flight>
			<Switch>
			  <Route exact path='/' component={MainBody} />
			  <Route path='/listflight' component={ListFlight} />
			</Switch>
			 </Flight>
		</BrowserRouter>
 
)
}