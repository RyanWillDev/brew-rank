import React, { Component } from 'react';

export default class SignUpForm extends Component {
  render() {
    return (
      <div className="container">
        <h1 className="text-center">Glad you're joining us!</h1>
        <form action="localhost:3000/restapi/users" method="post">
          <div className="row">
            <div className="form-group">
              <div className="col-sm-3 col-sm-offset-3">
                <input type="text" className="form-control" placeholder="First Name" required />
              </div>
               <div className="col-sm-3">
                <input type="text" className="form-control" placeholder="Last Name" required />
              </div>
              <div className="col-sm-6 col-sm-offset-3">
                <input type="email" className="form-control" placeholder="Email Address" required />
              </div>
              <div className="col-sm-6 col-sm-offset-3">
                <input type="password" className="form-control" placeholder="Password" required />
              </div>
              <div className="col-sm-6 col-sm-offset-3">
                <input type="date" required />
              </div>
              <div className="col-sm-12 col-sm-offset-3">
                <button type="submit" className="btn btn-default">Submit</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
