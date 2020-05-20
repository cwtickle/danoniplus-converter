`use strict`;
/**
 * Dancing☆Onigiri (CW Edition) 
 * ChartConverter
 *
 * Source by tickle
 * Created : 2018/10/05
 * Revised : 2020/05/20
 *
 * https://github.com/cwtickle/danoniplus-converter
 */
const g_version = `Ver 2.0.0`;

let g_rawData = ``;
const g_keyObj = {
    // キー置換用(ParaFla版との互換)
    keyTransPattern: {
        '9': '9A',
        'DP': '9A',
        '9A-1': '9A',
        '9A-2': '9A',
        '9B-1': '9B',
        '9B-2': '9B',
        'TP': '13',
        '15': '15A',
        '15R': '15B',
    }
};

let g_colorFlg = `current`;
let g_encodeFlg = `shift-jis`;
g_keyObj.cCom = [];
g_keyObj.cComOld = [];
g_keyObj.c5 = [];
g_keyObj.c7 = [];
g_keyObj.c7i = [];
g_keyObj.c8 = [];
g_keyObj.c9A = [];
g_keyObj.c9B = [];
g_keyObj.c11 = [];
g_keyObj.c11L = [];
g_keyObj.c12 = [];
g_keyObj.c13 = [];
g_keyObj.c14 = [];
g_keyObj.c14i = [];
g_keyObj.c15A = [];
g_keyObj.c15B = [];
g_keyObj.c16i = [];
g_keyObj.c17 = [];
for (let j = 0; j < 62; j++) {
    g_keyObj.c5[j] = j;
    g_keyObj.c7[j] = j;
    g_keyObj.c7i[j] = j;
    g_keyObj.c8[j] = j;
    g_keyObj.c9A[j] = j;
    g_keyObj.c9B[j] = j;
    g_keyObj.c11[j] = j;
    g_keyObj.c11L[j] = j;
    g_keyObj.c12[j] = j;
    g_keyObj.c13[j] = j;
    g_keyObj.c14[j] = j;
    g_keyObj.c14i[j] = j;
    g_keyObj.c15A[j] = j;
    g_keyObj.c15B[j] = j;
    g_keyObj.c16i[j] = j;
    g_keyObj.c17[j] = j;
    g_keyObj.cCom[j] = j;
    g_keyObj.cComOld[j] = j;
}

g_keyObj.cCom[21] = 22;
g_keyObj.cCom[22] = 23;
g_keyObj.cCom[23] = 24;
g_keyObj.cCom[34] = 36;
g_keyObj.cCom[35] = 37;
g_keyObj.cCom[36] = 34;
g_keyObj.cCom[37] = 35;
g_keyObj.cCom[44] = 46;
g_keyObj.cCom[45] = 47;
g_keyObj.cCom[46] = 52;
g_keyObj.cCom[47] = 45;
g_keyObj.cCom[52] = 53;
g_keyObj.cCom[53] = 52;
g_keyObj.cCom[57] = 58;
g_keyObj.cCom[58] = 57;

g_keyObj.cComOld[11] = 60;
g_keyObj.cComOld[12] = 61;
g_keyObj.cComOld[13] = 20;
g_keyObj.cComOld[14] = 21;
g_keyObj.cComOld[15] = 23;

// [0, 2, 4, 6, 3] => [0, 1, 2, 3, 4]
g_keyObj.c5[0] = 0;
g_keyObj.c5[2] = 1;
g_keyObj.c5[4] = 2;
g_keyObj.c5[6] = 3;
g_keyObj.c5[3] = 4;

// [0, 2, 4, 6, 3, 7, 8, 9, 10] => [0, 1, 2, 3, 4, 5, 6, 7, 8]
g_keyObj.c9A[0] = 0;
g_keyObj.c9A[2] = 1;
g_keyObj.c9A[4] = 2;
g_keyObj.c9A[6] = 3;
g_keyObj.c9A[3] = 4;
g_keyObj.c9A[7] = 5;
g_keyObj.c9A[8] = 6;
g_keyObj.c9A[9] = 7;
g_keyObj.c9A[10] = 8;

