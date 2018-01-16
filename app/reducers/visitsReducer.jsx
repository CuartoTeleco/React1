function visitsReducer(state = {visits: []}, action) {
    switch(action.type) {
    case 'SEARCH_APP':
        return action.visits;

    default:
        return state;
    }
}

export default visitsReducer;
