
export default (state = [], action) => {
  switch (action.type){
    case 'CREATE_QUERY':
        state.push(action.query);
    default:
          return state;
  }
};

