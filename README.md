# Gmail 削除ツール

[English is here](#gmail-deletion-tool)

Gmail で設定している特定のラベルに基づいて自動的にメールを削除することで、ユーザーが自分の受信トレイを管理するのを支援する Google Apps Script です。  
Gmail のフィルターを利用してメールを削除する場合は、受信時に削除されるため、メールを確認する前に削除されてしまう可能性があります。  
本スクリプトは、メールを削除するまでの日数を指定することで、一定期間経過後にメールを削除することができます。

## 特徴

- ユーザー定義のラベルに基づいてメールを削除します。
- ネストされたラベルをサポートします。
- スター付きのメールは削除されません。
- 自動削除を設定した後、1 時間につき 100 件の対象メールが削除されます。
- スプレッドシートの言語設定に基づき、日本語と英語で動作します。サポート外の言語の場合は英語で動作します。

## 使い方

1. Gmail でラベルを定義します。ラベル名の後には '@' と、メールを削除するまでの日数を指定します。  
   例えば、'general@365'のラベルがつけられたメールは、受信後 365 日以上経過した場合に削除されます。
   ![image](https://github.com/KzclassLLC/GmailDeletionTool/assets/110751257/a35f2226-b2a7-4f1d-9728-ae8a87065686)

   カテゴリに分類されているメールについては、下記のように、カテゴリというラベルにネストしたラベルを用意します。
   カテゴリ/プロモーション@30
   ![image](https://github.com/KzclassLLC/GmailDeletionTool/assets/110751257/b91de45c-4133-4110-87d2-b0ee06f319b9)

2. 下記のスプレッドシートを開き、自分の Google ドライブへコピーをします。
   [https://docs.google.com/spreadsheets/d/1dRjMZD7eZHcL8aIzlyBBVpI5HbYYpPOXdKDiRb62OPI/edit](https://docs.google.com/spreadsheets/d/1dRjMZD7eZHcL8aIzlyBBVpI5HbYYpPOXdKDiRb62OPI/edit)  
   スプレッドシートをコピー後は、スプレッドシートのメニュー＞設定を開き、言語と地域が日本以外の場合は日本に設定してください。

   または、スプレッドシートを開いた後、本スクリプトを Google スプレッドシートのスクリプトエディタにコピーします。  
   対象は下記の 3 つのファイルです。

   - src/client.js
   - src/main.js
   - src/const.js

3. スプレッドシートを開き、メニューバーの一番右にある 'Gmail 削除ツール' をクリックします。
   ![image](https://github.com/KzclassLLC/GmailDeletionTool/assets/110751257/851d7c6e-af52-4a0d-a83c-6f448d6e085f)

   下記のメニューが表示されます。

   - 自動削除をセットする
   - 自動削除をストップする
   - 一回だけ削除する

   最初に「一回だけ削除する」を実行し、動作を確認してください。
   なお、初めて実行する際は、アクセス許可を求められますので、下記ページを参考に、許可をしてください。
   [https://note.com/kzautomation/n/n4875ba0ed9aa](https://note.com/kzautomation/n/n4875ba0ed9aa)
   認証を行った後、再度「一回だけ削除する」を実行してください。終了のダイアログが表示されれば、正常に動作しています。
   その後に「自動削除をセットする」を実行すると、自動削除が開始されます。

## 制限事項

- タイムアウトを防ぐため、1 回の実行で最大 100 通削除します。
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
- Your star emails will not be deleted.
- After you set automatic deletion, 100 target emails will be deleted every hour.
- Works in Japanese and English based on the language setting of the spreadsheet. If the language is not supported, it will work in English.

## How to Use

1. Define your labels in Gmail. The label name should be followed by '@' and the number of days after which emails should be deleted.
   For example, emails with the label 'general@365' will be deleted after 365 days.  
   ![image](https://github.com/KzclassLLC/GmailDeletionTool/assets/110751257/a35f2226-b2a7-4f1d-9728-ae8a87065686)

   For emails that are categorized, prepare a label nested in the label called 'categories' as follows.
   ![image](https://github.com/KzclassLLC/GmailDeletionTool/assets/110751257/a7da4b5f-dd85-4b0e-a2e6-e49eaedb2fb8)

2. Copy the following spreadsheet to your Google Drive.
   [https://docs.google.com/spreadsheets/d/1dRjMZD7eZHcL8aIzlyBBVpI5HbYYpPOXdKDiRb62OPI/edit](https://docs.google.com/spreadsheets/d/1dRjMZD7eZHcL8aIzlyBBVpI5HbYYpPOXdKDiRb62OPI/edit)  
   After you copied spreadsheet, please check the locale setting(menu->settings) of the spreadsheet  
   Or copy scripts to your Google Spreadsheet's script editor.
   The targets are the following three files.

   - src/client.js
   - src/main.js
   - src/const.js

3. Open Spreadsheet and click on 'Gmail Deletion Tool' in right side of the menu bar.
   ![image](https://github.com/KzclassLLC/GmailDeletionTool/assets/110751257/24fee3aa-6195-48aa-8c03-f2139e9c8501)

   The following menu will be displayed.

   - Set automatic deletion
   - Stop automatic deletion
   - Delete only once

   Please run 'Delete only once' first to check the operation.
   When you run it for the first time, you will be asked for permission. Please add the permission.
   After authentication, run 'Delete only once' again. If the end dialog is displayed, it is working properly.
   After that, run 'Set automatic deletion' to start automatic deletion.

## Limitations

- The total number of emails to be deleted is limited to 100 per execution to prevent timeouts.
- The script only targets child labels if the label is nested.
- The script does not process labels without '@' or with a non-positive integer after '@'.

## License ![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)

This project is licensed under the MIT License. See the LICENSE file for details.
