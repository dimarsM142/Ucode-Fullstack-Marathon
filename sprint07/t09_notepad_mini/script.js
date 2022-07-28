let list = document.getElementById('list');
let content = document.getElementById('content');
let html;
if(list.innerHTML.length < 5) {
    list.classList.add('hide');
}
if(content.innerHTML.length < 5) {
    content.classList.add('hide');
}

window.onload = function() {
    fetch('/list')
        .then(res => res.json())
        .then( function(data) {showSite(data, "")});
};

function showSite(data, name) {
    if(data.list) {
        html = '<ul>';
        data.list.map( function(item) {
            html = html + `<li><a href="/show/?id=${item[0]}">${item[1].date} > ${item[1].name}</a> <a href="/delete/?id=${item[0]}">delete note</a></li>`;
        });
        list.innerHTML = "<h2>List of note:</h2>" + html;
        list.classList.remove('hide');
    }
    if(data.content) {
        let result = "<h2>Selected file: </h2>";
        result = result + `<h2>${name}</h2>` + '</br>';
        result = result + data.content;
        result = result + `<div><button id="deleteNote">Delete note</button></div>`
        content.innerHTML = '<pre>' + result + '</pre>';
        content.classList.remove('hide');
        document.querySelector('#deleteNote').addEventListener('click', function() {
            location.href = '/delete/?file=' + name
        });
    }
}

function showFile(e) {
    fetch('/show?file=' + e.target.dataset.file)
        .then(res => res.json())
        .then(function(data) {
            showSite(data, e.target.dataset.file);
            console.log(data);
        });
}