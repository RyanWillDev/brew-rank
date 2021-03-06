import React, { Component } from 'react';
import { connect } from 'react-redux';
// import store from '../store';

// Import components
import BeerList from './BeerList';
import AdminDashboard from './AdminDashboard';
// Import actions
import { fetchAvailableBeers } from '../actions/beerListActions';
import { fetchUserData } from '../actions/userActions';

class UserProfile extends Component {

  // Runs before component is mounted to get all the user data
  componentWillMount() {
    fetchUserData(this.props.params.userID);
    fetchAvailableBeers();
  }

  displayCorrectProfile() {
    if (!this.props.user.isAdmin) {
      return (
        <BeerList
          usersBeers={this.props.user.beers}
          availableBeers={this.props.availableBeers} userID={this.props.params.userID}
        />);
    }

    return <AdminDashboard availableBeers={this.props.availableBeers} />;
  }

  render() {
    if (!this.props.user.beers) {
      return <div>Still waiting!!!</div>;
    }
    return (
      <div className="container">
        <h2 className="text-center text-capitalize">Hello, {this.props.user.firstName}!</h2>
        {this.displayCorrectProfile()}
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
  availableBeers: React.PropTypes.array,
};
