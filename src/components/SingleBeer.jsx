import React, { Component } from 'react';

export default class SingleBeer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRemoveButtons: this.props.listIsBeingEdited,
    };
  }

  componentWillReceiveProps(newProps = {}) {
    this.setState({ showRemoveButtons: newProps.listIsBeingEdited });
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

    const removeButtonStyle = {
      // Show or hide buttons
      display: this.state.showRemoveButtons ? 'inline-block' : 'none',
    };

    return (
      <li style={rowStyle}className="row">
        <div className="col-sm-12">
          <span style={spanStyle}>Name: {this.props.name}</span>
          <span style={spanStyle}>Style: {this.props.style}</span>
          <span style={spanStyle}>Your rating:
          <input type="number"
            defaultValue={this.props.yourRating} disabled={!this.state.showRemoveButtons}
            min="0" max="5"
          />
          </span>
          <span style={spanStyle}>Overall rating: {this.props.overallRating}</span>
          <button className="btn btn-danger" style={removeButtonStyle}>Remove</button>
        </div>
      </li>
    );
  }
}

SingleBeer.propTypes = {
  name: React.PropTypes.string,
  yourRating: React.PropTypes.number,
  overallRating: React.PropTypes.number,
  style: React.PropTypes.string,
  listIsBeingEdited: React.PropTypes.bool,
};
