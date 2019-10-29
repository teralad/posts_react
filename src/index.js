// eslint-disable-next-line react/state-in-constructor
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import './Styles/main.scss'
import * as serviceWorker from './serviceWorker';

// eslint-disable-next-line react/jsx-filename-extension
ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
