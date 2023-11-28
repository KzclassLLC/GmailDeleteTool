/**
 * Gmail Deletion Tool
 * @see https://github.com/KzclassLLC/GmailDeletionTool#gmail-deletion-tool
 *
 * MIT License
 * @copyright 2023 Kz class LLC
 */

/**
 * original menu
 */
function onOpen() {
  // set menu
  SpreadsheetApp.getUi()
    .createMenu(MESSAGE_TABLE[lang].onOpen.menu)
    .addItem(MESSAGE_TABLE[lang].onOpen.setTrigger1Hour, 'setTrigger1Hour')
    .addItem(MESSAGE_TABLE[lang].onOpen.callDeleteTrigger, 'callDeleteTrigger')
    .addSeparator()
    .addItem(MESSAGE_TABLE[lang].onOpen.callDeleteMails, 'callDeleteMails')
    .addToUi();
}

/**
 * set 1 hour trigger
 */
function setTrigger1Hour() {
  deleteTrigger();
  ScriptApp.newTrigger('callDeleteMails').timeBased().everyHours(1).create();
  SpreadsheetApp.getUi().alert(MESSAGE_TABLE[lang].setTrigger1Hour.finishAlert);
}

/**
 * call delete trigger
 */
function callDeleteTrigger() {
  deleteTrigger();
  SpreadsheetApp.getUi().alert(
    MESSAGE_TABLE[lang].callDeleteTrigger.finishAlert
  );
}

/**
 * delete trigger
 */
function deleteTrigger() {
  const triggers = ScriptApp.getProjectTriggers();
  for (let i = 0; i < triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i]);
  }
}

/**
 * Gmail deletion process
 */
function callDeleteMails() {
  deleteMails();
}
