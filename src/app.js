const path=require('path');
const express = require('express');
var mysql = require('mysql')

const app=express();
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
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
    connection.query(`SELECT * from students where RegNo='${username}';`, function (err, rows, fields) {
        if(!err){
			if(rows.length>0){
				if(rows[0].RegNo && rows[0].Password && rows[0].Password==password){
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
    if(req.query.submit){
        res.redirect("/user");
    }
    else{
        res.render('instructions');
    }
})

app.get('/user', (req,res)=>{
    res.render('allotment');
})

app.get('/confirmation', (req,res)=>{
    res.render('confirmation');
})


app.listen(3000, ()=>{
    console.log("started");
})