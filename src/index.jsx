import React from 'react';
import {render} from 'react-dom';

import App from './components/App/App.jsx';
import API from './components/API/API.jsx';

require('./styles/main.scss');

render(
    <App />,
    // Define your router and replace <Home /> with it!
    document.getElementById('app')
);
