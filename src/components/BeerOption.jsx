import React from 'react';

const BeerOption = (props) => (
  <option value={props._id}>{props.name}</option>
);


BeerOption.propTypes = {
  _id: React.PropTypes.string,
  name: React.PropTypes.string,
};

export default BeerOption;
