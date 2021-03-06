import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Nav extends Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
  }

  logout() {
    sessionStorage.removeItem('brtoken');
  }
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container">
          <Link className="navbar-brand" to="/">BrewRank</Link>
            {window.sessionStorage.brtoken ?
              <div className="nav navbar navbar-right">
                <Link
                  className="btn btn-default navbar-btn" to="/login"
                  onClick={this.logout}
                >Log Out</Link>
              </div>
              :
              <div className="nav navbar navbar-right">
                <Link className="btn btn-default navbar-btn" to="/signup">Sign Up</Link>
                <Link className="btn btn-default navbar-btn" to="/login">Log In</Link>
              </div>
            }
        </div>
      </nav>
    );
  }
}
