import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, IndexRoute } from 'react-router';


import CustomHeader from './CustomHeader';
import CustomBody from './CustomBody';

import MainBody from './MainBody'
import { Provider } from 'react-redux';
import store from './store';
// main routes
import AppRoutes from './route';


// We only want to try to render our component on pages that have a div with an ID
// of "example"; otherwise, we will see an error in our console 
if (document.getElementById('example')) {
    ReactDOM.render(

    <Provider store={store}>
    <AppRoutes />
  </Provider>
  ,document.getElementById('example'));
}


