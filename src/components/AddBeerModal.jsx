import React, { Component } from 'react';
import BeerOption from './BeerOption';
import { addBeerToUsersList } from '../actions/userActions';

export default class AddBeerModal extends Component {
  constructor(props) {
    super(props);
    this.addBeerToList = this.addBeerToList.bind(this);
  }

  addBeerToList() {
    const id = this.refs.selectedBeer.value;

    // Make sure beer is not already on users list
    const isNotOnList = this.props.usersBeers.every((beer) => beer._id._id !== id);

    if (isNotOnList) {
      // Get the beer data from list of availableBeers
      const beerToAdd = this.props.availableBeers.find((beer) => id === beer._id);

      // Dispatch action to add beer to list
      addBeerToUsersList(beerToAdd);
      this.props.closeModal();
    }
  }

  render() {
    const selectStyle = {
      display: 'block',
      width: '60%',
      margin: '32px 0 8px',
      fontSize: '1.2em',
      textTransform: 'capitalize',
    };
    return (
      <div className="modal" style={{ display: this.props.displayModal ? 'inline-block' : 'none' }}>
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Which beer would you like to add?</h4>
          </div>
          <select ref="selectedBeer" style={selectStyle}>
            {this.props.availableBeers.map((beer, i) =>
              <BeerOption name={beer.name} _id={beer._id} key={i} />
            )}
          </select>
          <div className="btn-group">
            <button onClick={this.props.closeModal} className="btn btn-danger">Cancel</button>
            <button
              onClick={this.addBeerToList}
              className="btn btn-primary"
            >Add to list
            </button>
          </div>
        </div>
      </div>
    );
  }
}

AddBeerModal.propTypes = {
  availableBeers: React.PropTypes.array,
  displayModal: React.PropTypes.bool,
  closeModal: React.PropTypes.func,
  usersBeers: React.PropTypes.array,
};

