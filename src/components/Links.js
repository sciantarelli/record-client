import React, { Component } from 'react';
import AppLink from './AppLink';
import NavLink from './NavLink';


const openNoteNavLink = (openNote, id) => {
  return componentNavLink(openNote, '/notes', true, id);
};


const componentNavLink = (component, path, requireAuth=true, idOverride=null) => {
  const id = idOverride || component.id;

  return (
    <NavLink to={`${path}/${id}`}
             auth={requireAuth}
             key={id}
             addClasses={(component.isDirty ? ['unsaved'] : [] )}>

      {abbrevForNavLink(component.name)}
    </NavLink>
  );
};


const abbrevForNavLink = (text) => {
  const maxLength = 15;

  if (text.length <= maxLength) return text;

  return `${text.substring(0, maxLength)}...`;
};


export { AppLink, NavLink, openNoteNavLink };