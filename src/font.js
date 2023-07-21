/**
 * PRJ_0033_shift
 *
 * @copyright 2023 Kz class LLC All Rights Reserved.
 */

/**
 * 変更イベント
 *
 * @param {object} e - イベントオブジェクト
 */
function onChangeAction(e) {
  // 変更されたセルの範囲を取得する
  const range = e.range;

  // rangeがnullの場合は処理を終了する
  if (range === null) {
    return;
  }

  // シートが設定シートの場合は処理を終了する
  const sheetName = range.getSheet().getName();
  for (const excludedSheetName of SHEETNAMES_SETTING) {
    if (sheetName === excludedSheetName) {
      return;
    }
  }

  // 変更されたセルのフォントサイズを変更する
  changeFontSize(range);
}

/**
 * 変更されたセルのフォントサイズを変更する
 *
 * @param {object} range - 変更されたセルの範囲
 */
function changeFontSize(range) {
  const row = range.getRow();
  const col = range.getColumn();

  for (let i = 0; i < range.getNumRows(); i++) {
    // 行がコピー対象外の場合はスキップ
    if (row + i < systemSetting.rowStart) {
      continue;
    }
    if (row + i > systemSetting.rowEnd) {
      continue;
    }

    for (let j = 0; j < range.getNumColumns(); j++) {
      // 列がコピー対象外の場合はスキップ
      if (col + j < systemSetting.colStart) {
        continue;
      }
      if (col + j > systemSetting.colEnd) {
        continue;
      }

      const cell = range.getCell(i + 1, j + 1);

      // 文字列を取得する
      const value = cell.getValue();

      // 文字長が通常の長さを超えている場合はフォントサイズを変更する
      if (value.length > systemSetting.strLengthNormal) {
        cell.setFontSize(systemSetting.fontSizeSmall);
      } else {
        cell.setFontSize(systemSetting.fontSizeNormal);
      }
    }
  }
}
