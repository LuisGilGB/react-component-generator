import React from 'react';
import ReactDOM from 'react-dom';
import DemoApp from './DemoApp';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DemoApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});
