import React from 'react';
import Container from '../../src/NewComponent';
import './DemoApp.css';

function DemoApp() {
  return (
    <div className="app">
      <header className="app-header">
        <p>
          Edit <code>src/DemoApp.js</code> and save to reload.
        </p>
        <a
          className="app-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <NewComponent>
        This is into a NewComponent
      </NewComponent>
    </div>
  );
}

export default DemoApp;
