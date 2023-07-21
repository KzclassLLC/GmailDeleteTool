/**
 * PRJ_0033_shift
 *
 * @copyright 2023 Kz class LLC All Rights Reserved.
 */

// シート名
const SHEETNAME_SYSTEM_SETTING = 'システム設定';
const SHEETNAME_STAFF_SETTING = 'スタッフ設定';
const SHEETNAME_CLIENT_SETTING = '取引先設定';
const SHEETNAME_TMP = 'シート1';

// 設定用シート名の配列
const SHEETNAMES_SETTING = [
  SHEETNAME_SYSTEM_SETTING,
  SHEETNAME_STAFF_SETTING,
  SHEETNAME_CLIENT_SETTING,
  SHEETNAME_TMP,
];

const systemSetting = common.createSetting(
  SpreadsheetApp.getActiveSpreadsheet().getSheetByName(
    SHEETNAME_SYSTEM_SETTING
  ),
  1
);
