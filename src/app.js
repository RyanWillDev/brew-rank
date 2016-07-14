import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';

// Import components
import Layout from './components/Layout';
import LandingContent from './components/LandingContent';
import SignUpForm from './components/SignUpForm';
import LogIn from './components/LogIn';

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });
const router = (
  <Router history={appHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={LandingContent} />
      <Route path="/signup" component={SignUpForm} />
      <Route path="/login" component={LogIn} />
    </Route>
  </Router>

);

render(router, document.getElementById('root'));
