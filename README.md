# Dancing☆Onigiri Chart Converter
[Dancing☆Onigiri (CW Edition)](../../../danoniplus/) の譜面/HTMLコンバーター

## How to Use
- [このページにアクセス](https://cwtickle.github.io/danoniplus-converter/index.html)し、
ParaFlaソースで使用していた譜面ファイル(dos.txtなど)、  
もしくはHTMLファイルをボックスに入れると  
外部読込用の譜面データやCW Edition用のHTMLファイルが自動で生成されます。

## About Converter (譜面データ)
1. 譜面データの"&amp;"区切りを"|"区切りに一斉置き換え
2. 譜面ヘッダーの古い記述を変換 (difStep, difName, speedlock => difData)
3. 個別/全体色変化の色番号変換 (ParaFla版 => CW Edition版)
4. キー数の自動変換 (DP => 9A, 9 => 9Bなど)

### 譜面ファイルの変換に関する留意点
- musicUrlは`nosound.mp3`として設定されます。後で変更が必要です。（重要）
- キー数を参照するため最低限「difStep」「difData」といったキー数情報を譜面ファイルに入れてください。  
色番号の変換処理で使用します。

## About Converter (HTMLデータ)
1. HTML5用の定義`<!DOCTYPE html>`に置き換え
2. headタグにmetaタグ、scriptタグ(javascriptファイル用)、linkタグ(cssファイル用)を挿入
3. headタグが無ければ、headタグ、titleタグを追加で補完
4. objectタグ、embedタグを検出し、CW Editionのdiv要素、input要素を挿入

### HTMLファイルの変換に関する留意点
- HTMLファイルかどうかはHTMLテキスト内に`<h`が含まれ、かつ後ろに`>`があるもの  
を対象とします。(`<html>`もしくは`<head>`タグがあることが前提)  
※それ以外は譜面データと扱います。
- 譜面データは`dos_js.txt`で作成する前提のページになっています。  
必要に応じて変更してください。

## Special Thanks
- すずめ( @suzme )
