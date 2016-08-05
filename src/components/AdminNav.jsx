import React, { PureComponent } from 'react';

export default class AdminNav extends PureComponent {

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="nav navbar navbar-left">
            <h3 style={{ display: 'inline-block', marginRight: '16px' }}>Manage</h3>
            <select ref="select" defaultValue="beers" onChange={this.props.handleListChange}>
              <option value="users">Users</option>
              <option value="beers">Beers</option>
            </select>
          </div>
        </div>
      </nav>
    );
  }
}

AdminNav.propTypes = {
  handleListChange: React.PropTypes.func,
};
