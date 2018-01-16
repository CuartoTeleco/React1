function visitReducer(state = {visit: ""}, action) {
    switch(action.type) {
    case 'VISIT_CLICK':
        return action.visit;
    default:
        return state;
    }
}

export default visitReducer;
