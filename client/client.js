/**
 * PRJ_00
 *
 * @copyright 2023 Kz class LLC All Rights Reserved.
 */

/**
 * オリジナルメニュー
 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('gmail削除メニュー')
    .addItem('自動処理登録', 'setTrigger1Day')
    .addItem('自動処理解除', 'deleteTrigger')
    .addSeparator()
    .addItem('手動実行', 'callDeleteMail')
    .addToUi();
}

/**
 * 1日トリガーを設定する
 * 毎日23時〜24時の間に実行する
 */
function setTrigger1Day() {
  // トリガーを削除する
  deleteTrigger();

  // トリガーを設定する
  // 毎日23時に実行する
  ScriptApp.newTrigger('callDeleteMail')
    .timeBased()
    .atHour(23)
    .everyDays(1)
    .create();
}

/**
 * トリガー解除
 */
function deleteTrigger() {
  const triggers = ScriptApp.getProjectTriggers();
  for (let i = 0; i < triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i]);
  }
}

/**
 * 削除処理呼び出し
 */
function callDeleteMail() {
  //   lib.deleteMail();
  deleteMail();
}
