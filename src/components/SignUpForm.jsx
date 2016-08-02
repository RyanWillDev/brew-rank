import React, { Component } from 'react';
import axios from 'axios';

export default class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      alertClass: '',
      message: '',
    };
  }

  userIs21() {
    // Get today's date
    const today = new Date();
    // Get the date provided by user
    const birthDate = new Date(this.refs.birthday.value);
    // Get age of user
    const age = today.getFullYear() - birthDate.getFullYear();
    // Return true or false depending on the age
    // this will be used to either alert the user they
    // are too young or pass the last check before submitting form.
    return age >= 21;
  }

  submitFormData() {
    const _this = this;
    const url = 'http://localhost:3000/restapi/users';
    const data = JSON.stringify({
      firstName: this.refs.firstName.value,
      lastName: this.refs.lastName.value,
      password: this.refs.pw.value,
      email: this.refs.email.value,
      bday: new Date(this.refs.birthday.value),
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

  handleSubmit(e) {
    e.preventDefault();
    // Verify the password has been entered exactly the same both times
    if (this.refs.pw.value !== this.refs.pwCheck.value) {
      this.setState({
        message: 'Passwords do not match.',
        alertClass: 'alert alert-danger',
      });
      // Verify the password is at least 8 characters
    } else if (!(this.refs.pw.value.length >= 8)) {
      this.setState({
        message: 'Passwords must be at least 8 characters.',
        alertClass: 'alert alert-danger',
      });
      // Make sure the user is at least 21
    } else if (!this.userIs21()) {
      this.setState({
        message: 'Oooh... come back when your 21!',
        alertClass: 'alert alert-danger',
      });
    } else {
      this.setState({
        message: 'Success!',
        alertClass: 'alert alert-success',
      });
      this.submitFormData();
    }
  }

  render() {
    return (
      <div className="container">
        <h1 className="text-center">Glad you're joining us!</h1>
        <form action="localhost:3000/restapi/users" method="post" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="form-group">
              <div className="col-sm-3 col-sm-offset-3">
                <input type="text" className="form-control"
                  placeholder="First Name" ref="firstName" required
                />
              </div>
               <div className="col-sm-3">
                <input type="text" className="form-control"
                  placeholder="Last Name" ref="lastName" required
                />
              </div>
              <div className="col-sm-6 col-sm-offset-3">
                <input type="email" className="form-control"
                  placeholder="Email Address" ref="email" required
                />
              </div>
              <div className="col-sm-6 col-sm-offset-3">
                <input type="password" className="form-control"
                  placeholder="Password" ref="pw" required
                />
              </div>
              <div className="col-sm-6 col-sm-offset-3">
                <input type="password" className="form-control"
                  placeholder="Re-enter Password" ref="pwCheck" required
                />
              </div>
              <div className="col-sm-6 col-sm-offset-3">
                <input type="date" ref="birthday" required />
              </div>
              <div className="col-sm-12 col-sm-offset-3">
                <button type="submit" className="btn btn-default">Submit</button>
              </div>
            </div>
          </div>
        </form>
        <div className="row">
          <div className={this.state.alertClass}>{this.state.message}</div>
        </div>
      </div>
    );
  }
}
