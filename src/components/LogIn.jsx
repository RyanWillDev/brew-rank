import React, { Component } from 'react';
import axios from 'axios';

export default class LogIn extends Component {
  constructor(props) {
    super(props);
    this.handleLogIn = this.handleLogIn.bind(this);
    this.state = {
      alertClass: '',
      message: '',
    };
  }

  handleLogIn(event) {
    event.preventDefault();
    const _this = this;
    const url = 'http://127.0.0.1:3000/restapi/login';
    // Get email and password
    const data = JSON.stringify({
      email: this.refs.email.value,
      password: this.refs.password.value,
    });

    axios.post(url, data, { headers: { 'Content-Type': 'application/json' } })
    .then((response) => {
      if (response.status === 200) {
        sessionStorage.setItem('brtoken', response.data.token);
        window.location = `#/profile/${response.data.id}`;
      }
    }).catch((err) => {
      if (err.response.status === 401) {
        _this.setState({ message: err.response.data.message, alertClass: 'alert alert-danger' });
      }
    });
  }

  render() {
    return (
      <div className="container">
        <h1 className="text-center">Welcome Back!</h1>
        <div className="row">
          <form action="http://127.0.0.1:3000/restapi/login" onSubmit={this.handleLogIn} method="post">
            <div className="form-group">
              <div className="col-sm-6 col-sm-offset-3">
                <input
                  ref="email" type="email" className="form-control"
                  placeholder="Email Address" name="email" required
                />
              </div>
              <div className="col-sm-6 col-sm-offset-3">
                <input
                  ref="password" type="password" className="form-control"
                  placeholder="Password" name="password" required
                />
              </div>
              <div className="col-sm-12 col-sm-offset-3">
                <button type="submit" className="btn btn-default">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="row">
          <div className={this.state.alertClass}>{this.state.message}</div>
        </div>
      </div>
    );
  }
}
