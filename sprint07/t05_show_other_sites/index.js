const express = require('express');
const app = express();
const fs = require('fs');
const rq = require('request');


app.use(express.json());
app.use(express.urlencoded({ extended: true }))

function getIndex(insert) {
    try {
        const data = fs.readFileSync('index.html', 'utf-8');
        if(data && insert){
            return data.replace("#WebsiteURL#", insert);
        }
        else {
            return data.replace("#WebsiteURL#", '');
        }
    } catch (err) {

    }
    return false;
}

app.get('/', function(request, response){
    console.log(request.query);
    if(!request.query.url) {
        response.send(getIndex(`<div id="typeurl">Input your URL...</div>`));
    } else {
        rq(request.query.url.includes('http') ? request.query.url : 'http://' + request.query.url, function (error, res, body) {
            response.send(getIndex('<hr>URL of site: ' + request.query.url + '</br><hr><pre>' +  body.substring(body.indexOf('<body'), body.indexOf('</body') + 7)
            .replaceAll('>', '&gt;').replaceAll('<','&lt;') + '</pre>'));
        });
        
    }
});

app.listen(process.env.PORT || 3000, '127.0.0.1', () => {
    console.log("Port of app = " + (process.env.PORT || 3000));
});

