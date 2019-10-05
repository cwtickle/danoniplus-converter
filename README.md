# Dancing☆Onigiri ChartConverter
[Dancing☆Onigiri (CW Edition)](../../../danoniplus/) の譜面コンバーター

## How to Use
- [このページにアクセス](https://cwtickle.github.io/danoniplus-converter/index.html)し、譜面ファイル(dos.txtなど)をボックスに入れると  
外部読込用の譜面データが自動で生成されます。
- musicUrlは追加されないので、個別に追加してください。（重要）
- キー数を参照するため最低限「difStep」「difData」といったキー数情報を譜面ファイルに入れてください。  
色番号の変換処理で使用します。

## About Converter
1. 譜面データの"&amp;"区切りを"|"区切りに一斉置き換え
2. 譜面ヘッダーの古い記述を変換 (difStep, difName, speedlock => difData)
3. 個別/全体色変化の色番号変換 (ParaFla版 => CW Edition版)
4. キー数の自動変換 (DP => 9A, 9 => 9Bなど)

## Special Thanks
- すずめ( @suzme )
