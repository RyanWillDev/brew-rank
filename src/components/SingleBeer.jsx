import React, { Component } from 'react';

export default class SingleBeer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <li className="beer">
        <span className="name">name: {this.props.name}</span>
        <br/>
        <span className="rating">your rating: {this.props.yourRating}</span>
        <br/>
        <span className="rating">overall rating: {this.props.overallRating}</span>
      </li>
    );
  }
}

SingleBeer.propTypes = {
  name: React.PropTypes.string,
  yourRating: React.PropTypes.number,
  overallRating: React.PropTypes.number,
};
