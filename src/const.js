/**
 * Gmail delete tool
 *
 * MIT License
 *
 * @copyright 2023 Kz class LLC All Rights Reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
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
      setTrigger1Hour: '▶自動削除をセットする',
      callDeleteTrigger: '⏹自動削除をストップする',
      callDeleteMails: '1⃣1回だけ削除する',
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
      setTrigger1Hour: '▶Set automatic deletion',
      callDeleteTrigger: '⏹Stop automatic deletion',
      callDeleteMails: '1⃣Delete once',
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
