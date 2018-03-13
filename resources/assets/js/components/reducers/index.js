import { combineReducers } from 'redux';  
import flight from './flight';
import query from './query';
import place from './place'

var rootReducer = combineReducers({
	flights: flight,
	query: query,
	place: place,
})

export default rootReducer; 