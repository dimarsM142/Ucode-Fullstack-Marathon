const express = require('express');
const session = require('express-session');
const app = express();

app.use(session({secret: 'hasdasdasdas', saveUninitialized: true, resave: true}));
app.use(express.urlencoded({extended: true}));

let sess;

app.post('/login', (require, response) => {
    sess = require.session;
    let counterExp = 1;
    let counterPurpose = 1;
    console.log(require.body)
    for(let temp in require.body) {
        sess[temp] = require.body[temp];
        if(temp.includes('box_')){
            sess.expirience = counterExp++;
        }else{
            sess.expirience = counterExp - 1;
        }
        if(temp.includes('radio_')){
            sess.purpose = counterPurpose++;
        }else{
            sess.purpose = counterPurpose- 1;
        }
    }
    response.redirect("/check_info");
}); 

app.get('/', (require, response) => {
    sess = require.session;
    if(sess.ageHero){
        response.redirect('/check_info');
    } else {
        response.sendFile(__dirname + '/index.html');
    }

});

app.get('/loginAgain',(require,response) => {
    require.session.destroy(() => { response.redirect('/'); });

});

app.get('/check_info', (require, response) => {
    sess = require.session;
    response.write(`<h1>Session for new</h1>
    <span>
    Real name: ${sess.realName}<br>
    Current Alias:${sess.curAlias}<br>
    Age:${sess.ageHero}<br>
    Description:${sess.textAbout}<br>
    Photo:${sess.picture}<br>
    Expirience:${sess.expirience}<br>
    Level:${sess.control}<br>
    Purpose:${sess.purpose}<br><br></span>`);
    response.end('<button><a href=/loginAgain>Input one more time</a></button>');
});




app.listen(process.env.PORT || 3000, '127.0.0.1', () => {
    console.log("Port of app = " + (process.env.PORT || 3000));
});