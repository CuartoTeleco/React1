import { combineReducers } from 'redux';
import visitReducer from './visitReducer';
import visitsReducer from './visitsReducer';
import dateAfterReducer from './dateAfterReducer';
import dateBeforeReducer from './dateBeforeReducer';
import favouriteReducer from './favouriteReducer';

const GlobalState = combineReducers({
    visit: visitReducer,
    visits: visitsReducer,
    dateAfter: dateAfterReducer,
    dateBefore: dateBeforeReducer,
    favourite: favouriteReducer,
});

export default GlobalState;
