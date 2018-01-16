import moment from 'moment';

function dateAfterReducer(state = {dateAfter: moment()}, action) {
    switch(action.type) {
    case 'DATE_AFTER':
        return action.date;
    default:
        return state;
    }
}

export default dateAfterReducer;
