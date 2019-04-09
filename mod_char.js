'use strict';

exports.formatChar = (str) => {
    // 先頭末尾の空白除去
	str = str.trim();
	
	// 制御文字の除去モード  true:全部 false:ミニマム
	let clearAllCtrlChar = 0;
	if(clearAllCtrlChar === 2){
		// 全制御文字(ASCII 00-31,127)
		str = str.replace(/[\x00-\x1F\x7F]/g, '');
	}else if(clearAllCtrlChar === 1){
		// 改行除去
		str = str.replace(/[\n\r]/g, '');
	}
    // タブ・垂直タブ・改ページを削除
    str = str.replace(/[\v\t\f]/g, '');
	
	// 半角空白の統一 no break space(&nbsp;) -> space
	str = str.replace(/\xA0/g, '\x20');
    // 全→半
    // シフトできる文字列 Ａ-Ｚａ-ｚ０-９！”＃＄％＆’（）＊＋、－．／：；＜＝＞？＠［＼］＾＿｀｛｜｝～
    const hanReg = /[Ａ-Ｚａ-ｚ０-９！＃＄＊＋－．／：；＝＠＾＿｜]/g;
    str = str.replace(hanReg, (match) => {
        return String.fromCharCode(match.charCodeAt(0) - 0xFEE0);
    });
    // 半→全
    const zenReg = /[!%&\(\)<>?\[\]\{\\}]/g;
    str = str.replace(zenReg, (match) => {
        return String.fromCharCode(match.charCodeAt(0) + 0xFEE0);
    });
    // 全角スペース→半角スペース
    str = str.replace('　', ' ');
    // 全角ハイフン「‐」・全角マイナス「－」・全角ダッシュ「―」→半角ハイフン
    str = str.replace(/[‐－―]/g, '-');
    // 波ダッシュ・半角チルダ→全角波形
    str = str.replace(/[〜~]/g, '～');
    // 半角片カナ→全角片カナ
    const kanaMap = {
        'ｶﾞ': 'ガ', 'ｷﾞ': 'ギ', 'ｸﾞ': 'グ', 'ｹﾞ': 'ゲ', 'ｺﾞ': 'ゴ',
        'ｻﾞ': 'ザ', 'ｼﾞ': 'ジ', 'ｽﾞ': 'ズ', 'ｾﾞ': 'ゼ', 'ｿﾞ': 'ゾ',
        'ﾀﾞ': 'ダ', 'ﾁﾞ': 'ヂ', 'ﾂﾞ': 'ヅ', 'ﾃﾞ': 'デ', 'ﾄﾞ': 'ド',
        'ﾊﾞ': 'バ', 'ﾋﾞ': 'ビ', 'ﾌﾞ': 'ブ', 'ﾍﾞ': 'ベ', 'ﾎﾞ': 'ボ',
        'ﾊﾟ': 'パ', 'ﾋﾟ': 'ピ', 'ﾌﾟ': 'プ', 'ﾍﾟ': 'ペ', 'ﾎﾟ': 'ポ',
        'ｳﾞ': 'ヴ', 'ﾜﾞ': 'ヷ', 'ｦﾞ': 'ヺ',
        'ｱ': 'ア', 'ｲ': 'イ', 'ｳ': 'ウ', 'ｴ': 'エ', 'ｵ': 'オ',
        'ｶ': 'カ', 'ｷ': 'キ', 'ｸ': 'ク', 'ｹ': 'ケ', 'ｺ': 'コ',
        'ｻ': 'サ', 'ｼ': 'シ', 'ｽ': 'ス', 'ｾ': 'セ', 'ｿ': 'ソ',
        'ﾀ': 'タ', 'ﾁ': 'チ', 'ﾂ': 'ツ', 'ﾃ': 'テ', 'ﾄ': 'ト',
        'ﾅ': 'ナ', 'ﾆ': 'ニ', 'ﾇ': 'ヌ', 'ﾈ': 'ネ', 'ﾉ': 'ノ',
        'ﾊ': 'ハ', 'ﾋ': 'ヒ', 'ﾌ': 'フ', 'ﾍ': 'ヘ', 'ﾎ': 'ホ',
        'ﾏ': 'マ', 'ﾐ': 'ミ', 'ﾑ': 'ム', 'ﾒ': 'メ', 'ﾓ': 'モ',
        'ﾔ': 'ヤ', 'ﾕ': 'ユ', 'ﾖ': 'ヨ',
        'ﾗ': 'ラ', 'ﾘ': 'リ', 'ﾙ': 'ル', 'ﾚ': 'レ', 'ﾛ': 'ロ',
        'ﾜ': 'ワ', 'ｦ': 'ヲ', 'ﾝ': 'ン',
        'ｧ': 'ァ', 'ｨ': 'ィ', 'ｩ': 'ゥ', 'ｪ': 'ェ', 'ｫ': 'ォ',
        'ｯ': 'ッ', 'ｬ': 'ャ', 'ｭ': 'ュ', 'ｮ': 'ョ',
        '｡': '。', '､': '、', 'ｰ': 'ー', '｢': '「', '｣': '」', '･': '・'
    };
    const kanaReg = new RegExp('(' + Object.keys(kanaMap).join('|') + ')', 'g');
    str = str.replace(kanaReg, function (match) {
        return kanaMap[match];
    });
    str = str.replace(/ﾞ/g, '゛');
    str = str.replace(/ﾟ/g, '゜');
    //組文字分解
    const kumiMap = {
        '㈱': '(株)', '㈲': '(有)', '㈳': '(社)', '㈵': '(特)',
        '㈶': '(財)', '㈻': '(学)', '㈼': '(監)', '㍿': '株式会社'
    };
    const kumiReg = new RegExp('(' + Object.keys(kumiMap).join('|') + ')', 'g');
    str = str.replace(kumiReg, function (match) {
        return kumiMap[match];
    });
    // 置換テーブル
    const replaceMap = {
        'twitter':'Twitter'
        ,'facebook':'Facebook'
        ,'youtube':'YouTube'
        ,'instagram':'Instagram'
        ,'google':'Google'
        ,'yahoo!':'Yahoo!'
        ,'yahoo！':'Yahoo!'
        ,'セブン-イレブン': 'セブン‐イレブン'
        ,'セブン－イレブン': 'セブン‐イレブン'
        ,'セブン―イレブン': 'セブン‐イレブン'
        ,'イトーヨーカ堂':'イトーヨーカドー'
        ,'キャノン': 'キヤノン'
        ,'スクエア・エニックス':'スクウェア・エニックス'
        ,'キューピー':'キユーピー'
        ,'シャチハタ':'シヤチハタ'
        ,'ビッグカメラ':'ビックカメラ'
        ,'ブルドッグソース':'ブルドックソース'
        ,'東京ビックサイト':'東京ビッグサイト'
        //,'©': '（C）'
    };
    const replaceReg = new RegExp('(' + Object.keys(replaceMap).join('|') + ')', 'g');
    str = str.replace(replaceReg, function (match) {
        return replaceMap[match];
    });
    
    return str;
};



