
let latitude = '50.00101';
let longitude = '36.23331';
let key = 'e4acaa3e67f468cd41d52cfb8fa91923';
let api = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exlude=daily&units=metric&appid=${key}`;
function main() {
    fetch(api).then(function(resp) { return resp.json() })
    .then(function(data) {
        setData(data);
    });
}
window.onload = function() {
    main();
}

function setData(data) {
    let arr = data.daily;
    let counter = 0;
    let span = document.getElementsByTagName('span');
    let img = document.getElementsByTagName('img');
    while(counter < 7){
        let date = new Date(arr[counter].dt * 1000);
        date = date.getDate() + '.' + (date.getMonth() + 1 < 10 ? '0'.concat('', date.getMonth() + 1) : date.getMonth() + 1);
        document.getElementById(`${counter + 1}`).innerHTML = date;
        let temp = (arr[counter].temp.day < 0 ? '-' : '+').concat('', arr[counter].temp.day) + '&#176';
        span[counter].innerHTML = temp;
        let result = "http://openweathermap.org/img/w/" + arr[counter].weather[0].icon + ".png";
        img[counter].src = result;
        counter++;
    }
}