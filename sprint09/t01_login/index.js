const express = require('express');
const db = require('./db');
const app = express();
const userRouter = express.Router();
const session = require('express-session');

app.use(express.urlencoded({extended: true}));
app.use(session({secret: 'hsjhjgkdfjgksj', saveUninitialized: true, resave: true, user: {}}));
app.use('/', express.static(__dirname + '/public'));

userRouter.use("/home", db.home);
userRouter.post("/validate", db.addUser);
userRouter.post("/create", db.addUser);


app.use("/done", db.done);
app.use("/user", userRouter);
app.get("/logout", db.logout);
app.use("/login", db.login);
app.get("/register", db.register);
app.use("/", db.index);

app.use(function (req, res, next) {
    res.status(404).send("Not Found");
});

app.listen(process.env.PORT || 3000, "127.0.0.1",() => {
    console.log("Port of app = " + (process.env.PORT || 3000));
});
