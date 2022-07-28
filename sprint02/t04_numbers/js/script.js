function checkDivision(begin, end) {
    let number;
    for (; begin <= end; begin++) {
        number = " - ";
        if (begin % 2 === 0) {
            number = " is even";
        }
        if (begin % 3 === 0 && begin % 2 !== 0) {
            number = " is a multiple of 3";
        }
        else if (begin % 3 === 0) {
            number += ", a multiple of 3";
        }
        if (begin % 10 === 0) {
            number += ", a multiple of 10";
        }
        
        console.log(begin + number + "\n")
    }
}

let begin = +prompt('Enter the number for the beginning of a range', '1');
let end = +prompt('Enter the number for the end of a range', '100');
if(begin != "NaN" && end != "NaN"){ 
    checkDivision(begin, end);
}