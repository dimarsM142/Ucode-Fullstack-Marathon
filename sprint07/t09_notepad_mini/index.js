const express = require('express');
const app = express();
const fs = require('fs');
const Note = require('./Note');

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/js', express.static(__dirname + '/'));

function getResult(insert) {
    try {
        const arg = fs.readFileSync("index.html", "utf-8");
        if(arg && insert){
            return arg.replace("#CONTENT#", insert);
        }
        else{
            return arg.replace("#CONTENT#", "");
        }
    } catch (err) {
        console.error(err)
    }
    return false;
}

app.post('/', function(req, res){
    (new Note()).add(req.body);
    res.redirect('/');
});


app.get('/', function(req, res){
    res.send(getResult(false));
});


app.get('/delete', function(req, res){
    (new Note()).delete(req.query.id);
    res.redirect('/');
});

app.get('/list', function(req, res){
    res.json({list: (new Note()).getList()});
});

app.get('/show', function(req, res){
    res.send(getResult(((new Note()).getDetail(req.query.id))));
});



app.listen(process.env.PORT || 3000, '127.0.0.1', () => {
    console.log("Port of app = " + (process.env.PORT || 3000));
});


