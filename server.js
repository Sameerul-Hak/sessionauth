const express = require('express');
const app = express();
const cors = require('cors');
const sessions = require('express-session');
const cookieParser = require("cookie-parser");
app.use(cors())
    app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie parser middleware
app.use(cookieParser());
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));

const myusername = 'user1'
const mypassword = 'mypassword'

// a variable to save a session
var session;


app.get('/',(req,res) => {
    session=req.session;
    if(session.userid){
        res.send("Welcome User <a href=\'/logout'>click to logout</a>");
    }else
    {
        return res.status(400).json({ message: 'login pannu' });
    }
    // res.sendFile('views/index.html',{root:__dirname})
});

// Routes
app.get("/", (req, res) => {
  return res.json({ message: 'msg from bckend' });
});
app.post('/user',(req,res) => {
    if(req.body.username == myusername && req.body.password == mypassword){
        session=req.session;
        session.userid=req.body.username;
        console.log(req.session)
        res.send(`Hey there, welcome <a href=\'/logout'>click to logout</a>`);
    }
    else{
        res.send('Invalid username or password');
    }
})

app.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});
// Connection
const PORT = 5000
app.listen(PORT, ()=>{
    console.log('App running in port: '+PORT)
})