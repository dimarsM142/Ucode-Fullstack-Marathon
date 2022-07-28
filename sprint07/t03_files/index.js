
const express = require('express');
const app = express();
const FileList = require('./FileList');
const File = require('./File');

app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.use('/js', express.static(__dirname + '/'));


app.post('/', (req, res) => {
    let file = new File(req.body.filename);
    file.write(req.body.content)
    console.log(req.body);
    res.redirect('/');
});


app.get('/', (req, res) => {
   res.sendFile(__dirname + "/index.html");
});

app.get('/delete', (req, res) => {
    console.log(req.query.file);
    let file = new File(req.query.file);
    file.delete();
    res.redirect('/');
});

app.get('/list', (req, res) => {
    let fileList = new FileList();
    res.json({html: fileList.getHTMLList()});
});

app.get('/show', (req, res) => {
    console.log(req.query.file);
    let file = new File(req.query.file);
    res.json({content: file.read()});
});



app.listen(process.env.PORT || 3000, '127.0.0.1', () => {
    console.log("Port of app = " + (process.env.PORT || 3000));
});

