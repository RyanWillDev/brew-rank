import React, { Component } from 'react';

export default class SingleBeer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const spanStyle = {
      paddingRight: 50,
      display: 'inline-block',
      textTransform: 'capitalize',
    };

    const rowStyle = {
      marginTop: 24,
    };
    return (
      <li style={rowStyle}className="row">
        <div className="col-sm-12">
          <span style={spanStyle}>Name: {this.props.name}</span>
          <span style={spanStyle}>Style: {this.props.style}</span>
          <span style={spanStyle}>Your rating: {this.props.yourRating}</span>
          <span style={spanStyle}>Overall rating: {this.props.overallRating}</span>
        </div>
      </li>
    );
  }
}

SingleBeer.propTypes = {
  name: React.PropTypes.string,
  yourRating: React.PropTypes.number,
  overallRating: React.PropTypes.number,
  style: React.PropTypes.string
};
