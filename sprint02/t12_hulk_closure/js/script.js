function concat(arg1, arg2) {
    foo.count = 0;

    function foo() {
        let arg2copy = prompt("Enter string: ", "");
        foo.count++;  
        if (arg2copy === null)
            return arg1;
        return arg1 + " " + arg2copy;
    }

    if (arg2 === undefined ) {
        let result = foo;
        return result;
    }
    else{
        return arg1 + " " + arg2;
    }
}