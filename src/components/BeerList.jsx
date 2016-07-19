import React, { Component } from 'react';
import SingleBeer from './SingleBeer';

export default class BeerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beers: [],
    };
  }

  // Called when the AJAX call in UserProfile is finished
  // updates the beers array
  componentWillReceiveProps(newProps = {}) {
    this.setState({ beers: newProps.beers });
  }

  render() {
    return (
      <ul className="beer-list">
        {this.state.beers.map((beer, i) =>
          <SingleBeer key={i} id={beer._id} rating={beer.rating} />)}
      </ul>
    );
  }
}

BeerList.propTypes = {
  beers: React.PropTypes.array,
};
