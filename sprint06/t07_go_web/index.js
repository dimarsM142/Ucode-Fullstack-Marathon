const quantum = require('./quantum-router');
const express = require('express');
const normal = require('./normal-router');

let expressTest = express();

expressTest.set('view engine', 'ejs');

expressTest.get('/', function(request, response){
    response.render('index');
});
expressTest.get('/normal', function(request, response){
    response.render('normal',{time: normal.calculateTime()});
});
expressTest.get('/compare', function(request, response){
    response.render('compare', {quantum: quantum, normal: normal});
});
expressTest.get('/quantium', function(request, response){
    response.render('quantum', {time: quantum.calculateTime()});
});

expressTest.listen(3000,"127.0.0.1", function(){
    console.log("Open http://127.0.0.1:3000/ \n Press Ctrl+C to stop server");
});


