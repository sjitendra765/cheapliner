
export default (state = [], action) => {

  switch (action.type){
    case 'CREATE_LIST':
        return state = action.flight;
    case 'ADD_LIST':
    	action.flight.map(r =>{
    		state.push(r)
  		})
    	
    	return state;
    default:
          return state;
  }
};

