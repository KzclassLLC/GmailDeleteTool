/**
 * PRJ_0058_gmail
 *
 * @copyright 2023 Kz class LLC All Rights Reserved.
 */

// 定数
const LIMIT_DELETE_MAIL = 100; // 一度の処理で削除するメールの上限

// カテゴリ変換テーブル
// カテゴリというラベルの下に、ソーシャル、新着、プロモーション、フォーラムというラベルを作成する必要あり
const CATEGORY_TABLE = {
  'カテゴリ/ソーシャル': 'category:social',
  'カテゴリ/新着': 'category:updates',
  'カテゴリ/プロモーション': 'category:promotions',
  'カテゴリ/フォーラム': 'category:forums',
};
