/**
 * 应用最顶层入口，用来放置Provider
 */
'use strict';

import React,{
    Component
} from 'react';

import { Provider } from 'react-redux';
import App from './containers/App';
import store from './store';

export default class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <App/>
            </Provider>
        )
    }

}