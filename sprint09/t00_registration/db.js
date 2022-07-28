const mysql = require('mysql2');
const fs = require('fs');
const crypt = require('bcryptjs');
const User = require('./models/user');
const db = require('./config.json');

exports.done = function(req, res) {
    res.redirect("/done.html");
}
exports.index = function(req, res) {
    res.send(main(false));
}

function main(insert) {
    try {
        const data = fs.readFileSync(__dirname + '/public/register.html', 'utf-8');
        if(data && insert) {
            return data.replace("#TEXT#", insert);
        }
        else {
            return data.replace("#TEXT#", '');
        }
    } catch (err) {
        console.log(err);
    }
    return false;
}

exports.addUser = async function (req, res){
    let valid = await validate(req.body);
    if(!valid.status) {
        res.send(main(`<div class='error-box'>You have error!!! ${valid.error}</div>`));
    } else {
        let user = new User();
        user.save({
            full_name: req.body.name,
            login: req.body.login,
            password: crypt.hash(req.body.password, 8),
            email: req.body.email
        });
        res.redirect('/done');
    }
};

async function validate(data) {
    let result1;
    let user = new User();
    let result;
    let error = '';
    result = await user.getList({
        login: data.login
    });
    result1 = await user.getList({
        email: data.email
    });
    if(result1.length <= 0) {} else{
        error = error + "Such email is using enough! ";
    }

    if(result.length <= 0) {} else{
        error = error + "Such login is using enough ";
    }
    return {status: !(result.length + result1.length), error: error};
}
