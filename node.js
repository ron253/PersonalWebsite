'use strict'
require('dotenv').config()

const express = require("express");
const bodyParser = require("body-parser");
const {body, check, validationResult} = require('express-validator');
const nodemailer = require("nodemailer");
const app = express()

app.use(express.static("public"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
})

app.get("/about.html", function(req,res) {
  res.sendFile(__dirname + "/about.html")
})

app.get("/index.html", function(req,res){
  res.sendFile(__dirname + "/index.html")
})

app.get("/contact.html", function(req,res){
  res.sendFile(__dirname + "/contact.html")
})

app.get("/projects.html", function(req,res){
  res.sendFile(__dirname + "/projects.html")
})

app.post("/", function(req, res) {
  res.sendFile(__dirname + "/about.html")
})

app.post("/contact.html", [
  check('email', 'Please input a valid E-mail').isEmail(),
  body('msg').trim().escape(),
  body('fName').trim().escape(),
  body('lName').trim().escape()
],
function (req, res) {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    res.json(errors)
  }
  else {
    let transport = nodemailer.createTransport({
      host: process.env.DB_HOST,
      port:process.env.DB_PORT,
      secure:false,
      requireTLS:true,
      auth:{
        user:process.env.DB_USER,
        pass: process.env.DB_PASS,
      }
    });

    let mailDetails = {
      from: "Unknown",
      to:process.env.DB_USER,
      subject:'Form Submission',
      html: `<h1><u>Incoming Message</u><h1> <br>
      <h1> Name: ${req.body.fName + " " + req.body.lName} <h1> <br>
      <h1> E-mail: ${req.body.email} <h1> <br>
      <h1> Message: ${req.body.msg} <h1> `
    };

    transport.sendMail(mailDetails, function (error, info){
      if(error) {
        console.log(error.message)
      }
      else {
        res.sendFile(__dirname + "/success.html");
      }
    });
  }


})

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running.")
})
