const express = require('express');
const app = express();
const fs = require('fs');
const csv = require('csv-parser');
const multer  = require("multer");
const session = require('express-session');

app.use(express.urlencoded({ extended: true }));
app.use(session({secret: 'hsjhjgkdfjgksj', saveUninitialized: true, resave: true}));
app.use('/uploads', express.static(__dirname + '/'));
app.use('/js', express.static(__dirname + '/'));
app.use(multer({dest:"uploads"}).single("file"));

function renderTabelFromCSV(arr, filter) {   
    let map = getModified(arr);
    let CSVText = '<form action="/filter" id="filters" method="GET"><table border="1px;"><tr>';
    for(let key in arr[0]){
        CSVText = CSVText + `<th>${getModifiedHTML(key, map, filter ? filter[key] : false)}</th>`;
    }
    CSVText = CSVText + '</tr>';
    if(filter != false && Object.keys(filter).length != 0) {
        arr = arr.filter(function(item) {
            let flag = true;
            for(let key in item){
                if( filter[key] == 'all-items'|| !(filter[key] == item[key])) {
                    flag = false;
                }
            }
            return flag;
        });
    }
    arr.map(function (item) {
        CSVText = CSVText + '<tr>';
        for(let key in item){
            CSVText = CSVText + `<td>${item[key]}</td>`;
        }
        CSVText = CSVText + '</tr>';
    });
    CSVText = CSVText + '</table><button type="submit" id="submit"></button></form>';
    return CSVText;
}

function CheckFile(insert) {
    try {
        const data = fs.readFileSync('index.html', 'utf-8');
        if(data && insert){
            return data.replace("#TEXT#", insert);
        } else {
            return data.replace("#TEXT#", ' ');
        }
    } catch (err) {}
    return false;

}

function getModifiedHTML(title, map, filter) {
    let CSVText = `<select name="${title}">${title}`;
    CSVText = CSVText + `<option value="all-items" ${filter == 'all-items' || !filter ? 'selected' : ''}><b>${title} (all)</b></option>`;
    map.get(title).map(function(item) {
        CSVText = CSVText + `<option value="${item}" ${filter == item ? 'selected' : ''}>${item}</option>`;
    });
    CSVText = CSVText + '</select>';
    return CSVText;
}

function getModified(arr) {
    let map = new Map();
    for(let key in arr[0]){
        map.set(key, [...new Set(arr.map(function(item) {return item[key]}))].sort());
    }
    return map;
}

app.get('/', function(req, res){
    res.send(CheckFile(false));
});

app.get('/filter', function(req, res){
    let sess
    let csvArray = [];
    let CSVText = '';
    fs.createReadStream(sess.file)
        .pipe(csv())
        .on('data', function (data) {csvArray.push(data)})
        .on('end', function () {
            CSVText = renderTabelFromCSV(csvArray, req.query);
            res.send(CheckFile(CSVText));
        });
});

app.post('/', function (req, res) {
    let sess = req.session;
    sess.file = req.file.path;
    let csvArray = [];
    let CSVText = '';
    fs.createReadStream(sess.file)
        .pipe(csv())
        .on('data', function(data) { csvArray.push(data) })
        .on('end', function() {
            CSVText = renderTabelFromCSV(csvArray, false);
            res.send(CheckFile(CSVText));
        });
});


app.listen(process.env.PORT || 3000, '127.0.0.1', () => {
    console.log("Port of app = " + (process.env.PORT || 3000));
});

