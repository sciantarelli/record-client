import { Selector } from 'testcafe';
import { reseed, currentPath, user } from './support/helpers';
import { NOTES_PATH, NEW_NOTE_PATH, NEW_NOTE_NAME } from '../../constants';
import config from './support/config';

const buttons = Selector('button');
// TODO: Refactor button names into constants, including 'Create Note' below. And, make all these reusable, including name and content inputs
const saveButton = buttons.withExactText('Save');
const closeButton = buttons.withExactText('Close');
const deleteButton = buttons.withExactText('Delete');
const errorMessages = Selector('.error-messages');
const notesList = Selector('#notes-list');
const firstNoteLink = notesList.find('a').nth(0);
const nameInput = Selector('form input[name=name]');
const contentInput = Selector('form textarea[name=content]');

fixture('Notes')
  .before(reseed())
  .beforeEach(async t => {
    await t.useRole(user)
  })
  .page(config.app_url + NOTES_PATH);
  // .disablePageReloads; TODO: Periodically check the status of this: https://github.com/DevExpress/testcafe/issues/1770 . Ideally, the tests below would be smaller and more focused, not testing as much in each particular test


test('Create Note', async t => {
  const createButton =
      buttons.withExactText('Create Note');

  // Start creating a note, validate path, and ensure it's invalid when values are blank
  await t.click(createButton);
  await t
    .expect(await currentPath()).eql(NEW_NOTE_PATH)
    .expect(nameInput.value).eql(NEW_NOTE_NAME)
    .selectText(nameInput)
    .pressKey('delete')
    .click(saveButton)
    .expect(errorMessages.child().count).eql(2)

  // Fix note, validate it, save and close
    .typeText(nameInput, 'Note 1', { replace: true })
    .typeText(contentInput, 'Content for Note 1')
    .click(saveButton)
    .expect(errorMessages.child().count).eql(0)
    .click(closeButton);

  // Validate path and note count in list
  await t
    .expect(await currentPath()).eql(NOTES_PATH)
    .expect(notesList.child().count).eql(1)

  // Create another valid note and validate path
    .click(createButton);
  await t
    .expect(await currentPath()).eql(NEW_NOTE_PATH)
    .expect(nameInput.value).eql(NEW_NOTE_NAME)
    .typeText(nameInput, 'Note 2', { replace: true })
    .typeText(contentInput, 'Content for Note 2')
    .click(saveButton)
    .click(closeButton);

  // Validate path and note count in list
  await t
    .expect(await currentPath()).eql(NOTES_PATH)
    .expect(notesList.child().count).eql(2);
});


test('Update Note', async t => {
  // Open the first note and validate path
  await t.click(firstNoteLink);
  await t
    .expect(await currentPath()).eql(`${NOTES_PATH}/2`)

  // Make note invalid and validate
    .selectText(nameInput)
    .pressKey('delete')
    .click(saveButton)
    .expect(errorMessages.child().count).eql(1)

  // Fix note and validate
    .typeText(nameInput, 'Note 1 Updated')
    .click(saveButton)
    .expect(errorMessages.child().count).eql(0)

  // Close note, validate path and note count in list
    .click(closeButton);
  await t
    .expect(await currentPath()).eql(NOTES_PATH)
    .expect(notesList.child().count).eql(2);

  // TODO: Should validate the names of each note are correct in the notes list, but what if sorting is implemented? The order could change.
});


test('Delete Note', async t => {
  // Open the first note and validate path
  await t.click(firstNoteLink);
  await t
    .expect(await currentPath()).eql(`${NOTES_PATH}/2`)

  // Delete the note, and validate note count in list
    .click(deleteButton);
  await t
    .expect(await currentPath()).eql(NOTES_PATH)
    .expect(notesList.child().count).eql(1);
});




