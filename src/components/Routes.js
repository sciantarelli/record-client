import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from './Dashboard';
import Notes from './Notes';
import Note from './Note';
import Ideas from './Ideas';
import Login from './Login';
import Logout from './Logout';
import NotFound from './NotFound';

export default () => {
  return (
      <div>
        <Switch>
          <Route path='/' exact component={Dashboard} />
          <Route path='/login' component={Login} />
          <Route path='/logout' component={Logout} />
          <Route exact path='/notes' component={Notes} />
          <Route exact path='/notes/new' render={()=>
              <Note skipLoad={true} id={'new'} />
            }
          />
          <Route path="/notes/:id" component={Note}/>
          <Route exact path='/ideas' component={Ideas} />
          <Route path='/404' component={NotFound} />
          <Redirect to="/404" />
        </Switch>
      </div>
  );
};
