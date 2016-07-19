import React, { Component } from 'react';

export default class SingleBeer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <li className="beer">
        <span className="name">id: {this.props.id}</span>
        <br/>
        <span className="rating">rating: {this.props.rating}</span>
      </li>
    );
  }
}

SingleBeer.propTypes = {
  id: React.PropTypes.string,
  rating: React.PropTypes.number,
};
