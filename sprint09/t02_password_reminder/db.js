const express = require('express');
const app = express();
const mysql = require('mysql2');
const User = require('./models/user');
const _conf = require('./config.json');
const fs = require('fs');
const crypt = require('bcryptjs');
const nodemailer = require("nodemailer");

function render(file, insert = false) {
    try {
        const data = fs.readFileSync(__dirname + `/views/${file}.html`, 'utf-8');
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

async function sendEmail(email, pass) {
    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });
    let info = await transporter.sendMail({
        from: '<dimonars11032003@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Important! Password reminder.", // Subject line
        text: "Your password is: <b>" + pass + "</b>", // plain text body
        html: "Your password is: <b>" + pass + "</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

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


exports.register = function(request, response) {
    response.send(render('register'));
}
exports.home = function(request, response) {
    if(!request.session.user) {
        response.redirect('/login/');
    } else {
        response.send(render("home", `Your type of status: ${request.session.user.status}</br>`));
    }

}


exports.index = function(request, response) {
    if(!request.session.user) {
        response.send(render('ind', false));
    } else {
        response.send(render("home", false));
    }
}

exports.done = function(request, response) {
    response.redirect("/done.html");
}

exports.logout = async function(request, response) {

    request.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        response.redirect('/login');
    });

}



exports.reminder = async function(request, response) {
    if(request.method === 'GET') {
        response.send(render('reminder'));
    } else {
        let user = new User();
        let result = await user.getList({
            email: request.body.email
        });
        let message = "";
        if(result.length > 0) {
            sendEmail(result[0].email, result[0].password);
            message = "<div class='success-box'>Your password was sent on your email</div>";
        } else {
            message = "<div class='error-box'>We have not such email</div>";
        }
        response.send(render(
            'reminder',
            {text: message})
        );
    }
}
