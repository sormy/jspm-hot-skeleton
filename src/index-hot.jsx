import React from 'react';
import ReactDOM from 'react-dom';

import 'react-hot-loader/lib/patch.dev.js';
import AppContainer from 'react-hot-loader/lib/AppContainer.dev.js';

import './boot';

import App from './App';

const root = document.getElementById('app-root');

ReactDOM.render(<AppContainer><App /></AppContainer>, root);

export function __reload() {
  ReactDOM.render(<AppContainer><App /></AppContainer>, root);
}
