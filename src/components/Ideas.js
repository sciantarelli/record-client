import React from 'react';

import requireAuth from './requireAuth';
import { AppLink } from "./Links";

// TODO: crud - replace IDEAS_PATH with IDEA_PATH
import { IDEAS_PATH, NOTES_ENDPOINT } from "../constants";
import Fetch from "./Fetch";

const Ideas = () => {
  return (
      <>
        <ul>
          <Fetch endpoint={NOTES_ENDPOINT}
                 renderComponent={({ item }) =>
                     <AppLink to={`${IDEAS_PATH}/${item.id}`}
                              key={item.id}
                              auth={true}>
                      {item.name}
                     </AppLink>
                 }
                 renderMany={true} />
        </ul>
      </>
  )
};

export default requireAuth(Ideas);