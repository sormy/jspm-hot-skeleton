import React from 'react';

import Counter from './Counter';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <div>Hello, World!</div>
        <div>Open Sans Font</div>
        <div>
          Font Awesome: <i className="fa fa-font-awesome" aria-hidden="true"></i>
        </div>
        <div>
          <button
            className="btn btn-primary"
            data-toggle="tooltip"
            title="If you see fancy Bootstrap tooltip than Bootstrap JS part works well"
          >
            Bootstrap Primary Button
          </button>
          (should be red if theme overrides are working well + should have fancy tooltip)
        </div>
        <div>
          Stateful component: <Counter />
        </div>
      </div>
    );
  }
}
