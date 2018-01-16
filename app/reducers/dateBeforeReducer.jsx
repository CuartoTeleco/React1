import moment from 'moment';

function dateBeforeReducer(state = {dateBefore: moment()}, action) {
    switch(action.type) {
    case 'DATE_BEFORE':
        return action.date;
    default:
        return state;
    }
}

export default dateBeforeReducer;
