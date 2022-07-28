const express = require("express");
const bcrypt = require("bcrypt");
const session = require("express-session");
const app = express();
const INPUTPASSWD = 1;
const CHECKPASSWD = 2;
const TRUEPASSWD = 3;

app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "asdasdasd", saveUninitialized: true, resave: true }));

function  changePasswd(type, hash) {
    let hacked = `<h1>Password</h1>
    <h2 style="color:green">Hacked!</h2>
    <form action="/" method="POST" >
    <p>Password not saved at session.</p>
    <p>Password for saving to session<input type="password" name="password" placeholder="Password to session"></p>
    <p>Salt for saving to session<input type="number" name="number" placeholder="Salt to session"></p>
    <button type="submit">Save</button>
    </form>`;
    let check = `<h1>Password</h1>
    <form action="/hacked" method="POST" >
    <p>Password saved at session.</p>
    <p>Hash is ${hash}</p>
    <p>Try to guess:<input type="text" name="text" placeholder="Password to session"><button type="submit">Check password</button></p>
    </form>
    <button onclick="location.href='/loginAgain'">Clear</button>`;
    let input = `<h1>Password</h1>
    <form action="/" method="POST" >
    <p>Password not saved at session.</p>
    <p>Password for saving to session<input type="password" name="password" placeholder="Password to session"></p>
    <p>Salt for saving to session<input type="number" name="number" placeholder="Salt to session"></p>
    <button type="submit">Save</button>
    </form>`;
    if(type === INPUTPASSWD){
        return input;
    }
    if(type === CHECKPASSWD){
        return check;
    }
    if(type === TRUEPASSWD){
          return hacked;
      }
}


app.get("/", (request, response) => {
    let sess = request.session;
    if(!sess.password){
        response.send(changePasswd(INPUTPASSWD, ''));
    }
    if (sess.password) {
        response.send(changePasswd(CHECKPASSWD, sess.hash));
    } 
    
});

app.get('/result', (request, response) => {
    let sess = request.session;
    if(sess.password){
        response.send(changePasswd(CHECKPASSWD, sess.hash));
    }
});

app.get('/loginAgain', (request, response) => {
    request.session.destroy(() => {});
    response.redirect('/');
});

app.post('/', (request,response) => {
    let sess = request.session;
    sess.password = request.body.password;
    sess.number = request.body.number;
    sess.hash = bcrypt.hashSync(sess.password, +sess.number);
    response.redirect('/result');
});

app.post('/hacked', (request,response) => {
    let sess = request.session;
    sess.text = request.body.text;
    if(!sess.password) {
        response.redirect('/');
    } else {
        if(bcrypt.compareSync(sess.text, sess.hash)){
            sess.hacked = true;
            request.session.destroy(() => {
                response.send(changePasswd(TRUEPASSWD));
            });
        } else {
            response.send(changePasswd(CHECKPASSWD, sess.hash));
        }
    }
});

app.listen(process.env.PORT || 3000, '127.0.0.1', () => {
    console.log("Port of app = " + (process.env.PORT || 3000));
});


