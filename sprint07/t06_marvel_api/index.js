const express = require('express');
const app = express();
const fetch = require('node-fetch');
const crypto = require('crypto');


const publicKey = '2eda5a575ceb74fc5e2f6eebbe967403';
const privateKey = '192c02a94e2810ecea1cc8add7c734919e8ebc87';

let textHash = '';

function getMarvel() {
    let now = Date.now();
    textHash = crypto.createHash('md5').update(now + privateKey + publicKey).digest("hex");
    return fetch(`http://gateway.marvel.com/v1/public/comics?apikey=${publicKey}&hash=${textHash}&ts=` + now)
        .then(res => res.json());
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/js', express.static(__dirname + '/'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/show', async function(req, res){
    res.json(await getMarvel());
});

app.listen(process.env.PORT || 3000, '127.0.0.1', () => {
    console.log("Port of app = " + (process.env.PORT || 3000));
});

