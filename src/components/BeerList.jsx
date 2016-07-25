import React, { Component } from 'react';
import SingleBeer from './SingleBeer';

export default class BeerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beers: [],
      listIsBeingEdited: false,
    };
    this.handleEditClick = this.handleEditClick.bind(this);
  }

  // Called when the AJAX call in UserProfile is finished
  // updates the beers array
  componentWillReceiveProps(newProps = {}) {
    this.setState({ beers: newProps.beers });
  }

  handleEditClick() {
    // Keeps track of whether the list is being edited or not
    // Sends that info to SingleBeer as a prop
    this.setState({ listIsBeingEdited: !this.state.listIsBeingEdited });
  }

  render() {
    return (
      <div className="container">
      <h1>Your Beers</h1>

      <button style={{ float: 'right' }} onClick={this.handleEditClick}
        className="btn btn-primary"
      >
      {this.state.listIsBeingEdited ? 'Save your list' : 'Edit your list'}
      </button>

      <button style ={{ float: 'right',
        display: this.state.listIsBeingEdited ? 'inline-block' : 'none' }}
        className="btn btn-success"
      >Add a Beer</button>

        <ul className="beer-list" style={{ listStyle: 'none', paddingTop: 50 }}>
          {this.state.beers.map((beer, i) =>
            <SingleBeer key={i} name={beer._id.name} yourRating={beer.rating}
              overallRating={beer._id.rating} style={beer._id.style}
              listIsBeingEdited={this.state.listIsBeingEdited}
            />)}
        </ul>
      </div>
    );
  }
}

BeerList.propTypes = {
  beers: React.PropTypes.array,
};
