/**
 * PRJ_0034_shift
 *
 * @copyright 2023 Kz class LLC All Rights Reserved.
 */

// シート名
const SHEETNAME_SYSTEM_SETTING = 'システム設定';

const systemSetting = common.createSetting(
  SpreadsheetApp.getActiveSpreadsheet().getSheetByName(
    SHEETNAME_SYSTEM_SETTING
  ),
  1
);
