import { Provider } from 'react-redux';
import GlobalState from './../reducers/reducers';
import { createStore, compose, applyMiddleware } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';
import moment from 'moment';

export default class ReduxProvider extends React.Component {
    constructor(props) {
        super(props);
        this.initialState = {
            visit: "",
            visits: [],
            dateAfter: moment(),
            dateBefore: moment(),
            favourite: false,
        };
        this.store = this.configureStore();
    }
    render() {
        return (
            <AppContainer>
                <Provider store={this.store}>
                    <div style = {{height: '100%'}}>
                        <App store={this.store}/>
                    </div>
                </Provider>
            </AppContainer>
        );
    }
    configureStore() {
        const store = createStore(GlobalState, this.initialState);
        if (module.hot) {
            module.hot.accept('./../reducers/reducers', () => {
                const nextRootReducer = require('./../reducers/reducers').default;
                store.replaceReducer(nextRootReducer);
            });
        }
        return store;
    }
}
