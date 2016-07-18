import React, { Component } from 'react';

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
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
    });

    // Open AJAX request
    const xhr = new XMLHttpRequest;
    xhr.open('POST', url, true);
    // Check the status of the request
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        const res = JSON.parse(xhr.responseText);
        if (xhr.status === 200) {
          // Store token in cookie
          sessionStorage.setItem('brtoken', res.token);
          // If auth passed redirect to users profile
          window.location = `#/profile/${res.id}`;
        } else if (xhr.status === 401) {
          // If auth failed show message
          _this.setState({ message: res.message, alertClass: 'alert alert-danger' });
        }
      }
    };

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(data);
  }

  render() {
    return (
      <div className="container">
        <h1 className="text-center">Welcome Back!</h1>
        <div className="row">
        <form action="http://127.0.0.1:3000/restapi/login" onSubmit={this.handleLogIn} method="post">
          <div className="form-group">
            <div className="col-sm-6 col-sm-offset-3">
              <input id="email" type="email" className="form-control"
                placeholder="Email Address" name="email" required
              />
            </div>
            <div className="col-sm-6 col-sm-offset-3">
              <input id="password" type="password" className="form-control"
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
