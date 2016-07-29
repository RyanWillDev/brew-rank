import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';
import store from './store';
import { Provider } from 'react-redux';

// Import components
import Layout from './components/Layout';
import LandingContent from './components/LandingContent';
import SignUpForm from './components/SignUpForm';
import LogIn from './components/LogIn';
import UserProfile from './components/UserProfile';

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });
const router = (
  <Provider store={store}>
    <Router history={appHistory}>
      <Route path="/" component={Layout}>
        <IndexRoute component={LandingContent} />
        <Route path="/signup" component={SignUpForm} />
        <Route path="/login" component={LogIn} />
        <Route path="/profile/:userID" component={UserProfile} />
      </Route>
    </Router>
  </Provider>
);

render(router, document.getElementById('root'));
