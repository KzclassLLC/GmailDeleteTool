/**
 * LGT_
 * @fileoverview このファイルは、クライアント側のスクリプトです。
 *
 * @copyright 2023 Kz class LLC all rights reserved
 */

// このファイルは流用元からコピーしてきただけですので、適宜変更してください。
// クライアント様が使用するスプレッドシートには、このファイルのみをコピーします。
// このファイルでしか実行できないもの以外は、全てライブラリ側に実装します。
// クライアント側からは、lib.関数名() で呼び出します。

/**
 * オリジナルメニュー
 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('オリジナルメニュー')
    .addItem('自動更新セット', 'setTrigger')
    .addItem('手動更新', 'callUpdateReservations')
    .addItem('新スタッフ登録', 'callNewCalender')
    .addToUi();
}

/**
 * 更新トリガセット
 */
function setTrigger() {
  // 5分タイマーをセットする
  common.setTimerTrigger('callUpdateReservations0', 5);
  common.setTimerTrigger('callUpdateReservations1', 5);
  common.setTimerTrigger('callUpdateReservations2', 5);
  common.setTimerTrigger('callUpdateReservations3', 5);
  common.setTimerTrigger('callUpdateReservations4', 5);
  common.setTimerTrigger('callDeletePreviousReservation', 5);
}

/**
 * カレンダー更新呼び出し
 */
function callUpdateReservations0() {
  // @ts-ignore
  lib.updateReservations(0);
}

/**
 * カレンダー更新呼び出し
 */
function callUpdateReservations1() {
  // @ts-ignore
  lib.updateReservations(1);
}

/**
 * カレンダー更新呼び出し
 */
function callUpdateReservations2() {
  // @ts-ignore
  lib.updateReservations(2);
}

/**
 * カレンダー更新呼び出し
 */
function callUpdateReservations3() {
  // @ts-ignore
  lib.updateReservations(3);
}

/**
 * カレンダー更新呼び出し
 */
function callUpdateReservations4() {
  // @ts-ignore
  lib.updateReservations(4);
}

/**
 * カレンダー更新呼び出し
 */
function callUpdateReservations0() {
  // @ts-ignore
  lib.updateReservations(0);
}

/**
 * 過去カレンダー削除呼び出し
 */
function callDeletePreviousReservation() {
  // @ts-ignore
  lib.deletePreviousReservation();
}

/**
 * 新スタッフカレンダー呼び出し
 */
function callNewCalender() {
  // @ts-ignore
  lib.newCalender();
}