// [0, 2, 4, 6, 3, 7, 8, 9, 10] => [0, 1, 2, 3, 4, 5, 6, 7, 8]
g_keyObj.c9B[0] = 0;
g_keyObj.c9B[2] = 1;
g_keyObj.c9B[4] = 2;
g_keyObj.c9B[6] = 3;
g_keyObj.c9B[3] = 4;
g_keyObj.c9B[7] = 5;
g_keyObj.c9B[8] = 6;
g_keyObj.c9B[9] = 7;
g_keyObj.c9B[10] = 8;

// [7, 8, 9, 10, 0, 1, 2, 3, 4, 5, 6] => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
g_keyObj.c11[7] = 0;
g_keyObj.c11[8] = 1;
g_keyObj.c11[9] = 2;
g_keyObj.c11[10] = 3;
g_keyObj.c11[0] = 4;
g_keyObj.c11[1] = 5;
g_keyObj.c11[2] = 6;
g_keyObj.c11[3] = 7;
g_keyObj.c11[4] = 8;
g_keyObj.c11[5] = 9;
g_keyObj.c11[6] = 10;

// [7, 8, 9, 10, 0, 1, 2, 3, 4, 5, 6] => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
g_keyObj.c11L[7] = 0;
g_keyObj.c11L[8] = 1;
g_keyObj.c11L[9] = 2;
g_keyObj.c11L[10] = 3;
g_keyObj.c11L[0] = 4;
g_keyObj.c11L[1] = 5;
g_keyObj.c11L[2] = 6;
g_keyObj.c11L[3] = 7;
g_keyObj.c11L[4] = 8;
g_keyObj.c11L[5] = 9;
g_keyObj.c11L[6] = 10;

// [8, 9, 10, 11, 0, 1, 2, 3, 4, 5, 6] => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
g_keyObj.c12[8] = 0;
g_keyObj.c12[9] = 1;
g_keyObj.c12[10] = 2;
g_keyObj.c12[11] = 3;
g_keyObj.c12[0] = 4;
g_keyObj.c12[1] = 5;
g_keyObj.c12[2] = 6;
g_keyObj.c12[3] = 7;
g_keyObj.c12[4] = 8;
g_keyObj.c12[5] = 9;
g_keyObj.c12[6] = 10;
g_keyObj.c12[7] = 11;

// [11, 12, 13, 14, 0, 2, 4, 6, 3, 7, 8, 9, 10] => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
g_keyObj.c13[11] = 0;
g_keyObj.c13[12] = 1;
g_keyObj.c13[13] = 2;
g_keyObj.c13[14] = 3;
g_keyObj.c13[0] = 4;
g_keyObj.c13[2] = 5;
g_keyObj.c13[4] = 6;
g_keyObj.c13[6] = 7;
g_keyObj.c13[3] = 8;
g_keyObj.c13[7] = 9;
g_keyObj.c13[8] = 10;
g_keyObj.c13[9] = 11;
g_keyObj.c13[10] = 12;

g_keyObj.c14[7] = 0;
g_keyObj.c14[8] = 1;
g_keyObj.c14[9] = 2;
g_keyObj.c14[10] = 3;
g_keyObj.c14[11] = 4;
g_keyObj.c14[12] = 5;
g_keyObj.c14[13] = 6;
g_keyObj.c14[0] = 7;
g_keyObj.c14[1] = 8;
g_keyObj.c14[2] = 9;
g_keyObj.c14[3] = 10;
g_keyObj.c14[4] = 11;
g_keyObj.c14[5] = 12;
g_keyObj.c14[6] = 13;

g_keyObj.c14i[7] = 0;
g_keyObj.c14i[8] = 1;
g_keyObj.c14i[9] = 2;
g_keyObj.c14i[10] = 3;
g_keyObj.c14i[11] = 4;
g_keyObj.c14i[12] = 5;
g_keyObj.c14i[13] = 6;
g_keyObj.c14i[0] = 7;
g_keyObj.c14i[1] = 8;
g_keyObj.c14i[2] = 9;
g_keyObj.c14i[3] = 10;
g_keyObj.c14i[4] = 11;
g_keyObj.c14i[5] = 12;
g_keyObj.c14i[6] = 13;

