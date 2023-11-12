# Gmail 削除ツール

[English is here](#gmail-deletion-tool)

Gmail で設定している特定のラベルに基づいて自動的にメールを削除することで、ユーザーが自分の受信トレイを管理するのを支援する Google Apps Script です。
Gmail のフィルターを利用してメールを削除する場合は、受信時に削除されるため、メールを確認する前に削除されてしまう可能性があります。
本スクリプトは、メールを削除するまでの日数を指定することで、一定期間経過後にメールを削除することができます。

## 特徴

- ユーザー定義のラベルに基づいてメールを削除します。
- ネストされたラベルをサポートします。
- 自動削除を設定した後、1 時間につき 100 件の対象メールが削除されます。
- スプレッドシートの言語設定に基づき、日本語と英語で動作します。サポート外の言語の場合は英語で動作します。

## 使い方

1. Gmail でラベルを定義します。ラベル名の後には '@' と、メールを削除するまでの日数を指定します。
   たとえば、'label@30' は、30 日後に 'label' のすべてのメールを削除します。

2. 下記のスプレッドシートを開き、自分の Google ドライブへコピーをします。

https://docs.google.com/spreadsheets/d/1dRjMZD7eZHcL8aIzlyBBVpI5HbYYpPOXdKDiRb62OPI/edit

または、スプレッドシートを開いた後、本スクリプトを Google スプレッドシートのスクリプトエディタにコピーします。
対象は下記の 3 つのファイルです。

- client/client.js
- src/main.js
- src/const.js

3. スプレッドシートを開き、メニューバーの 'Gmail 削除ツール' をクリックします。
   表示されたメニューから実施する項目を選択します。
   - 自動削除をセットする
   - 自動削除をストップする
   - 一回だけ削除する

## 制限事項

- スター付きのメールは削除されません。
- タイムアウトを防ぐため、削除するメールの総数には制限があります。
- ラベルがネストされている場合、スクリプトは子ラベルのみを対象とします。
- '@' がないラベルや '@' の後に正の整数以外があるラベルは処理されません。

## ライセンス ![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)

このプロジェクトは MIT ライセンスの下でライセンスされています。詳細については LICENSE ファイルを参照してください。

# Gmail Deletion Tool

This Google Apps Script is a Gmail deletion tool that helps users manage their inbox by automatically deleting emails based on specific labels.
If you use Gmail's filter to delete emails, they will be deleted when they arrive, so there is a possibility that they will be deleted before you check them.
This script allows you to delete emails after a certain period of time by specifying the number of days until the emails are deleted.

## Features

- Deletes emails based on user-defined labels.
- Supports nested labels.
- After you set automatic deletion, 100 target emails will be deleted every hour.
- Works in Japanese and English based on the language setting of the spreadsheet. If the language is not supported, it will work in English.

## How to Use

1. Define your labels in Gmail. The label name should be followed by '@' and the number of days after which emails should be deleted.
   For example, 'label@30' will delete all emails with 'label' after 30 days.

2. Copy the following spreadsheet to your Google Drive.
   https://docs.google.com/spreadsheets/d/1dRjMZD7eZHcL8aIzlyBBVpI5HbYYpPOXdKDiRb62OPI/edit

Or copy scripts to your Google Spreadsheet's script editor.
The targets are the following three files.

- client/client.js
- src/main.js
- src/const.js

3. Open Spreadsheet and click on 'Gmail Deletion Tool' in the menu bar.
   Select the item to be executed from the menu that appears.
   - Set automatic deletion
   - Stop automatic deletion
   - Delete only once

## Limitations

- Your star emails will not be deleted.
- The total number of emails to be deleted is limited to prevent timeout.
- The script only targets child labels if the label is nested.
- The script does not process labels without '@' or with a non-positive integer after '@'.

## License ![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)

This project is licensed under the MIT License. See the LICENSE file for details.
