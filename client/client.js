/**
 * Gmail Deletion Tool
 *
 * MIT License
 *
 * @copyright 2023 Kz class LLC All Rights Reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
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
    .addItem(MESSAGE_TABLE[lang].callDeleteMails, 'callDeleteMails')
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

  SpreadsheetApp.getUi().alert(MESSAGE_TABLE[lang].callDeleteMails.finishAlert);
}
