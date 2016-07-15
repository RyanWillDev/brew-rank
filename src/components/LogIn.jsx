import React, { Component } from 'react';

/* Serializes the data from an Array like object
/* Too avoid pulling in jQuery and to learn more about JS */
function serializeInputData(collection) {
  // Returns and stringifies the result of reduce
  return JSON.stringify(Array.from(collection).reduce((acc, input) => {
    // Creates a key vaule pair for each input
    // if it doesn't already exist
    if (!acc[input.name]) {
      acc[input.name] = input.value; // eslint-disable-line
    }
    return acc;
  }, {}));
}

export default class LogIn extends Component {
  constructor(props) {
    super();
  }

  handleLogin() {
    const url = 'http://127.0.0.1:3000/restapi/login'; /* ** Change for prod ** */

    // Creates new XMLHttpRequest for login
    const xhr = new XMLHttpRequest();
    // Uses the serializeInputData from above to create an
    // Arr from of the inputs and then makes an Obj from that Arr
    const data = serializeInputData(document.getElementsByTagName('input'));

    // When the response is received
    xhr.onreadystatechange = () => {
      // Check ready state
      if (xhr.readyState === 4) {
        // Make sure Auth occured
        if (xhr.status === 200) {
          window.location.replace('/#/profile');
        }
      }
    };

    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
    xhr.send(data);
  }

  render() {
    return (
      <div className="container">
        <h1 className="text-center">Welcome Back!</h1>
        <div className="row">
        <form action="http://127.0.0.1:3000/restapi/login" method="post">
          <div className="form-group">
            <div className="col-sm-6 col-sm-offset-3">
              <input type="email" className="form-control"
                placeholder="Email Address" name="email" required
              />
            </div>
            <div className="col-sm-6 col-sm-offset-3">
              <input type="password" className="form-control"
                placeholder="Password" name="password" required
              />
            </div>
            <div className="col-sm-12 col-sm-offset-3">
              <button type="submit" className="btn btn-default" onClick={this.handleLogin}>
                Submit
              </button>
            </div>
          </div>
        </form>
        </div>
      </div>
    );
  }
}
