export default (state = [], action) => {
  switch (action.type){
    case 'CREATE_LIST':
        state.push(action.flight);
    default:
          return state;
  }
};