// [7, 8, 9, 10, 11, 12, 13, 14, 0, 1, 2, 3, 4, 5, 6] => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
g_keyObj.c15A[7] = 0;
g_keyObj.c15A[8] = 1;
g_keyObj.c15A[9] = 2;
g_keyObj.c15A[10] = 3;
g_keyObj.c15A[11] = 4;
g_keyObj.c15A[12] = 5;
g_keyObj.c15A[13] = 6;
g_keyObj.c15A[14] = 7;
g_keyObj.c15A[0] = 8;
g_keyObj.c15A[1] = 9;
g_keyObj.c15A[2] = 10;
g_keyObj.c15A[3] = 11;
g_keyObj.c15A[4] = 12;
g_keyObj.c15A[5] = 13;
g_keyObj.c15A[6] = 14;

g_keyObj.c15B[7] = 0;
g_keyObj.c15B[8] = 1;
g_keyObj.c15B[9] = 2;
g_keyObj.c15B[10] = 3;
g_keyObj.c15B[11] = 4;
g_keyObj.c15B[12] = 5;
g_keyObj.c15B[13] = 6;
g_keyObj.c15B[14] = 7;
g_keyObj.c15B[0] = 8;
g_keyObj.c15B[1] = 9;
g_keyObj.c15B[2] = 10;
g_keyObj.c15B[3] = 11;
g_keyObj.c15B[4] = 12;
g_keyObj.c15B[5] = 13;
g_keyObj.c15B[6] = 14;

g_keyObj.c16i[9] = 0;
g_keyObj.c16i[10] = 1;
g_keyObj.c16i[11] = 2;
g_keyObj.c16i[12] = 3;
g_keyObj.c16i[13] = 4;
g_keyObj.c16i[14] = 5;
g_keyObj.c16i[15] = 6;
g_keyObj.c16i[0] = 7;
g_keyObj.c16i[1] = 8;
g_keyObj.c16i[2] = 9;
g_keyObj.c16i[3] = 10;
g_keyObj.c16i[4] = 11;
g_keyObj.c16i[5] = 12;
g_keyObj.c16i[6] = 13;
g_keyObj.c16i[7] = 14;
g_keyObj.c16i[8] = 15;

// 初期化・イベントの設定
const main = () => {
    const droparea = document.getElementById('droparea');

    droparea.textContent = '譜面ファイル/HTMLファイルをドロップ';
    document.getElementById('version').textContent = g_version;

    droparea.addEventListener('dragover', event => {
        event.preventDefault();
        droparea.classList.remove('dragleave');
        droparea.classList.add('dragover');
    });

    droparea.addEventListener('dragleave', event => {
        event.preventDefault();
        droparea.classList.remove('dragover');
        droparea.classList.add('dragleave');
    });

    droparea.addEventListener('drop', event => {
        event.preventDefault();
        droparea.classList.remove('dragover');
        droparea.classList.add('dragleave');
        Array.prototype.forEach.call(event.dataTransfer.files, convert);
    });
}

// タグ検索
const findPos = (_dos, _start, _end) => {
    const searchIndex = _dos.toLowerCase().indexOf(_start);
    if (searchIndex !== -1) {
        const searchText = _dos.toLowerCase().slice(searchIndex);
        const searchLastIndex = searchText.indexOf(_end);
        if (searchLastIndex !== -1) {
            return [searchIndex, searchIndex + searchLastIndex + _end.length];
        }
    }
    return [-1, -1];
}

// 旧記述を新記述へ置換
const replaceStr = (_str, _org, _terms, _replaceStr) =>
    _str.split(_org.slice(_terms[0], _terms[1])).join(_replaceStr);

