const http = require('http');

function checkForm() {
    let finishResult;
    let arr = document.getElementsByTagName("form");    
    for(let buffer of arr[0]) {
        if(buffer.checked) {
            console.log(buffer.value);
            finishResult = buffer.value;
        }
    }
    if(finishResult != 2) {
        alert('Вы ошиблись. Подумайте получше!');
    } else {
        alert('Ответ правильный');
    }
}
