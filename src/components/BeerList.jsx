import React, { Component } from 'react';
import SingleBeer from './SingleBeer';
import AddBeerModal from './AddBeerModal';
import { saveUserBeerList, fetchUserData } from '../actions/userActions';

export default class BeerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listIsBeingEdited: false,
      displayModal: false,
    };
    this.handleEditClick = this.handleEditClick.bind(this);
    this.addBeerToList = this.addBeerToList.bind(this);
    this.closeModalFromChild = this.closeModalFromChild.bind(this);
  }

  handleEditClick() {
    // Keeps track of whether the list is being edited or not
    // Sends that info to SingleBeer as a prop

    if (this.state.listIsBeingEdited) {
      saveUserBeerList(this.props.userID);
    }

    this.setState({ listIsBeingEdited: !this.state.listIsBeingEdited });
  }

  addBeerToList() {
    this.setState({ displayModal: !this.state.displayModal });
  }

  closeModalFromChild() {
    this.setState({ displayModal: false });
  }

  render() {
    return (
      <div className="container">
        <h3>Your Beers</h3>

        <button
          style={{ float: 'right' }} onClick={this.handleEditClick}
          className="btn btn-primary"
        >
        {this.state.listIsBeingEdited ? 'Save your list' : 'Edit your list'}
        </button>

        <button
          style={{ float: 'right',
          display: this.state.listIsBeingEdited ? 'inline-block' : 'none' }}
          className="btn btn-success" onClick={this.addBeerToList}
        >Add a Beer</button>

        <ul className="beer-list" style={{ listStyle: 'none', paddingTop: 32 }}>
          {this.props.usersBeers.map((beer, i) =>
            /* eslint-disable */ // Disabling for _id that is how it is returned from DB
            <SingleBeer
              key={i} id={i} name={beer._id.name} yourRating={beer.rating}
              overallRating={beer._id.rating} style={beer._id.style}
              listIsBeingEdited={this.state.listIsBeingEdited}
              /* eslint-disable */
            />)}
        </ul>
        <AddBeerModal 
          closeModal={this.closeModalFromChild} 
          displayModal={this.state.displayModal} 
          availableBeers={this.props.availableBeers} usersBeers={this.props.usersBeers}
        />
      </div>
    );
  }
}

BeerList.propTypes = {
  usersBeers: React.PropTypes.array,
  userID: React.PropTypes.string,
};
