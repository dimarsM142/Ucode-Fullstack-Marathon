let list = document.getElementById('list');
let content = document.getElementById('content');

if(list.innerHTML.length < 5) {
    list.classList.add('hide');
}
if(content.innerHTML.length < 5) {
    content.classList.add('hide');
}

function mainFoo(data, name) {
    if(data.content) {
        let render = "<h2>Selected file: </h2>";
        render = render + `<h2>${name}</h2>` + '</br>';
        render = render + data.content;
        render = render + '<div><button id="deleteTextFile">Delete</button></div>';

        content.innerHTML = '<pre>' + render + '</pre>';
        content.classList.remove('hide');
        document.querySelector('#deleteTextFile').addEventListener('click',
        function()  {location.href = '/delete/?file=' + name});
    }
    if(data.html) {
        list.innerHTML = "<h2>Files:</h2>" + data.html;
        list.classList.remove('hide');

        document.querySelectorAll('.btn-file').forEach(item => {
           item.addEventListener('click', (e) => showFile(e));
        });
    }
   
}

function showFile(arg) {
    fetch('/show?file=' + arg.target.dataset.file)
        .then((res) => res.json())
        .then((data) => {
            mainFoo(data, arg.target.dataset.file);
        });
}

window.onload = () => {
    fetch('/list')
        .then((res) => res.json())
        .then(data => {
            mainFoo(data, "");
        });
};

