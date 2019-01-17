import React from 'react';
import { MainNavUL, ComponentNavLI } from './style';
import { LOGOUT_PATH, NOTES_PATH, IDEAS_PATH, DASHBOARD_PATH, TAGS_PATH, ALERTS_PATH, BOOKMARKS_PATH } from '../../constants';


const NavItemsMain = () => {

  return (
    <MainNavUL>
      <ComponentNavLI to={DASHBOARD_PATH}>Dashboard</ComponentNavLI>
      <ComponentNavLI to={TAGS_PATH}>Tags</ComponentNavLI>
      <ComponentNavLI to={NOTES_PATH}>Notes</ComponentNavLI>
      <ComponentNavLI to={IDEAS_PATH}>Ideas</ComponentNavLI>
      <ComponentNavLI to={BOOKMARKS_PATH}>Bookmarks</ComponentNavLI>
      <ComponentNavLI to={ALERTS_PATH}>Alerts</ComponentNavLI>
      <ComponentNavLI to={LOGOUT_PATH}>Logout</ComponentNavLI>

      <ComponentNavLI to={DASHBOARD_PATH}>Pinned Note One</ComponentNavLI>
      <ComponentNavLI to={DASHBOARD_PATH}>Pinned Note Two</ComponentNavLI>
      <ComponentNavLI to={DASHBOARD_PATH}>Pinned Idea One</ComponentNavLI>
      <ComponentNavLI to={DASHBOARD_PATH}>Pinned Journal One</ComponentNavLI>

      <ComponentNavLI to={DASHBOARD_PATH}>
        Nesting Example

        <ul>
          { [...Array(5)].map((e, i) =>
              <ComponentNavLI to={DASHBOARD_PATH}>
                { `Nested Item ${i}` }
              </ComponentNavLI>)
          }
        </ul>

      </ComponentNavLI>

      <ComponentNavLI to={DASHBOARD_PATH}>
        Item With Long Name Here As An Example
      </ComponentNavLI>

      { [...Array(50)].map((e, i) =>
          <ComponentNavLI to={DASHBOARD_PATH}>
            { `Item Number ${i}` }
          </ComponentNavLI>)
      }
    </MainNavUL>
  )

};


export default NavItemsMain;