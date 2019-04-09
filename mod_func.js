'use strict';


/*
連想配列のソート

Usage:
arrinobj.sort( sortKey({key:keyname, order:1},{key:keyname, order:1}) );

keyとorderのセットをオブジェクトとして引数に指定する。引数は複数指定可。
key:ソート対象のキー名
order:1=ascendant（昇順）デフォルト値 -1=descendant（降順） ※省略可

*/

exports.sortKey = (...args) => {
    let compVal = (a, b, args) => {
        const key = args.key;
        const order = args.order ? args.order : 1;
        if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
            return 0; 
        }

        let varA = a[key];
        if(typeof a[key] === 'string') {
            varA = a[key].toUpperCase().replace(/[0-9]+/g, (match) => {
                return ('0000000000' + match).slice(-10);
            });
        }
        let varB = b[key];
        if(typeof b[key] === 'string'){
            varB = b[key].toUpperCase().replace(/[0-9]+/g, (match) => {
                return ('0000000000' + match).slice(-10);
            });
        }
        // console.log('varA:' + varA + '\nvarB:' + varB);

        let comparison = (varA > varB) ? 1 : (varA < varB) ? -1 : 0;
        return (comparison * order);
    };

    return function(a, b) {
        let res = 0;
        for(let i = 0; i < args.length; i++){
            res = compVal(a, b, args[i]);
            if(res !== 0){
                return res;
            }
        }
        return res;
    };
};


exports.sortKeySingle = (key, order='asc') => {
    return function(a, b) {
        if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
            return 0; 
        }

        let varA = a[key];
        if(typeof a[key] === 'string') {
            varA = a[key].toUpperCase().replace(/[0-9]+/g, (match) => {
                return ('0000000000' + match).slice(-10);
            });
        }
        let varB = b[key];
        if(typeof b[key] === 'string'){
            varB = b[key].toUpperCase().replace(/[0-9]+/g, (match) => {
                return ('0000000000' + match).slice(-10);
            });
        }
        // console.log('varA:' + varA + '\nvarB:' + varB);

        let comparison = (varA > varB) ? 1 : (varA < varB) ? -1 : 0;
        return (
            (order == 'desc') ? (comparison * -1) : comparison
        );
    };
};



