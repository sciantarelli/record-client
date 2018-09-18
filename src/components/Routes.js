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
import { NEW_ID, LOGIN_PATH, LOGOUT_PATH, NOTES_PATH, NEW_NOTE_PATH, IDEAS_PATH, DASHBOARD_PATH, TAGS_PATH, ALERTS_PATH, BOOKMARKS_PATH, NOT_FOUND_PATH } from '../constants';

export default () => {
  return (
      <React.Fragment>
        <Switch>
          <Route path={DASHBOARD_PATH} exact component={Dashboard} />
          <Route path={LOGIN_PATH} component={Login} />
          <Route path={LOGOUT_PATH} component={Logout} />
          <Route exact path={TAGS_PATH} component={ComingSoon} />
          <Route exact path={NOTES_PATH} component={Notes} />
          <Route exact path={NEW_NOTE_PATH} render={()=>
              <Note skipLoad={true} id={NEW_ID} />
            }
          />
          <Route path={`${NOTES_PATH}/:id`} component={Note}/>
          <Route exact path={IDEAS_PATH} component={Ideas} />
          <Route exact path={BOOKMARKS_PATH} component={ComingSoon} />
          <Route exact path={ALERTS_PATH} component={ComingSoon} />
          <Route path={NOT_FOUND_PATH} component={NotFound} />
          <Redirect to={NOT_FOUND_PATH} />
        </Switch>
      </React.Fragment>
  );
};
