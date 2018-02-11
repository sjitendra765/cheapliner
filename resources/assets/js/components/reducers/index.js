import { combineReducers } from 'redux';  
import flight from './flight';
import query from './query';

var rootReducer = combineReducers({
	flights: flight,
	query: query
})

export default rootReducer; 