import React, { Component } from 'react';

export default class LogIn extends Component {
  constructor(props) {
    super();
  }
  handleLogin() {
    const url = 'localhost:3000/restapi/login';
    const xhr = new XMLHttpRequest();
    const data = JSON.stringify(Array.from(document.getElementsByTagName('input'))
          .reduce((finalData, input) => {
            if (!finalData[input.name]) {
              finalData[input.name] = input.value;
            }
            return finalData;
          }, {}));

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          this.context.router.transitionTo('/');
        }
      }
    };
    console.log(data);
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(data);
  }

  render() {
    return (
      <div className="container">
        <h1 className="text-center">Welcome Back!</h1>
        <form action="http://localhost:3000/restapi/login" method="post">
          <div className="row">
            <div className="form-group">
              <div className="col-sm-6 col-sm-offset-3">
                <input type="email" className="form-control" placeholder="Email Address" name="email" required />
              </div>
              <div className="col-sm-6 col-sm-offset-3">
                <input type="password" className="form-control" placeholder="Password" name="password" required />
              </div>
              <div className="col-sm-12 col-sm-offset-3">
                <button type="submit" className="btn btn-default" onClick={this.handleLogin}>Submit</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
