import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Dashboard from './Dashboard'
import Notes from './Notes'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path='/' exact component={Dashboard} />
          <Route path='/notes' component={Notes} />
        </div>
      </Router>
    );
  }
}

export default App;
