let mysql      = require('mysql2');
const express = require('express');
let db = require('./config.json');
const app = express();

let connection = mysql.createConnection({
    host     : db.host,
    user     : db.user,
    password : db.password,
    database : db.data_base
});

connection.connect();

connection.query('SELECT 1 + 6 AS solution', function (err, res, fields) {
    if (err) {
        throw err;
    }
    console.log('OK connection to database ', res);
});

app.listen(3000, "127.0.0.1", function(){
    console.log("Port - 3000");
});


connection.end();