// Date Format
exports.formatDate = (data, dateForm) => {
    let result, date;
    if(!dateForm){
        dateForm = 'YYYY/MM/DD hh:mm';
    }

    if(Object.prototype.toString.call(data) === '[object Date]'){
        date = data;
    }else{
        let str = data.trim();

        // 全角→半角
        str = str.replace(/[Ａ-Ｚａ-ｚ０-９（）－．／：［］]/g, (match) => {
            return String.fromCharCode(match.charCodeAt(0) - 0xFEE0);
        });
        // 「/」区切り形式に変換
        str = str.replace(/　/g, ' ')
            .replace(/\(?[日月火水木金土]曜日?\)?/g, '')
            .replace(/[\.年月]/g, '/')
            .replace('日', '');
        // 年が省略されていたら、今の年を補う
        if(/\d{2}\/\d{1,2}\/\d{1,2}(?!\/)/.test(str)){
            date = new Date('20' + str);
        }else if(/\d{1,2}\/\d{1,2}(?!\/)/.test(str)){
            const now = new Date();
            now.setHours(0,0,0,0);
            const nowYear = now.getFullYear();
            str = nowYear + '/' + str;
            date = new Date(str);
            if(date < now){
                date.setFullYear(date.getFullYear() + 1);
            }
        }else{
            date = new Date(str);
        }
    }

    // 日付フォーマット
    if(date.toString() !== 'Invalid Date'){
        const year = date.getFullYear();
        const month = (date.getMonth() + 1);
        const day = date.getDate();
        const week = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()];
        const hrs = date.getHours();
        const min = date.getMinutes();
        const sec = date.getSeconds();

        const dayPattrn = {
            'YYYY': year,
            'MM': ('0' + month).slice(-2),
            'M': month,
            'DD': ('0' + day).slice(-2),
            'D': day,
            'W': week,
            'hh': ('0' + hrs).slice(-2),
            'h': hrs,
            'mm': ('0' + min).slice(-2),
            'm': min,
            'ss': ('0' + sec).slice(-2),
            's': sec
        };

        const regexp = new RegExp('(' + Object.keys(dayPattrn).join('|') + ')', 'g');
        result = dateForm.replace(regexp, function(match){
            return dayPattrn[match];
        });
    }else{
        return new Error('日付を認識できません...');
    }

    return result;
};

