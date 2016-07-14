
import React, { Component } from 'react';

// Import components
import Nav from './Nav';

export default class Layout extends Component {
  render() {
    return (
      <div className="layout-container">
        <Nav />
        {React.cloneElement(this.props.children, this.props)}
      </div>
    );
  }
}

Layout.propTypes = {
  children: React.PropTypes.object,
};
