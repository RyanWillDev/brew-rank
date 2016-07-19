import React, { Component } from 'react';

export default class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      userData: {},
    };
  }

  componentWillMount() {
    const _this = this;
    const url = `http://localhost:3000/restapi/profile/${this.props.params.userId}`;
    // Open AJAX request
    const xhr = new XMLHttpRequest;
    xhr.open('GET', url, true);
    // Check the status of the request
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        const res = JSON.parse(xhr.responseText);
        if (xhr.status === 200) {
          _this.setState({ userData: res });
        }
      }
    };

    xhr.setRequestHeader('x-access-token', `${window.sessionStorage.brtoken}`);
    xhr.send();
  }

  render() {
    return (
      <div>{this.state.userData.firstName}</div>
    );
  }
}

UserProfile.PropTypes = {
  params: React.PropTypes.Object,
};
