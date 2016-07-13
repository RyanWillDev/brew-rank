import React, { Component } from 'react';

export default class LandingContent extends Component {
  render() {
    return (
      <main className="landing">
        <div className="container">
          <div className="jumbotron">
            <h1>BrewRank</h1>
            <p>Helping Brew Pubs, Tasting Rooms, and more make better ordering decisions
              by providing customer ratings of of your brews.
            </p>
          </div>
        </div>
      </main>
    );
  }
}
