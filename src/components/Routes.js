import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard';
import Notes from './Notes';
import Note from './Note';
import Login from './Login';

export default () => {
  return (
      <div>
        <Route path='/' exact component={Dashboard} />
        <Route path='/login' component={Login} />
        <Route exact path='/notes' component={Notes} />
        <Route path="/notes/:id" component={Note}/>
      </div>
  );
};
