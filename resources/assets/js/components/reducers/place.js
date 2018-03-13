
export default (state = [], action) => {
    switch (action.type){
        case 'CREATE_PLACE':
            return state = action.place;
        default:
            return state;
    }
};

