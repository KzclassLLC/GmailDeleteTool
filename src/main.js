/**
 * PRJ_0058_gmail
 *
 * @copyright 2023 Kz class LLC All Rights Reserved.
 */

/**
 * gmail削除処理
 * システム設定のラベル名を取得し、削除処理を行う
 */
function deleteMail() {
  // // ラベル設定シートの取得
  // const sheet =
  //   SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEETNAME_LABEL);

  // // システム設定シートのラベル名を取得する
  // const labelNames = sheet
  //   .getRange(2, 1, sheet.getLastRow() - 1, 1)
  //   .getValues();

  // ユーザーラベルの取得
  const labels = GmailApp.getUserLabels();

  logAndToast('ラベル数：' + labels.length + '件');

  // ラベル名の数だけ削除処理を行う
  for (const label of labels) {
    deleteMailByLabel(label.getName());
  }

  logAndToast('gmail削除処理が完了しました。');
}

/**
 * gmailで特定のラベルが付いたメールを取得し、削除する
 *
 * @param {string} labelName ラベル名 _の後ろに削除対象の日数が付いていること
 */
function deleteMailByLabel(labelName) {
  // @と@で囲まれている中の数字のみを取得する
  // @が3つ以上ある場合は、最後の@と一つ前の@で囲まれている数字を取得する
  const labelNameArray = labelName.match(/@(\d+)@/g);

  if (labelNameArray === null) {
    logAndToast(
      '対象外ラベル: ' +
        labelName +
        '\n @と@の中に数字が入っているラベルのみ処理をします。'
    );
    return;
  }
  const days = labelNameArray[labelNameArray.length - 1].replace(/@/g, '');

  // // daysが正の整数でない場合は処理を終了する
  // if (!Number.isInteger(Number(days)) || Number(days) <= 0) {
  //   logAndToast(
  //     '対象外ラベル: ' +
  //       labelName +
  //       '\n @と@の中に数字が入っているラベルのみ処理をします。'
  //   );
  //   return;
  // }

  // スレッドの取得
  // 指定ラベル名、指定日数より前、スターが付いていないメールを取得する
  const threads = GmailApp.search(
    'label:' + labelName + ' older_than:' + days + 'd -is:starred'
  );

  logAndToast(
    'ラベル名：' +
      labelName +
      ' の ' +
      days +
      '日より前の受信メールを削除します。\n ' +
      '対象メール数：' +
      threads.length +
      '件'
  );

  // タイムアウトを防ぐために、一度に削除するスレッド数を制限する
  let num = LIMIT_DELETE_MAIL;
  if (threads.length < num) {
    num = threads.length;
  }

  for (let i = 0; i < num; i++) {
    threads[i].moveToTrash();
  }

  logAndToast('削除メール数：' + num + '件');
}

/**
 * ログとトースト
 *
 * @param {string} str ログとトーストに出力する文字列
 */
function logAndToast(str) {
  console.log(str);
  SpreadsheetApp.getActiveSpreadsheet().toast(str);
}
