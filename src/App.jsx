import React from 'react';

import Counter from './Counter';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <div>Hello, World!</div>
        <div>Open Sans Font</div>
        <div>
          Font Awesome: <i className="fa fa-fort-awesome" aria-hidden="true"></i>
        </div>
        <div>
          <button className="btn btn-primary">Bootstrap Primary Button</button>
          (should be red if theme overrides are working well)
        </div>
        <div>
          Stateful component: <Counter />
        </div>
      </div>
    );
  }
}