// ファイルよりdos分解
const dosConvert = (_dos) => {
    g_rawData = ``;
    const obj = {};

    if (findPos(_dos, `<h`, `>`)[0] !== -1) {

        // embedタグを探して一括置き換え
        const embedPos = findPos(_dos, `<embed `, `>`);
        const objectPos = findPos(_dos, `<object`, `</object>`);
        const html5Pos = findPos(_dos, `<!doctype html`, `>`);
        const headPos = findPos(_dos, `<head>`, `</head>`);
        const headStartPos = findPos(_dos, `<head`, `>`);
        const headEndPos = findPos(_dos, `</head`, `>`);
        const embedEndPos = findPos(_dos, `</embed`, `>`);
        const metaPos = findPos(_dos, `<meta `, `>`);

        const html5Doc = `<!DOCTYPE html>
            `;
        const html5Key = `
            <input type="hidden" name="externalDos" id="externalDos" value="dos_js.txt">
            <div id="canvas-frame" style="width:600px"></div>
                `;
        const mainjs = `
            <script src="../js/danoni_main.js" charset="UTF-8"></script>
            <link rel="stylesheet" type="text/css" href="../css/danoni_main.css">
        </head>
                `;
        const meta = `<meta charset="utf-8">`;
        const metaWithHeader = `<head>
            ${meta}`;
        const mainjsWithHeader = `${metaWithHeader}
            <title>Dancing Onigiri</title>
            ${mainjs}`;

        obj.html5Text = _dos;

        // embedタグ、objectタグを変換
        if (objectPos[0] !== -1) {
            obj.html5Text = replaceStr(obj.html5Text, _dos, objectPos, html5Key);
        } else if (embedPos[0] !== -1) {
            obj.html5Text = replaceStr(obj.html5Text, _dos, embedPos, html5Key);
            if (embedEndPos[0] !== -1) {
                obj.html5Text = replaceStr(obj.html5Text, _dos, embedEndPos, ``);
            }
        }

        // header内のmetaタグをutf-8に変換し、scriptタグ、linkタグを追加
        if (headPos[0] !== -1) {
            obj.html5Text = replaceStr(obj.html5Text, _dos, headEndPos, mainjs);
            if (metaPos[0] !== -1) {
                obj.html5Text = replaceStr(obj.html5Text, _dos, metaPos, meta);
            } else {
                obj.html5Text = replaceStr(obj.html5Text, _dos, headStartPos, mainjsWithHeader);
            }
        } else {
            obj.html5Text = `${mainjsWithHeader}${obj.html5Text}`;
        }

        // HTML5用のDOCTYPEに置き換え
        if (html5Pos[0] !== -1) {
            obj.html5Text = obj.html5Text.split(_dos.slice(html5Pos[0], html5Pos[1])).join(html5Doc);
        } else {
            obj.html5Text = `${html5Doc}${obj.html5Text}`;
        }
        g_rawData += obj.html5Text;

    } else {
        const params = _dos.split(`&`);
        for (let j = 0; j < params.length; j++) {
            const pos = params[j].indexOf(`=`);
            if (pos > 0) {
                const pKey = params[j].substring(0, pos);
                const pValue = params[j].substring(pos + 1);
                if (pKey === `difStep` || pKey === `difName` || pKey === `speedlock` ||
                    (pKey.substring(0, 5) === `color` && pKey.endsWith(`_data`)) ||
                    (pKey.substring(0, 6) === `acolor` && pKey.endsWith(`_data`))) {
                    obj[pKey] = pValue;
                } else if (pKey === `difData`) {
                    obj[pKey] = pValue;
                    g_rawData += `|${params[j]}|\r\n`;
                } else {
                    g_rawData += `|${params[j]}|\r\n`;
                }
            }
        }
    }
    return obj;
}

// カラーNoの変換
const convertColorNo = (_key, _no) => {
    if (g_colorFlg === `current`) {
        return (_no < 20 ? g_keyObj[`c${_key}`][_no] : g_keyObj.cCom[_no]);
    } else {
        return (_no < 11 ? g_keyObj[`c${_key}`][_no] : g_keyObj.cComOld[_no]);
    }
}

