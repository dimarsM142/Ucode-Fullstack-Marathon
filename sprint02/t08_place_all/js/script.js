function compare(a, b){
    return a%2 - b%2 || a - b;
}

function sortEvenOdd(arr){
    arr.sort(compare);
}