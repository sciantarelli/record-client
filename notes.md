*** Original Record build (w/ just Rails, not React) appears to have been built and was last running in UbuntuHome

```javascript
var s = "JavaScript syntax highlighting";
alert(s);
```

* [To Do List](#to-do-list)
* [Frontend](#frontend)
  * [Commands](#commands)
  * [Node Server and SSR](#node-server-and-ssr)
    * [Data Handling and API Considerations](#data-handling-and-api-considerations)
    * [Assets](#assets)
    * [Code Splitting and Cache Busting](#code-splitting-and-cache-busting)
  * [Ajax Calls to API](#ajax-calls-to-api)
  * [UI](#ui)
    * [Packages](#packages)
    * [Layout](#layout)
    * [Brainstorming](#brainstorming)
    * [Markdown](#markdown)
  * [Code Considerations](#code-considerations)
  * [Testing](#testing)
    * [e2e Tests](#e2e-tests)
    * [Integration Tests](#integration-tests)
* [Backend](#backend)
* [Deployment](#deployment)


## To Do List

* Convert this to markdown
* Consolidate notes_data_syncing_and_ui_state into this note
* Explore the idea of using indexed-db, maybe with redux-persist
* Consider a feature list, and issue tracking


#### What's Next

* encryption
* data syncing
* offline
* adding ideas component (this isn't super flashy for showing off)
* adding tagging to notes and ideas (ideas must be done before this). Need to think through how tags are applied on desktop and mobile
* capturing ui state, better local storage handling and maybe database storing as well
* side by side editing / multiple viewable notes (this would be very flashy and handy). And remember when designing UI/nav, that you need to be able to have the same note open on both sides!
* multiple new notes
* UI Improvements
* CSS overhaul, determine strategy (this depends on how much I can optimize the Node server)



# Frontend


## Commands

**Production Bundling**
1. npm run build, used by node server for SSR

**Run server w/ SSR**
1. Set NODE_ENV = development
2. node server/bootstrap.js

**Run server w/ create-react-app**
1. npm run start

**Run server w/ create-react-app for production testing**
1. npm run build
2. serve -s build

**Run server w/ create-react-app for testcafe**
1. npm run start-for-test

**Run Tests**
1. npm run test (default test runner that runs saga tests)
2. npm run testcafe (runs e2e tests, must run first: npm run start-for-test)


## Node Server and SSR

The server was built by referencing:

* udemy-advanced-react-and-redux source code (from Udemy course)
* and this tutorial: [upgrade create-react-app with ssr and code splitting](https://medium.com/bucharestjs/upgrading-a-create-react-app-project-to-a-ssr-code-splitting-setup-9da57df2040a)


### Data Handling and API Considerations

Currently, Node server doesn't communicate with API. It's all on the client. It could. In the Udemy SSR course, Stephen Grider) solved by proxying all requests through it, and I didn't like it. Seemed unnecessary, but SEO would be better for some sites.

Part 2 of this tutorial suggests not to fetch API data during SSR: [upgrade create-react-app with ssr and code splitting](https://medium.com/bucharestjs/upgrading-a-create-react-app-project-to-a-ssr-code-splitting-setup-9da57df2040a)

This article talks in depth about [app shells](https://developers.google.com/web/updates/2015/11/app-shell)

Here's another tutorial for [SSR data fetching w/ API](https://www.sitepoint.com/asynchronous-apis-server-rendered-react/)


### Assets
[Udemy discussion](https://www.udemy.com/server-side-rendering-with-react-and-redux/learn/v4/questions/3068622)


### Code Splitting and Cache Busting
[Udemy discussion](https://www.udemy.com/server-side-rendering-with-react-and-redux/learn/v4/questions/2997916)


## Ajax Calls to API

Currently using axios and redux-saga. Other possibilities:

* redux-thunk uses middleware for dispatching sync and async actions in a similar way
* redux-observable is apparently harder to learn, but is respected
* redux-cycle is another I haven't looked into
* [reddit discussion on sagas, observable, etc](https://www.reddit.com/r/reactjs/comments/7yhhnx/reduxsaga_or_reduxobservable/)


## UI

Theming tutorial from [getbootstrap.com](https://getbootstrap.com/docs/4.0/getting-started/theming/)


### Packages

* elected to use bootstrap and reactstrap packages, but reactstrap is used sparingly at this point. Not sure I'll keep it.
* also had considered:
  * material ui (very opinionated, I've read)
  * semantics ui (good, but bloated maybe? 20 different themes included and such)
  * react-bootstrap (popular, but didn't support Bootstrap V4 at the time of implementation


### Layout

**Centered Container**
* ">= lg(?)" set a max width, and consider allow the user to change it. Perhaps they can select the percentage of screen width they'd like. Should be persistent across sessions, at least someday.

**Left Panel**
* ">= md(?)"
  * consider a folder-like structure, with the highest level directories being the main components
  * or, just recreate the same main nav links at the top and display records below them when clicked

**Split Views**
* the idea here is to mimic an IDE, like Rubymine, allowing multiple open records on each side


### Brainstorming

Here are some notes on navigation revisions and the left-side panel. See legal pad notes as well...

Including most used tags as top level nav items

For me, I would have tons of notes that are “my_comedy”. This would appear as the #1 tag in the nav

What about allowing user ability to create (note) presets (templates)? Then, presets are applied to Notes and the tags in the presets are possibly non editable. Or, what if MM determined your most used tags, and offered "Create Some Tag Name", ie "Create My Comedy Note", which auto included that tag?

To fully mimic Notebooks or Categories, which would drive the navigation, the user should be able to opt-in and choose which tags are/are not listed in the navigation. Or, should this be a separate navigation menu altogether? Think about “recent” nav as well, and what Evernote calls “shortcuts” menu.

Since the navigation would be dynamic, as tags are updated, applied, and removed from notes, it would have to update. Where to do this, on the client? Probably, and the redux store may have to reflect it in a simple id mapping structure for counting.

Another idea, from Michael Hyatt, is to use special characters for special tags. For example, ^some_note_1, ^some_note_2, $some_idea_1, $some_idea_2. The tags with special characters could appear in the tag navigation automatically


### Markdown

Would like to do this at some point, not sure what the implementation would look like quite yet.


## Code Considerations

* Redux Boilerplate. This creates actions and reducers for CRUD operations [redux-crud](https://github.com/Versent/redux-crud)


## Testing
* jest runs everything it can find under src, not just in "tests" directory. End to end tests are therefore named with ...e2e.js convention, instead of .test.js
* testcafe is setup to run just the "tests/e2e" directory


### e2e Tests

**Testcafe Notes**

* consider some stress testing, simulating user clicking buttons too fast and such
* For now, I decided not to use testcafe-react-selectors to keep testing framework independent
* TestCafe runs tests from the test or tests directories by default
* you can take screenshots, even optionally only on failing tests
* quarantine mode is for capturing tests that sometimes fails, but not always
* --debug-mode for debugging, or --debug-on-fail

**Testcafe Procedures**

1. start test server with: npm run start-for-test
2. The commands in package.json work, but **currently running all tests consecutively is failing**. Almost positive it's nothing I'm doing wrong, seems like the session gets disconnected partly through and causes the browser to logout incorrectly (because local storage "auth" is null)
  * for now, run tests individually like such: testcafe "chrome" src/tests/e2e/notes.test.js
  * I tried running tests concurrently, but that didn't fix the issue either: testcafe -c 3 "chrome" src/tests/e2e


### Integration Tests

**Redux Saga Test Plan**

* Two types of tests available:
  1. Unit Testing w/ testSaga() function. "If you want to ensure that your saga yields specific types of effects in a particular order"
  2. Integration Testing w/ expectSaga() function. For testing sagas + reducers, or just sagas final action via "put"
* using silentRun() because watchAll uses takeEvery, and the async timeout messages are annoying and not useful in this case
* tried creating multiple notes in notes delete test, but doNewNote() wasn't working for call to create a second note. Not sure why.
* decided not to test auth state in notes tests, but it is done for error tests, which should suffice for now
* Seems like unit tests (type 1 above) would be useful, especially if state can be tested along the way

#### More Notes on Saga Testing

[Article on testing options](https://blog.scottlogic.com/2018/01/16/evaluating-redux-saga-test-libraries.html)

3 types of testing (referenced below in alternative packages):

1. exact (exact order)
2. recording (testing only specific effects)
3. integration testing

##### Alternative Strategies / Packages

1. **native testing** (1) (cloneable generator)
  * used only for exact order testing, I think. Definitely not integration testing
2. **redux-saga-test-plan** (558 stars) (1,2,3)
  * supports exact order testing with its testSaga function. It provides a means of chaining assertions into a single test
  * by instead using its expectSaga function, you can instead have the saga run until completion without having to manually advance it. You can provide any mock values for effects during setup
3. **redux-saga-testing** (107 stars) (1)
  * overrides the test function (ie it), so that each test case advances the generator
  * it can magnify the issues encountered by exact testing because of its lack of support for cloneableGenerator. Small structural changes to a saga will cause many test failures
  * can be enhanced with a reducer, or some static state, so that it can run as an integration test. With this approach you can additionally assert on the final state of the reducer, after the saga runs until completion
4. **redux-saga-test** (27 stars) (1) (cloneable generator)
  * provides a convenient shorthand syntax for asserting effects yielded from a saga
5. **redux-saga-test-engine** (35 stars) (2)
  * adopts a similar approach to redux-saga-test-plan
6. **redux-saga-tester** (175 stars) (3)
  * As an integration test framework, redux-saga-tester provides an class to run a saga alongside a reducer, an initial state and potentially some extra middleware


# Backend





















# The End