// 抽出したデータのみ変換処理を掛ける
const convertHeader = (_rootObj) => {

    const obj = {};

    // 譜面情報の変換、キー数情報の取得
    let difs = [];
    if (_rootObj.difData !== undefined) {
        difs = _rootObj.difData.split(`$`);
        const C_DIF_KEY = 0;
        obj.keyLabels = [];

        for (let j = 0; j < difs.length; j++) {
            const difDetails = difs[j].split(`,`);

            // キー数
            const keyLabel = difDetails[C_DIF_KEY];
            obj.keyLabels.push(g_keyObj.keyTransPattern[keyLabel] || keyLabel);
        }

    } else if (_rootObj.difStep !== undefined) {
        difs = _rootObj.difStep.split(`,`);
        obj.keyLabels = _rootObj.difStep.split(`,`);
        obj.difLabels = _rootObj.difName.split(`,`);
        obj.speedInits = _rootObj.speedlock.split(`,`);

        g_rawData += `|difData=`;
        for (let j = 0; j < obj.keyLabels.length; j++) {
            g_rawData += `${obj.keyLabels[j]},${obj.difLabels[j]},${obj.speedInits[j]}`;
            if (j < obj.keyLabels.length - 1) {
                g_rawData += `$`;
            }
        }
        g_rawData += `|`;
    }

    for (let j = 0; j < difs.length; j++) {
        const idHeader = (j === 0 ? `` : (j + 1));

        // 個別色変化
        if (_rootObj[`color${idHeader}_data`] !== undefined) {
            g_rawData += `|color${idHeader}_data=\r\n`;

            let tmpArrayData = _rootObj[`color${idHeader}_data`].split(`\r`).join(`\n`);
            tmpArrayData = tmpArrayData.split(`\n`);
            tmpArrayData.forEach(tmpData => {
                if (tmpData !== undefined && tmpData !== ``) {
                    const tmpColorData = tmpData.split(`,`);
                    for (let k = 0; k < tmpColorData.length; k += 3) {
                        if (isNaN(parseInt(tmpColorData[k]))) {
                            continue;
                        }

                        g_rawData += `${tmpColorData[k]},${convertColorNo(obj.keyLabels[j], parseFloat(tmpColorData[k + 1]))},${tmpColorData[k + 2].replace(`0x`, `#`)}\r\n`;
                    }
                }
            });

            g_rawData += `|`;
        }

        // 全体色変化
        if (_rootObj[`acolor${idHeader}_data`] !== undefined) {
            g_rawData += `|acolor${idHeader}_data=\r\n`;

            let tmpArrayData = _rootObj[`acolor${idHeader}_data`].split(`\r`).join(`\n`);
            tmpArrayData = tmpArrayData.split(`\n`);
            tmpArrayData.forEach(tmpData => {
                if (tmpData !== undefined && tmpData !== ``) {
                    const tmpColorData = tmpData.split(`,`);
                    for (let k = 0; k < tmpColorData.length; k += 3) {
                        if (isNaN(parseInt(tmpColorData[k]))) {
                            continue;
                        }

                        g_rawData += `${tmpColorData[k]},${convertColorNo(obj.keyLabels[j], parseFloat(tmpColorData[k + 1]))},${tmpColorData[k + 2].replace(`0x`, `#`)}\r\n`;
                    }
                }
            });

            g_rawData += `|`;
        }
    }
    g_rawData = g_rawData.replace(/'/g, `&#39;`);
}

// ファイルごとの変換処理
const convert = file => {
    const colorFlg = document.options.colorFlg;
    if (colorFlg[0].checked) {
        g_colorFlg = `current`;
    } else if (colorFlg[1].checked) {
        g_colorFlg = `old`;
    }

    const encodeFlg = document.options.encodeFlg;
    if (encodeFlg[0].checked) {
        g_encodeFlg = `shift-jis`;
    } else if (encodeFlg[1].checked) {
        g_encodeFlg = `euc-jp`;
    } else if (encodeFlg[2].checked) {
        g_encodeFlg = `utf-8`;
    }

    const reader = new FileReader();

    reader.onload = () => {
        const rootObj = dosConvert(reader.result);
        let file;
        let a;

        if (rootObj.html5Text === undefined) {
            convertHeader(rootObj);

            const externalDos = `function externalDosInit() {

          g_externalDos = \`\r\n${g_rawData}\r\n|adjustment=0|\r\n|titlesize=|\r\n|musicUrl=nosound.mp3|
          \`;\r\n\}
        `;
            file = new Blob([externalDos], {
                type: `text/plain;charset=utf-8`
            });

            // 見えないダウンロードリンクを作る
            a = document.createElement('a');
            a.href = URL.createObjectURL(file);
            a.download = `dos_js.txt`;
            a.style.display = 'none';

        } else {
            const externalHtml = `${g_rawData}`;
            file = new Blob([externalHtml], {
                type: `text/html;charset=utf-8`
            });

            // 見えないダウンロードリンクを作る
            a = document.createElement('a');
            a.href = URL.createObjectURL(file);
            a.download = `danoni.html`;
            a.style.display = 'none';
        }

        // DOMツリーに存在しないとFirefox等でダウンロードできない
        document.body.appendChild(a);

        // ダウンロード
        a.click();
    }

    reader.readAsText(file, g_encodeFlg);
}

document.addEventListener('DOMContentLoaded', main);