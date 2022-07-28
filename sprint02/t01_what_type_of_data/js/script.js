let num = 5;
let bigInt = 10n;
let str = 'text';
let bool = false;
let null_obj = null;
let Undefined = undefined;
let object = { 
     first: 'test', 
     second: 0};
const symb = Symbol('test');
function func() {
}

alert ('num is ' + typeof(num) +
 '\nbigInt is ' + typeof(bigInt) +
 '\nstr is ' + typeof(str) +
 '\nbool is ' + typeof(bool) +
 '\nnull_obj is ' + typeof(null_var) + 
 '\nUndefined is ' + typeof(Undefined) +
 '\nobject is ' + typeof(obj) +
 '\nsymb is ' + typeof(symb) +
 '\nfunc is ' + typeof(func));