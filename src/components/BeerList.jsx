import React, { Component } from 'react';
import SingleBeer from './SingleBeer';

export default class BeerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beers: [],
      listIsbeingEdited: false,
    };
    this.handleEditClick = this.handleEditClick.bind(this);
  }

  // Called when the AJAX call in UserProfile is finished
  // updates the beers array
  componentWillReceiveProps(newProps = {}) {
    this.setState({ beers: newProps.beers });
  }

  handleEditClick() {
    this.setState({ listIsbeingEdited: !this.state.listIsbeingEdited });
  }

  render() {
    let editButtonText;
    if (this.state.listIsbeingEdited) {
      editButtonText = 'Save your list';
    } else {
      editButtonText = 'Edit your list';
    }
    return (
      <div className="container">
      <h1>Your Beers</h1>
      <button style={{ float: 'right' }} onClick={this.handleEditClick}
        className="btn btn-primary"
      >
      {editButtonText}
      </button>
        <ul className="beer-list" style={{ listStyle: 'none', paddingTop: 50 }}>
          {this.state.beers.map((beer, i) =>
            <SingleBeer key={i} name={beer._id.name} yourRating={beer.rating}
              overallRating={beer._id.rating} style={beer._id.style}
            />)}
        </ul>
      </div>
    );
  }
}

BeerList.propTypes = {
  beers: React.PropTypes.array,
};
