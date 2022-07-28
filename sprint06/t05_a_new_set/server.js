let counter1 = 0;
const arr = document.getElementsByTagName('form');
arr[0].addEventListener('submit', showData);
let resultInfo = [];


function showData(event) {
    let renderInfo = "POST</br></br>Array</br>(</br><pre>";
    event.preventDefault();
    [...arr[0]].map(item => {
        if(!item.name) {
            counter1++;
        }
        else{
            resultInfo.push([item.name, item.value]);
            renderInfo = renderInfo + `\t [${item.name}] => ${item.value}\n`;
        }
    });
    renderInfo = renderInfo + "</pre>)</br>";
    document.querySelector("#result").innerHTML = renderInfo;
}