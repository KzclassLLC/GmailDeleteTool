/**
 * PRJ_0033_shift
 *
 * @copyright 2023 Kz class LLC All Rights Reserved.
 */

/**
 * シートをシフト表ファイルへコピー
 */
function copyShiftSheets() {
  // フォルダ
  const folder = DriveApp.getFolderById(systemSetting.shiftFolderId);

  // ファイル名を取得
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const fileName = ss.getName();

  // ファイル名には先頭に【2023】のように年度が入っているので、中の数字だけをを取得する
  const year = fileName.match(/\d+/)[0];

  console.log('year: ' + year);

  // ファイル名を作成する
  const targetFileName = systemSetting.prefix + year + systemSetting.suffix;

  // ファイルを取得する
  const targetFile = getTargetFile(folder, targetFileName);

  // シートを転記する
  copySheetByName(ss, targetFile, year.toString());
}

/**
 * 参照元ファイルの内、指定した名称がついているシートを転記先ファイルへコピーする
 *
 * @param {object} srcSS - 参照元ファイル
 * @param {object} dstSS - 転記先ファイル
 * @param {string} name - シート名
 */
function copySheetByName(srcSS, dstSS, name) {
  SpreadsheetApp.flush();
  // コピー先のシートをすべて取得する
  const dstSheets = dstSS.getSheets();

  copySettingSheet(srcSS, dstSS);

  // dstSSにSHEETNAME_TMPが含まれていれば削除する
  deleteSheetByName(dstSS, SHEETNAME_TMP);

  // スタッフ設定のシートを表示する
  const staffSettingSheet = dstSS.getSheetByName(SHEETNAME_STAFF_SETTING);
  staffSettingSheet.showSheet();

  SpreadsheetApp.flush();

  // 古いシフト表を削除する
  deleteSheetByName(dstSS, name);

  // コピー元のシートをすべて取得する
  const srcSheets = srcSS.getSheets();

  // srcSheetsのシート名にnameが含まれているシートをdstSSへコピーする
  for (const srcSheet of srcSheets) {
    if (srcSheet.getName().indexOf(name) !== -1) {
      console.log('copyTo: ' + srcSheet.getName());
      copyOnlyShiftData(srcSheet, srcSS, dstSS);
      SpreadsheetApp.getActiveSpreadsheet().toast(
        srcSheet.getName() + 'をコピーしました。'
      );
    }
  }

  // スタッフ設定のシートを非表示にする
  staffSettingSheet.hideSheet();

  SpreadsheetApp.flush();
}

/**
 * 指定したシートの情報のうち、特定領域だけをコピーする
 *
 * @param {object} srcSheet - コピー元シート
 * @param {object} srcSS - 参照元ファイル
 * @param {object} dstSS - 転記先ファイル
 */
function copyOnlyShiftData(srcSheet, srcSS, dstSS) {
  const sheetName = srcSheet.getName();

  // srcSheetをコピーしてtmpSheetを作成する
  const tmpSheet = srcSheet.copyTo(srcSS);

  SpreadsheetApp.flush();

  // tmpSheetからlastRow, lastColより右下のセルを削除する
  tmpSheet.deleteRows(
    systemSetting.lastRow + 1,
    tmpSheet.getMaxRows() - systemSetting.lastRow
  );
  tmpSheet.deleteColumns(
    systemSetting.lastCol + 1,
    tmpSheet.getMaxColumns() - systemSetting.lastCol
  );

  // tmpSheetから、先頭行までのセルを削除する
  if (systemSetting.startRow > 1) {
    tmpSheet.deleteRows(1, systemSetting.startRow - 1);
  }

  // tmpSheetから、先頭列までのセルを削除する
  if (systemSetting.startCol > 1) {
    tmpSheet.deleteColumns(1, systemSetting.startCol - 1);
  }

  // tmpSheetをdstSSへコピーする
  const dstSheet = tmpSheet.copyTo(dstSS);

  // dstSheetのシート名をsheetNameに変更する
  dstSheet.setName(sheetName);

  // tmpSheetを削除する
  srcSS.deleteSheet(tmpSheet);

  SpreadsheetApp.flush();
}

/**
 * 指定したファイル内に、指定した名称が含まれるシートがあるかを確認し、あれば削除する
 *
 * @param {object} ss - Spreadsheetオブジェクト
 * @param {string} name - シート名
 */
function deleteSheetByName(ss, name) {
  // 対象ファイルのシートをすべて取得する
  const sheets = ss.getSheets();

  // dstSheetsのシート名にnameが含まれているか確認し、含まれている場合は削除する
  for (const sheet of sheets) {
    if (sheet.getName().indexOf(name) !== -1) {
      console.log('deleteSheet: ' + sheet.getName());
      SpreadsheetApp.getActiveSpreadsheet().toast(
        sheet.getName() + 'を削除しました。'
      );
      ss.deleteSheet(sheet);
    }
  }

  SpreadsheetApp.flush();
}

/**
 * 設定シートのコピー
 *
 * @param {object} srcSS - 参照元ファイル
 * @param {object} dstSS - 転記先ファイル
 */
function copySettingSheet(srcSS, dstSS) {
  const srcSheet = srcSS.getSheetByName(SHEETNAME_STAFF_SETTING);
  let dstSheet = dstSS.getSheetByName(SHEETNAME_STAFF_SETTING);

  // dstSheetが存在しない場合は、作成する
  if (dstSheet === null) {
    dstSheet = dstSS.insertSheet(SHEETNAME_STAFF_SETTING);
  }

  // srcSheetのデータをdstSheetへコピーする
  const lastRow = srcSheet.getLastRow();
  const lastCol = srcSheet.getLastColumn();
  const values = srcSheet.getRange(1, 1, lastRow, lastCol).getValues();
  dstSheet.getRange(1, 1, values.length, values[0].length).setValues(values);

  SpreadsheetApp.flush();
}

// /**
//  * 指定した名前のシートがあるかチェックし、なければ作成する
//  *
//  * @param {object} ss - Spreadsheetオブジェクト
//  * @param {string} name - シート名
//  * @return {boolean} isExist - シートが存在するか
//  */
// function checkSheet(ss, name) {
//   const sheets = ss.getSheets();

//   let isExist = false;

//   for (const sheet of sheets) {
//     // nameが含まれている場合は、trueを返す
//     if (sheet.getName().indexOf(name) !== -1) {
//       isExist = true;
//     }
//   }

//   return isExist;
// }

/**
 * 指定フォルダ内の対象ファイルを取得する
 * ファイルが存在しない場合は、新規作成する
 *
 * @param {object} folder - フォルダオブジェクト
 * @param {string} fileName - ファイル名
 * @return {object} ss - Spreadsheetオブジェクト
 */
function getTargetFile(folder, fileName) {
  // folder内に、fileNameのファイルが存在するか確認する
  const files = folder.getFilesByName(fileName);

  let ss = {};

  if (files.hasNext()) {
    // 存在する場合は、ファイルを取得する
    const file = files.next();
    ss = SpreadsheetApp.openById(file.getId());
  } else {
    // 存在しない場合は、スプレッドシートを新規作成する
    const file = DriveApp.createFile(fileName, '', MimeType.GOOGLE_SHEETS);

    // ファイルをフォルダに移動する
    folder.addFile(file);

    // ファイル名を変更する
    file.setName(fileName);

    ss = SpreadsheetApp.openById(file.getId());
  }
  return ss;
}
