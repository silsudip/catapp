import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, HashRouter, Link, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Upload from './components/Upload';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <nav>
          <ul className="TopContainer">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/upload">Upload</Link></li>
          </ul>
        </nav>
        <Switch>
          <Route path="/upload">
            <Upload />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
