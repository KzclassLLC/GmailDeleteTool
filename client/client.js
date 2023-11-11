/**
 * PRJ_0058_gmail
 *
 * @copyright 2023 Kz class LLC All Rights Reserved.
 */

/**
 * オリジナルメニュー
 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('gmail削除メニュー')
    .addItem('自動削除をセットする', 'setTrigger1Hour')
    .addItem('自動削除をストップする', 'callDeleteTrigger')
    .addSeparator()
    .addItem('1回だけ削除する', 'callDeleteMails')
    .addToUi();
}

/**
 * 1時間トリガーを設定する
 */
function setTrigger1Hour() {
  // トリガーを削除する
  deleteTrigger();

  // トリガーを設定する
  // 毎時間実行する
  ScriptApp.newTrigger('callDeleteMails').timeBased().everyHours(1).create();

  // トリガーを設定したことを通知する
  SpreadsheetApp.getUi().alert('自動削除をセットしました。');
}

/**
 * トリガー解除呼び出し
 */
function callDeleteTrigger() {
  deleteTrigger();

  // トリガーを解除したことを通知する
  SpreadsheetApp.getUi().alert('自動削除をストップしました。');
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
function callDeleteMails() {
  //   lib.deleteMails();
  deleteMails();

  // 削除処理を通知する
  SpreadsheetApp.getUi().alert('削除処理が完了しました。');
}
