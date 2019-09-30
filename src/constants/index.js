export const BASE_API_URL = `${process.env.REACT_APP_API_HOST}/v1`;

export const NEW_ID = 'new';
export const NEW_NOTE_NAME = 'New Note';

// Path wildcards
export const ID_WILDCARD = ':id';

// API Endpoints
export const NOTES_ENDPOINT = '/notes';
export const NOTE_ENDPOINT = `${NOTES_ENDPOINT}/${ID_WILDCARD}`;
export const IDEAS_ENDPOINT = '/ideas';
export const IDEA_ENDPOINT = `${IDEAS_ENDPOINT}/${ID_WILDCARD}`;

// App paths
export const LOGIN_PATH = '/login';
export const LOGOUT_PATH = '/logout';
export const DASHBOARD_PATH = '/';
export const IDEAS_PATH = '/ideas';
export const BOOKMARKS_PATH = '/bookmarks';
export const TAGS_PATH = '/tags';
export const ALERTS_PATH = '/tags';
export const NOTES_PATH = '/notes';
export const NEW_NOTE_PATH = `${NOTES_PATH}/${NEW_ID}`;
export const NOT_FOUND_PATH = '/404';

// Forms
export const IDEA_FORM = 'IdeaForm';

export const AUTH_STORAGE = 'auth';
