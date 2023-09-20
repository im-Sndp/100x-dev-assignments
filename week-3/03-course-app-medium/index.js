const express = require('express');
const bodyParser  = require('body-parser');
const fs = require('fs');
const { error } = require('console');

const app = express();

app.use(express.json());
app.use(bodyParser.json());

let ADMINS = "./databse/admins.json";
let USERS = "./databse/users.json";
let COURSES = "./databse/courses.json";

// Admin routes
app.post('/admin/signup', (req, res) => {
  // logic to sign up admin
  fs.readFile(ADMINS,'utf-8',(error,data)=>{
    if(error){
      res.status(403).json({message:"Error reading the file."})
    }
    else{
      res.status(200).json({data:data})
    }
  })
});

app.post('/admin/login', (req, res) => {
  // logic to log in admin
});

app.post('/admin/courses', (req, res) => {
  // logic to create a course
});

app.put('/admin/courses/:courseId', (req, res) => {
  // logic to edit a course
});

app.get('/admin/courses', (req, res) => {
  // logic to get all courses
});

// User routes
app.post('/users/signup', (req, res) => {
  // logic to sign up user
});

app.post('/users/login', (req, res) => {
  // logic to log in user
});

app.get('/users/courses', (req, res) => {
  // logic to list all courses
});

app.post('/users/courses/:courseId', (req, res) => {
  // logic to purchase a course
});

app.get('/users/purchasedCourses', (req, res) => {
  // logic to view purchased courses
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
