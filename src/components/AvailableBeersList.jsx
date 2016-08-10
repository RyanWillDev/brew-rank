import React from 'react';

const AvailableBeersList = (props) => {
  const spanStyle = {
    paddingRight: 50,
    display: 'inline-block',
    textTransform: 'capitalize',
    fontWeight: 500,
  };

  const rowStyle = {
    marginTop: 24,
  };

  return (
    <ul style={{ listStyle: 'none' }}>
    {props.availableBeers.map((beer, i) => {
      return (
        <li style={rowStyle} className="row" key={i}>
          <div className="col-sm-12">
            <span style={spanStyle}>{beer.name}</span>
            <span style={spanStyle}>{beer.brewery}</span>
            <span style={spanStyle}>Rating: {beer.rating}</span>
            <button className="btn btn-danger">Remove</button>
          </div>
        </li>
      );
    })
    }
    </ul>
  );
};


export default AvailableBeersList;

AvailableBeersList.propTypes = {
  availableBeers: React.PropTypes.array,
};
