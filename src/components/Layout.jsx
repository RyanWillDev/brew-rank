import React from 'react';

// Import components
import Nav from './Nav';

const Layout = (props) => (
  <div className="layout-container">
    <Nav />
    {React.cloneElement(props.children, props)}
  </div>
);

Layout.propTypes = {
  children: React.PropTypes.object,
};

export default Layout;
