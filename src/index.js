import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
// import { createGlobalStyle } from 'styled-components' 
import 'normalize.css'
// import '@atlaskit/css-reset' //atlaskit css reset which is reqiured by the docs
// import './index.css';
import ShoppingList from './ShoppingList'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(<ShoppingList />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
