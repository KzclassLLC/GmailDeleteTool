/**
 * Gmail Deletion Tool
 * @see https://github.com/KzclassLLC/GmailDeletionTool#gmail-deletion-tool
 *
 * MIT License
 * @copyright 2023 Kz class LLC
 */

// const
const LIMIT_DELETE_MAIL = 100; // Total number of deleted emails

// category table
// User needs to create labels under the category label, such as Social, Updates, Promotions, and Forums with @.
// This table key is the label name without @, and the value is the search condition.
// If you want to add other languages, please add them here.
const CATEGORY_TABLE = {
  'カテゴリ/ソーシャル': 'category:social',
  'カテゴリ/新着': 'category:updates',
  'カテゴリ/プロモーション': 'category:promotions',
  'カテゴリ/フォーラム': 'category:forums',
  'categories/Social': 'category:social',
  'categories/Updates': 'category:updates',
  'categories/Promotions': 'category:promotions',
  'categories/Forums': 'category:forums',
};

// User local language
let lang = SpreadsheetApp.getActiveSpreadsheet().getSpreadsheetLocale();

// message table
// If you want to add other languages, please add them here.
const MESSAGE_TABLE = {
  ja: {
    onOpen: {
      menu: 'Gmail削除ツール',
      setTrigger1Hour: '自動削除をセットする',
      callDeleteTrigger: '自動削除をストップする',
      callDeleteMails: '1回だけ削除する',
    },
    setTrigger1Hour: {
      finishAlert: '自動削除をセットしました。1時間ごとに実行されます。',
    },
    callDeleteTrigger: { finishAlert: '自動削除を停止しました。' },
    callDeleteMails: { finishAlert: '完了しました。' },
    deleteMails: {
      toast: '合計削除メール数: ',
    },
    deleteMailByLabel: {
      toast: '削除対象メール数: ',
    },
    checkLabelNameValidity: {
      noAt: 'ラベル名に@が含まれていません。',
      noInteger: 'ラベル名の@の後が正の整数ではありません。',
    },
  },
  en: {
    onOpen: {
      menu: 'Gmail delete tool',
      setTrigger1Hour: 'Set automatic deletion',
      callDeleteTrigger: 'Stop automatic deletion',
      callDeleteMails: 'Delete only once',
    },
    setTrigger1Hour: {
      finishAlert:
        'Automatic deletion has been set. It will be executed every hour.',
    },
    callDeleteTrigger: { finishAlert: 'Automatic deletion has been stopped.' },
    callDeleteMails: { finishAlert: 'Completed.' },
    deleteMails: {
      toast: 'Total number of deleted emails: ',
    },
    deleteMailByLabel: {
      toast: 'Number of emails to be deleted: ',
    },
    checkLabelNameValidity: {
      noAt: 'The label name does not contain @.',
      noInteger:
        'The number after @ in the label name is not a positive integer.',
    },
  },
};

// if user local language is not supported, set English
if (!MESSAGE_TABLE[lang]) {
  lang = 'en';
}
