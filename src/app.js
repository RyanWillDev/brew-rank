import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

// Import components
import Layout from './components/Layout';

const router = (
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
    </Route>
  </Router>

);

render(router, document.getElementById('root'));
