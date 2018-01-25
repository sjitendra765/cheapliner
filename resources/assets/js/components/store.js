import { createStore, combineReducers, applyMiddleware } from 'redux'
import flightReducer from './reducers'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  flightReducer
})
const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store;