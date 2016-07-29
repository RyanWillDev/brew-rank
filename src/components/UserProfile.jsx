import React, { Component } from 'react';
import { connect } from 'react-redux';
// import store from '../store';

// Import components
import BeerList from './BeerList';
// Import actions
import { fetchAvailableBeers } from '../actions/beerListActions';
import { fetchUserData } from '../actions/userActions';

class UserProfile extends Component {

  // Runs before component is mounted to get all the user data
  componentWillMount() {
    fetchUserData(this.props.params.userID);
    fetchAvailableBeers();
  }

  render() {
    if (!this.props.user.data) {
      return <div>Still waiting!!!</div>;
    }
    return (
      <div className="container">
        <h2 className="text-center text-capitalize">Hello, {this.props.user.data.firstName}!</h2>
        <BeerList
          usersBeers={this.props.user.data.beers}
          availableBeers={this.props.availableBeers.list}
        />
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  availableBeers: store.availableBeers,
  user: store.user,
});


export default connect(mapStateToProps)(UserProfile);

UserProfile.propTypes = {
  params: React.PropTypes.object,
  user: React.PropTypes.object,
  availableBeers: React.PropTypes.object,
};
