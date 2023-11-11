/**
 * PRJ_0058_gmail
 *
 * @copyright 2023 Kz class LLC All Rights Reserved.
 */

/**
 * gmail削除処理
 * ラベルを元に対象のメールを削除する
 */
function deleteMails() {
  // ユーザーラベルの取得
  const labels = GmailApp.getUserLabels();

  logAndToast_('ラベル数：' + labels.length + '件');

  let count = 0; // 累計削除メール数

  // ラベル名の数だけ削除処理を行う
  for (const label of labels) {
    count = deleteMailByLabel_(label.getName(), count);

    // 削除上限に達した場合は処理を終了する
    if (count >= LIMIT_DELETE_MAIL) {
      break;
    }
  }

  logAndToast_('合計' + count + '件削除しました。');
}

/**
 * gmailで特定のラベルが付いたメールを取得し、削除する
 * ラベルがネストされている場合、親ラベルには反応せずに、子ラベルのみがこの関数の対象となる
 * 対象メールに複数ラベルが付いている場合は、条件が厳しい方で削除されることになる
 *
 * @param {string} labelName ラベル名。@の後ろに削除対象の日数があること。
 * @param {number} count 現在削除メール数
 * @return {number} 累計削除メール数
 */
function deleteMailByLabel_(labelName, count) {
  // 検索条件を作成
  const condition = makeSearchCondition_(labelName);

  // 検索条件がnullの場合は処理を終了する
  if (condition === null) {
    return count;
  }

  // 削除するメールは合計でLIMIT_DELETE_MAILに抑えることで時間切れを防ぐ
  const threads = GmailApp.search(condition, 0, LIMIT_DELETE_MAIL - count);

  logAndToast_(
    'ラベル名:' +
      labelName +
      '\n対象メール数:' +
      threads.length +
      '件を削除します。'
  );

  count += threads.length;

  // 検索で取得したスレッドを全て削除する
  GmailApp.moveThreadsToTrash(threads);

  return count;
}

/**
 * 検索条件を作成
 * ラベル名が検索条件を満たさない場合はnullを返す
 *
 * @param {string} labelName ラベル名。@の後ろに削除対象の日数があること。
 * @return {string|null} 検索条件 or null
 */
function makeSearchCondition_(labelName) {
  // @で分割する
  // @が複数ある場合は、最後の@で分割する
  const labelNameArray = labelName.split('@');

  // labelNameArrayのlengthが1の場合は@が無いため、処理を終了する
  if (labelNameArray.length === 1) {
    logAndToast_(
      '対象外ラベル: ' + labelName + '\n @が無いため、処理をしません。'
    );
    return null;
  }

  // 最後の要素に指定日数が入っている
  const days = labelNameArray[labelNameArray.length - 1];

  // daysが正の整数でない場合は処理を終了する
  if (!Number.isInteger(Number(days)) || Number(days) <= 0) {
    logAndToast_(
      '対象外ラベル: ' +
        labelName +
        '\n @以降が正の整数では無いので、処理をしません。'
    );
    return null;
  }

  // ここに到達する時点で、最後に@と正の整数があることが保証されている
  // 正味のラベル名を取得するために最後の@と正の整数を削除する
  labelNameArray.pop();
  const name = labelNameArray.join('@');

  // CATEGORY_TABLEには、カテゴリというラベルの下に、ソーシャル、新着、プロモーション、フォーラムというラベルがあり、@が付いていない
  // nameをキーとする値が存在しない場合は、今回のlabelNameはカテゴリではなく、ユーザーラベルであると判断できる
  const categoryLabelTable = CATEGORY_TABLE;
  if (!categoryLabelTable[name]) {
    categoryLabelTable[name] = 'label: ' + labelName;
  }

  const condition =
    categoryLabelTable[name] + ' older_than:' + days + 'd -is:starred ';

  console.log('search condition:' + condition);

  return condition;
}

/**
 * ログとトースト
 *
 * @param {string} str ログとトーストに出力する文字列
 */
function logAndToast_(str) {
  console.log(str);
  SpreadsheetApp.getActiveSpreadsheet().toast(str);
}
