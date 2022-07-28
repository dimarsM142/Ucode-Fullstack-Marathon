const button = document.querySelector('button');
button.addEventListener('click', (arg) => {
    arg.preventDefault();
    arg.target.setAttribute('disabled', true);
    fetch('/show')
        .then((res) => res.json())
        .then((data) => {
           document.querySelector('#content').innerHTML = getHtml(data);
        });
});

function getHtml(data) {
    let string = '';
    for(let key in data) {
        if(typeof data[key]  != "object") {
            string = string + `<div class="box"><b>${key}</b>: ${data[key]}</div>`;
        } else {
            string = string + `<div class="box"><b class="key">${key}</b>: ${getHtml(data[key])}</div>`;
        }

    }
    return string;
}