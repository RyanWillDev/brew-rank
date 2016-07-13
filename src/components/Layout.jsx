
import React, { Component } from 'react';

// Import components
import Nav from './Nav';
import LandingContent from './LandingContent';


export default class Layout extends Component {
  render() {
    return (
      <div className="layout-container">
        <Nav />
        {this.props.children}
      </div>
    );
  }
}

Layout.propTypes = {
  children: React.PropTypes.object,
};
