import React from 'react';

const SingleBeer = (props) => {
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
    display: props.listIsBeingEdited ? 'inline-block' : 'none',
  };

  return (
    <li style={rowStyle}className="row">
      <div className="col-sm-12">
        <span style={spanStyle}>Name: {props.name}</span>
        <span style={spanStyle}>Style: {props.style}</span>
        <span style={spanStyle}>Your rating:
        <input type="number"
          defaultValue={props.yourRating} disabled={!props.listIsBeingEdited}
          min="0" max="5"
        />
        </span>
        <span style={spanStyle}>Overall rating: {props.overallRating}</span>
        <button className="btn btn-danger" style={removeButtonStyle}>Remove</button>
      </div>
    </li>
  );
};

export default SingleBeer;

SingleBeer.propTypes = {
  name: React.PropTypes.string,
  yourRating: React.PropTypes.number,
  overallRating: React.PropTypes.number,
  style: React.PropTypes.string,
  listIsBeingEdited: React.PropTypes.bool,
};
