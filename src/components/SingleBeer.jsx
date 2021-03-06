import React from 'react';
import { removeBeerFromList, updateRating } from '../actions/userActions';


const SingleBeer = (props) => {
  const spanStyle = {
    paddingRight: 50,
    display: 'inline-block',
    textTransform: 'capitalize',
    fontWeight: 500,
  };

  const rowStyle = {
    marginTop: 24,
  };

  const removeButtonStyle = {
    // Show or hide buttons depending on whether the list is being edited or not
    display: props.listIsBeingEdited ? 'inline-block' : 'none',
  };

  const handleRatingChange = (id) => {
    const rating = parseInt(document.getElementById(`item-${id}`).value, 10); // 10 for decimal
    updateRating(id, rating);
  };

  return (
    <li style={rowStyle} className="row">
      <div className="col-sm-12">
        <span style={spanStyle}>Name: {props.name}</span>
        <span style={spanStyle}>Style: {props.style}</span>
        <span style={spanStyle}>Your rating:
          <input
            type="number" id={`item-${props.id}`}
            defaultValue={props.yourRating} disabled={!props.listIsBeingEdited}
            min="0" max="5" onChange={handleRatingChange.bind(null, props.id)}
          />
        </span>
        <span style={spanStyle}>Overall rating: {props.overallRating}</span>
        <button
          onClick={removeBeerFromList.bind(null, props.id)}
          className="btn btn-danger" style={removeButtonStyle}
        >Remove</button>
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
  id: React.PropTypes.number,
};
