
export default (state = [], action) => {
  switch (action.type){
    case 'CREATE_LIST':
        return state = action.flight;
    default:
          return state;
  }
};

