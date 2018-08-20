import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import App from './components/App';
import Detail from './components/detail/Detail'
import Create from './components/create/Create'
import './index.css';

ReactDOM.render(
    <Provider store={createStore(reducers, applyMiddleware(thunk))} >
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path="/" component={App} exact />
                    <Route path="/create/" component={Create} exact />
                    <Route path="/contact/:resourceName" component={Detail} exact />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
