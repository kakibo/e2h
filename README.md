node.jsで、ExcelからHTMLを生成するサンプル。
次のことを行います。
1.nodeのライブラリxlsxを使いExcelデータを読み込み。
2.読み込んだExcelデータの加工（テキストの置換やデータの並べ替え）。
3.テンプレートエンジンEJSでHTMLに変換。

■インストール
本プログラムをダウンロードしたら、
cmd.batを開き「npm install」コマンドを実行。
必要なnodeライブラリがダウンロードされます。

■実行
start.batを開いてください。
excel2html.jsが実行され、source.xlsxの内容からHTMLが生成されます。
生成結果はoutputフォルダに保存されます。
※HTMLが参照する画像やCSSは含まれていません。
