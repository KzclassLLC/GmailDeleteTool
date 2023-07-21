/**
 * PRJ_0033_shift
 *
 * @copyright 2023 Kz class LLC All Rights Reserved.
 */

/**
 * オリジナルメニュー
 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('オリジナルメニュー')
    .addItem('シフト表反映', 'callCopyShiftSheets')
    .addToUi();
}

/**
 * シートコピー
 */
function callCopyShiftSheets() {
  // @ts-ignore
  lib.copyShiftSheets();
}

/**
 * 変更イベント
 *
 * @param {object} e - イベントオブジェクト
 */
function onChange(e) {
  lib.onChangeAction(e);
}
