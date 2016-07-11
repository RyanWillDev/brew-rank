import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';

render((
  <Router history={browserHistory}>
    <Route path="/" component={} />
  </Router>
), document.getElementById('root'));
