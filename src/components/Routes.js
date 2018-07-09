import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard';
import Notes from './Notes';

export default () => {
  return (
      <div>
        <Route path='/' exact component={Dashboard} />
        <Route path='/notes' component={Notes} />
      </div>
  );
};
