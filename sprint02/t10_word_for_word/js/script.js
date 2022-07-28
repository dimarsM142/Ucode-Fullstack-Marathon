function checkArr(arr) {
    let first_arr = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]) {
            first_arr.push(arr[i]);
        }
    }
    let second_arr = [];
    for (let i = 0; i < first_arr.length; i++) {
        let j = first_arr[i];
        if (!~second_arr.indexOf(j)) {
            second_arr.push(j);
        }
    }
    return second_arr;
}

function deleteWord(arr, wrds){
    wrds = wrds.split(" ");
    let new_arr = checkArr(wrds);
    for (let i = 0; i < new_arr.length; i++) {
        let element = new_arr[i];
        let index = arr.indexOf(element);
        if (index > -1) {
            arr.splice(index, 1);
        }
    }
    return arr;
}

function findWord(arr, oldwrd, newwrd){

}
function addWords(obj, wrds){
    let arr = Object.values(obj);
    arr = String(arr);
    arr += " " + wrds;
    arr = arr.split(" ");
    arr = checkArr(arr);
    obj["words"] =  arr.join(" ");
    return obj;
}

function removeWords(obj, wrds) {
    let arr = Object.values(obj);
    arr = String(arr);
    arr = checkArr(arr.split(" "));
    arr = deleteWord(arr, wrds);
    obj["words"] = arr.join(" ");
    return obj;
  }
function changeWords(obj, oldWrds, newWrds) {
    let arr = Object.values(obj);
    let index;
    arr = String(arr);
    arr = checkArr(arr.split(" "));
    newWrds = newWrds.split(" ");
    let new_word_test = checkArr(newWrds);
    oldWrds = oldWrds.split(" ")
    let old_word_test = checkArr(oldWrds);
    for (let i = 0; i < old_word_test.length; i++) {
        index = arr.indexOf(old_word_test[i]);
        if (index >= 0) {
            arr.splice(index, 1);
        }
    }
    for (let i = 0; i < new_word_test.length; i++) {
        let element = new_word_test[i];
        arr.push(element);
    }
    obj["words"] = arr.join(" ");
    return obj;
}