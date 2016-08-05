import React, { Component } from 'react';
import AdminNav from './AdminNav';

export default class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listToManage: 'beers',
    };

    this.changeListToManage = this.changeListToManage.bind(this);
  }

  changeListToManage(event) {
    this.setState({ listToManage: event.target.value });
  }

  determineListToShow() {
    if (this.state.listToManage === 'users') {
      return <h1>Managing Users</h1>;
    }
    return <h1>Managing Beers</h1>;
  }

  render() {
    return (
      <div>
        <AdminNav handleListChange={this.changeListToManage} />
        {this.determineListToShow()}
      </div>
    );
  }
}
