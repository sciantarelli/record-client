import React from 'react';
import { connect } from 'react-redux';

import requireAuth from './auth/requireAuth';
import Fetch from "./data/Fetch";
import { AppLink } from "./navigation/Links";
import { ButtonNaked } from "./input/Buttons";
import ActionsBar from "./input/ActionsBar";

import { doNew } from "../actions/crudActions";
import { doDispatchThenRoute } from "../actions/routing";
import { makeDataKey } from "../helpers";

import { IDEAS_PATH, NEW_IDEA_PATH, NOTES_ENDPOINT } from "../constants";
import { DEFAULT_NOTE_STATE } from "../reducers/openNotes";

// TODO: crud - replace IDEAS_PATH with IDEA_PATH


const Ideas = ({ doDispatchThenRoute }) => {
    const dataKey = makeDataKey(NOTES_ENDPOINT, true);

  return (
      <>
          <ActionsBar>
              <ButtonNaked onClick={() =>
                  doDispatchThenRoute(
                      doNew(dataKey, DEFAULT_NOTE_STATE),
                      NEW_IDEA_PATH
                  )}>
                  Create Idea
              </ButtonNaked>
          </ActionsBar>

          {/* TODO: crud - add error container */}

          <ul>
              <Fetch endpoint={NOTES_ENDPOINT}
                     renderComponent={({item}) =>
                         <AppLink to={`${IDEAS_PATH}/${item.id}`}
                                  key={item.id}
                                  auth={true}>
                             {item.name}
                         </AppLink>
                     }
                     renderMany={true}/>
          </ul>
      </>
  )
};

const mapDispatchToProps = {
    doDispatchThenRoute
};

export default connect(null, mapDispatchToProps)(requireAuth(Ideas));