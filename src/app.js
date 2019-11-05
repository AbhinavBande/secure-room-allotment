const path=require('path');
const express = require('express');
var mysql = require('mysql');
var cookieParser = require('cookie-parser');
var session = require('express-session');
const bcrypt = require('bcrypt');
const helmet = require('helmet');
const uuid = require('uuid/v4');

const app=express();
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(helmet())
app.use(express.json());
app.use(cookieParser());
app.use(session({
    genid: () => {
      return uuid() // use UUIDs for session IDs
    },
    secret: 'A8aasns776sabsh',
    resave: false,
    saveUninitialized: true,
    maxAge: Date.now() + (3600 * 1000)
  }))
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicDirectoryPath));

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'websecproj'
})

app.set('view engine', 'hbs');

app.get('', (req,res)=>{
    res.render('index');
})

app.post('', (req,res)=>{
    var username=req.body.username;
    var password=req.body.pass;
    var hash = bcrypt.hashSync(password, 10);
    connection.query(`SELECT * from students where RegNo=?;`,[username], function (err, rows, fields) {
        if(!err){
			if(rows.length>0){
				if(rows[0].RegNo && rows[0].Password && bcrypt.compareSync(password, rows[0].Password)){
                    req.session.user=rows[0].RegNo;
                    res.cookie('name', rows[0].RegNo);
					res.redirect('/instructions');
				}
				else{
					res.render("index", {status: "Invalid Details!!"});
				}
			}
			else{
				res.render("index", {status: "Invalid Details!!"});
			}
        }
    })
})

app.get('/instructions', (req,res)=>{
    if(req.cookies.name && req.session.user && req.cookies.name==req.session.user){
        if(req.query.submit){
            res.redirect("/user");
        }
        else{
            res.render('instructions');
        }
    }
    else{
        res.redirect("/");
    }

})

app.get('/user', (req,res)=>{
    if(req.cookies.name && req.session.user && req.cookies.name==req.session.user){
        username=req.cookies.name;
        connection.query(`SELECT * from students where RegNo=?;`,[username], function (err, rows, fields) {
            if(!err){
                if(rows.length>0){
                        data={ name: rows[0].Name, rank: rows[0].U_Rank, dept: rows[0].Department, cgpa: rows[0].CGPA, Regno: username};
                        res.render("allotment", data);
                }
            }
        })
    }
    else{
        res.redirect("/");
    }
})

app.post('/user', (req, res)=>{
    res.redirect("/confirmation");
})

app.get('/confirmation', (req,res)=>{
    if(req.cookies.name && req.session.user && req.cookies.name==req.session.user){
        username=req.cookies.name;
        connection.query(`SELECT * from students where RegNo=?;`,[username], function (err, rows, fields) {
            if(!err){
                if(rows.length>0){
                        data={ name: rows[0].Name, rank: rows[0].U_Rank, dept: rows[0].Department, cgpa: rows[0].CGPA, Regno: username};
                        res.render("confirmation", data);
                }
            }
        })
    }
    else{
        res.redirect("/");
    }
})

app.get('/logout',(req,res)=>{
    res.clearCookie('name');
    req.session.destroy();
    res.redirect("/");
})


app.listen(3000, ()=>{
    console.log("started");
})