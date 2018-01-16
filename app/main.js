import React from 'react';
import ReactDOM from 'react-dom';
import ReduxProvider from './components/ReduxProvider';

const render = (Component) => {
    ReactDOM.render(
        <Component />,
        document.getElementById('root'),
    );
};

render(ReduxProvider);
