'use strict';
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const ejs = require('ejs');
const char = require('./mod_char');
const func = require('./mod_func');


// Settings
const debug = true;
const excelFile = 'source.xlsx';
const templateFile = 'template.ejs';
const outputPath = 'output';

console.log('開始');

try {
    fs.accessSync(outputPath);
} catch(err) {
    if (err.code === 'ENOENT') {
        fs.mkdirSync(outputPath);
    } else {
        console.log('error:\n' + err);
        process.exit(1);
    }
}

/* --------------------
Load Excel
-------------------- */
const workbook = xlsx.readFile(excelFile, { cellDates: true });
const worksheet = workbook.Sheets[workbook.SheetNames[0]];

// (参考)Excelシート全体を読み込む場合
// const excelData = xlsx.utils.sheet_to_json(worksheet);

// Excelシートの1行目にあるセルは個別に読み、２行目以降を表として読む場合
const htmlTitle = worksheet[xlsx.utils.encode_cell({c:1, r:0})].w; //B1
const baseName = worksheet[xlsx.utils.encode_cell({c:1, r:1})].w; //B2
const urlParam = worksheet[xlsx.utils.encode_cell({c:1, r:2})].w; //B3
// 5行目以降をJSONとして読込→開始行がプロパティ名として扱われる
const excelData = xlsx.utils.sheet_to_json(worksheet, {range:4});
if(debug){
    console.log('htmlTitle: ' + htmlTitle);
    console.log('baseName: ' + baseName);
    console.log('urlParam: ' + urlParam);
    fs.writeFileSync(path.join(outputPath, 'excelData.json'), JSON.stringify(excelData, null, '    '));
}


/* --------------------
参考：モジュールで定義した関数の呼び出し
-------------------- */
// 説明文の文字成形
excelData.map( (e)=>{
    return e.説明 = char.formatChar(e.説明);
});
// 商品名で並べ替え
excelData.sort( func.sortKey({key:'商品名'}) );


/* --------------------
Convert to Html
-------------------- */
const template = fs.readFileSync(templateFile, 'utf8');
const ejsOptions = {
    'htmlTitle' : htmlTitle,
    'basePath' : '',
    'baseName' : baseName,
    'urlParam' : 'utm_source=product&utm_medium=display&utm_campaign=' + urlParam,
    'excelData' : excelData
};
let resultHtml = ejs.render(template, ejsOptions);


/* --------------------
Save to File
-------------------- */
resultHtml = resultHtml.trim().replace(/\xc2\xa0/g, ' ').replace(/^\s*$/mg, '').replace(/^\s+/g, '');
let savePath = path.join(outputPath, baseName + '.html');
fs.writeFileSync(savePath, resultHtml);

console.log(savePath);
console.log('終了');
