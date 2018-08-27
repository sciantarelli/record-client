import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from './Dashboard';
import Notes from './Notes';
import Note from './Note';
import Ideas from './Ideas';
import Login from './Login';
import Logout from './Logout';
import NotFound from './NotFound';
import ComingSoon from './ComingSoon';
import { NEW_ID, LOGIN_PATH, LOGOUT_PATH, NOTES_PATH, NEW_NOTE_PATH } from '../constants';

export default () => {
  return (
      <React.Fragment>
        <Switch>
          <Route path='/' exact component={Dashboard} />
          <Route path={LOGIN_PATH} component={Login} />
          <Route path={LOGOUT_PATH} component={Logout} />
          <Route exact path='/tags' component={ComingSoon} />
          <Route exact path={NOTES_PATH} component={Notes} />
          <Route exact path={NEW_NOTE_PATH} render={()=>
              <Note skipLoad={true} id={NEW_ID} />
            }
          />
          <Route path={`${NOTES_PATH}/:id`} component={Note}/>
          <Route exact path='/ideas' component={Ideas} />
          <Route exact path='/bookmarks' component={ComingSoon} />
          <Route exact path='/alerts' component={ComingSoon} />
          <Route path='/404' component={NotFound} />
          <Redirect to="/404" />
        </Switch>
      </React.Fragment>
  );
};
