import React from 'react';

// Import components
import Nav from './Nav';

const Layout = () => (
  <div className="layout-container">
    <Nav />
    {React.cloneElement(this.props.children, this.props)}
  </div>
);

Layout.propTypes = {
  children: React.PropTypes.object,
};
