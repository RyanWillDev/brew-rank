import React, { Component } from 'react';
import SingleBeer from './SingleBeer';

export default class BeerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listIsBeingEdited: false,
    };
    this.handleEditClick = this.handleEditClick.bind(this);
  }

  handleEditClick() {
    // Keeps track of whether the list is being edited or not
    // Sends that info to SingleBeer as a prop
    this.setState({ listIsBeingEdited: !this.state.listIsBeingEdited });
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
          className="btn btn-success"
        >Add a Beer</button>

        <ul className="beer-list" style={{ listStyle: 'none', paddingTop: 32 }}>
          {this.props.usersBeers.map((beer, i) =>
            /* eslint-disable */ // Disabling for _id that is how it is returned from DB
            <SingleBeer
              key={i} name={beer._id.name} yourRating={beer.rating}
              overallRating={beer._id.rating} style={beer._id.style}
              listIsBeingEdited={this.state.listIsBeingEdited}
              /* eslint-disable */
            />)}
        </ul>
      </div>
    );
  }
}

BeerList.propTypes = {
  usersBeers: React.PropTypes.array,
};
