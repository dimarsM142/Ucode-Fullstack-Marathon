const express = require('express');
const app = express();
const {ListAvengerQuotes} = require('./ListAvengerQuotes');
const data = require('./array');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/js', express.static(__dirname + '/'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
app.get('/PagetoXml', (req, res) => {
    let list = new ListAvengerQuotes(data.data);
    list.PagetoXml('avengerQuote.xml');
    res.json({to: JSON.stringify(list.data), from: list.fromXML('avengerQuote.xml')});
});

app.listen(process.env.PORT || 3000, '127.0.0.1', () => {
    console.log("Port of app = " + (process.env.PORT || 3000));
});
