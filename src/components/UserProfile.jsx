import React, { Component } from 'react';

// Import components
import BeerList from './BeerList';
import { fetchAvailableBeers } from '../actions/beerListActions'

export default class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      userData: {},
    };
  }

  // Runs before component is mounted to get all the user data
  componentWillMount() {
    // const _this = this;
    // const url = `http://localhost:3000/restapi/profile/${this.props.params.userID}`;
    // // Open AJAX request
    // const xhr = new XMLHttpRequest;
    // xhr.open('GET', url, true);
    // // Check the status of the request
    // xhr.onreadystatechange = () => {
    //   if (xhr.readyState === 4) {
    //     const res = JSON.parse(xhr.responseText);
    //     if (xhr.status === 200) {
    //       _this.setState({ userData: res });
    //     }
    //   }
    // };

    // xhr.setRequestHeader('x-access-token', `${window.sessionStorage.brtoken}`);
    // xhr.send();
    fetchAvailableBeers();
  }

  render() {
    return (
      <div className="container">
      <h2 className="text-center text-capitalize">Hello, {this.state.userData.firstName}!</h2>
        <BeerList beers={this.state.userData.beers}/>
      </div>
    );
  }
}

UserProfile.propTypes = {
  params: React.PropTypes.object,
};
