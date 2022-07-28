const db = require('./config.json');
const fs = require('fs');
const mysql = require('mysql2');
const User = require('./models/user');
const express = require('express');
const app = express();
const crypt = require('bcryptjs');


function render(file, insert) {
    try {
        const data = fs.readFileSync(__dirname + `/public/${file}.html`, 'utf-8');
        if(data && insert) {
            return data.replace("#TEXT#", insert);
        }
        else {
            return data.replace("#TEXT#", '');
        }
    } catch (err) {
        console.error(err);
    }
    return false;

}

async function validate(data) {
    let result1, result, user = new User(), error = '';
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

exports.addUser = async function (req, res){
    let valid = await validate(req.body);
    if(!valid.status) {
        res.send(render('register', `<div class='error-box'>Error!!! ${valid.error}</div>`));
    } else {
        let user = new User();
        user.save({
            full_name: req.body.name,
            login: req.body.login,
            password: await crypt.hash(req.body.password, 8),
            email: req.body.email
        });
        res.redirect('/done');
    }
};



exports.done = function(request, response) {
    response.redirect("/done.html");
}

exports.index = function(request, response) {
    if(!request.session.user) {
        response.send(render('ind', false));
    } else {
        response.send(render("home", false));
    }
}

exports.register = function(request, response) {
    response.send(render('register',false));
}

exports.home = function(request, response) {
    if(!request.session.user) {
        response.redirect('/login/');
    } else {
        response.send(render("home", `Your type of status: ${request.session.user.status}</br>`));
    }

}
exports.login = async function(request, response) {
    console.log(request.method);
    if(request.method == 'GET') {
        if(!request.session.user) {
            response.send(render('login', false));
        } else {
            response.redirect('/user/home/');
        }

    } else {
        let sess = request.session;
        if(!sess.user) {
            let user = new User();
            let result = await user.getList({
                login: request.body.login,
            });
            if(await crypt.compare(request.body.password, result[0].password) &&!result.length <= 0) {
                sess.user = result[0];
                response.redirect('/user/home/');
            } else {
                response.send(render('login', '<div class="error-box">Error!! Password and login not valid</div>'));
            }
        } else {
            response.redirect('/user/home/');
        }
    }
}

exports.logout = async function(request, response) {
    request.session.destroy(function(err) {
        if(err) {}
        response.redirect('/login');
    });
}

