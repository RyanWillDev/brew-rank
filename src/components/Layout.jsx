
import React, { Component } from 'react';

// Import components
import Nav from './Nav';
import LandingContent from './LandingContent';


export default class extends Component {
  render() {
    return (
      <div className="layout-container">
        <Nav />
        <LandingContent />
      </div>
    );
  }
}
