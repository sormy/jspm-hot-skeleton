import React from 'react';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <div>Hello, World!</div>
        <div>
          Font Awesome: <i className="fa fa-fort-awesome" aria-hidden="true"></i>
        </div>
        <div>
          <button className="btn btn-primary">
            Bootstrap Primary Button (should be red if theme overrides are working well)
          </button>
        </div>
      </div>
    );
  }
}
