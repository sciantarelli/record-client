import { Selector } from 'testcafe';
import { reseed, currentPath, user } from './support/helpers';
import { DASHBOARD_PATH, IDEAS_PATH, BOOKMARKS_PATH, TAGS_PATH, NOTES_PATH, ALERTS_PATH, NOT_FOUND_PATH } from '../../constants';
import config from './support/config';


const seedData = {
  notes: [
    { name: 'Note 1', content: 'Content for Note 1' },
    { name: 'Note 2', content: 'Content for Note 2' },
    { name: 'Note 3', content: 'Content for Note 3' }
  ]
};

const navLinks = Selector('#main-nav').find('a');
const subNavLinks = Selector('.sub-nav').find('a');
const notesNavLink = navLinks.withAttribute('href', NOTES_PATH);
const noteLinks = Selector('#notes-list').find('a');
const closeButton = Selector('button').withExactText('Close');
const nameInput = Selector('form input[name=name]');
const updated = ' Updated';


fixture('Navigation')
  .before(reseed(seedData))
  .beforeEach(async t => {
    await t.useRole(user)
  })
  .page(config.app_url);


test('Main Nav Paths', async t => {
  const paths = [ TAGS_PATH, IDEAS_PATH, NOTES_PATH, BOOKMARKS_PATH, DASHBOARD_PATH, ALERTS_PATH ];

  for (const path of paths) {
    let link = navLinks.withAttribute('href', path);
    let listItem = link.parent('li');

    await t.click(link);
    await t
      .expect(await currentPath()).eql(path)
      .expect(listItem.hasClass('active-link')).ok();
  }
});


test('Sub Nav Adds/Removes Links', async t => {
  await t
  // Open first 2 notes
    .click(notesNavLink)
    .click(noteLinks.nth(0))
    .click(notesNavLink)
    .click(noteLinks.nth(1))
    .expect(subNavLinks.count).eql(3)

  // Ensure correct paths
    .click(subNavLinks.nth(1));
  await t
    .expect(await currentPath()).eql(`${NOTES_PATH}/1`);
  await t
    .click(subNavLinks.nth(2));
  await t
    .expect(await currentPath()).eql(`${NOTES_PATH}/2`);

  // Close Note 2
  await t
    .click(closeButton)
    .expect(subNavLinks.count).eql(2)

  // Go to Note 1 and Close
    .click(subNavLinks.nth(1))
    .click(closeButton)
    .expect(subNavLinks.count).eql(0);

  // await t.debug();
});


test('Sub Nav Reacts to Updates', async t => {
  const note1 = seedData.notes[0];
  const note2 = seedData.notes[1];
  const note1SubNavLink = subNavLinks.nth(1);
  const note2SubNavLink = subNavLinks.nth(2);
  const note1SubNavListItem = note1SubNavLink.parent('li');
  const note2SubNavListItem = note2SubNavLink.parent('li');

  await t
  // Open first 2 notes
    .click(notesNavLink)
    .click(noteLinks.nth(0))
    .click(notesNavLink)
    .click(noteLinks.nth(1))

  // Update Note 2 Content
    .typeText(nameInput, updated)
    .expect(note2SubNavLink.textContent).eql(note2.name + updated)
    .expect(note2SubNavListItem.hasClass('unsaved')).ok()

  // Ensure Note 1 link hasn't changed
    .expect(note1SubNavLink.textContent).eql(note1.name)
    .expect(note1SubNavListItem.hasClass('unsaved')).notOk()

  // Revert Note 2
    .selectText(nameInput)
    .pressKey('delete')
    .typeText(nameInput, note2.name)
    .expect(note2SubNavLink.textContent).eql(note2.name)
    .expect(note2SubNavListItem.hasClass('unsaved')).notOk();
});


test('Navigation Toggle', async t => {
  const navToggleButtons = Selector('#nav-toggle-buttons button');
  const mainNavToggle = navToggleButtons.withText('Nav');
  const openNavToggle = navToggleButtons.withText('Open');
  const mainNav = Selector('#main-nav');
  const subNav = Selector('.sub-nav');
  const note1 = seedData.notes[0];

  // Ensure only Nav toggle exists to start
  await t
    .expect(mainNavToggle.count).eql(1)
    .expect(openNavToggle.count).eql(0)

  // Open a note and ensure Open toggle exists
    .click(notesNavLink)
    .click(noteLinks.nth(0))
    .expect(openNavToggle.count).eql(1)

  // Test Open toggle recognizes unsaved notes
    .typeText(nameInput, updated)
    .expect(openNavToggle.hasClass('unsaved')).ok()

  // Test collapsing of navs
    .click(mainNavToggle)
    .expect(mainNav.visible).notOk()
    .click(openNavToggle)
    .expect(subNav.visible).notOk()

  // Revert note changes and ensure Open toggle recognizes there aren't any unsaved notes
    .selectText(nameInput)
    .pressKey('delete')
    .typeText(nameInput, note1.name)
    .expect(openNavToggle.hasClass('unsaved')).notOk()

  // Close note and ensure Open toggle is removed
    .click(closeButton)
    .expect(openNavToggle.count).eql(0)

  // Test expanding nav
    .click(mainNavToggle)
    .expect(mainNav.visible).ok();
});


test('404 Redirect', async t => {
  await t.navigateTo('/some-wrong-path');
  await t.expect(await currentPath()).eql(NOT_FOUND_PATH);
});
