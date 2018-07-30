import { put } from 'redux-saga/effects';

// Originally, this was setup to handle array of actions/args. However, there isn't a need for this right now.
// There doesn't seem to be an issue with calling the actions when passing as args

// function* doActions(actions) {
//   // Allows for a single action to be passed in, like [someAction, someArg)
//   if(actions[0].constructor !== Array) {
//     actions = [actions];
//   }
//
//   for (let actionArray of actions) {
//     let action = actionArray.shift(0);
//     yield put(action.apply(this, actionArray));
//   }
// }

function* doActions(actions) {
  if(!Array.isArray(actions)) actions = [actions];

  for (let action of actions) { yield put(action) }
}

const clearAuthFromLocalStorage = () => {
  localStorage.removeItem('auth');
};


export { doActions, clearAuthFromLocalStorage };