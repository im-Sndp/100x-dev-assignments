const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.json());
app.use(bodyParser.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

const adminAuthentication = (req,res,next)=>{
  const username = req.headers.username;
  const password = req.headers.password;
  var check = false;
  ADMINS.forEach((userData)=>{
    if ( userData.username == username && userData.password == password ){
      check = true;
    }
  });
  if (check){
    next();
  }
  else{
    res.status(403).json({message:"Admin not found."});
  }
}

const userAuthentication = (req,res,next)=>{
  const username = req.headers.username;
  const password = req.headers.password;
  var check = false;
  
  USERS.forEach((user)=>{
    if(user.username == username && user.password == password){
      check = true;
    }
  })
  if (check){
    next();
  }
  else{
    res.status(403).json({message:"user not found."})
  }
  
}

// Admin routes
app.post('/admin/signup', (req, res) => {
  // logic to sign up admin
  var {username , password} = req.headers;
  var check = false;
  ADMINS.forEach((admin)=>{
    if ( admin["username"] == username ){
      check = true;
    }
  });
  if (check){
    res.status(403).json({message : "admin already exist."})
  }
  else{
    var userData = {
      username : username,
      password : password
    }
    ADMINS.push(userData);
    res.status(200).json({message : 'Admin created successfully'})
  }
});
 
app.post('/admin/login', adminAuthentication ,(req, res) => {
  // logic to log in admin
  res.status(200).json({message:"Logged in successfully"})
});

app.post('/admin/courses', adminAuthentication , (req, res) => {
  // logic to create a course
  var course = req.body;
  course.id =  Date.now();
  COURSES.push(course);
  res.status(200).json({message: 'Course created successfully', courseId: course.id})
});

app.put('/admin/courses/:courseId', adminAuthentication , (req, res) => {
  // logic to edit a course
  var courseId = req.params.courseId;
  var check = false;
  var i = 0 ;
  COURSES.forEach((course)=>{
    if(course.id == courseId){
      COURSES[i] = req.body;
      COURSES[i].id = courseId;
      check = true;
    }
    i+=1
  })
  if (check){
    res.status(200).json({message : "Course updated successfully"});
  }
  else{
    res.status(404).json({message: "Course not found"})
  }
});

app.get('/admin/courses', adminAuthentication ,(req, res) => {
  // logic to get all courses
  res.status(200).json({course:COURSES})
});

// User routes
app.post('/users/signup', (req, res) => {
  // logic to sign up user
  var {username  , password} = req.headers;
  check = true;
  USERS.forEach((user)=>{
    if (user.username == username ){
      check = false;
    }
  })
  if (check){
    user = {"username" : username,
            "password" : password,
            "purchasedCourses" : []
            }
    USERS.push(user)
    res.status(200).json({message:"User created successfully"})
  }
  else{
    res.status(403).json({message:"user already exist"})
  }
});

app.post('/users/login', userAuthentication , (req, res) => {
  // logic to log in user
  res.status(200).json({message:"Logged in successfully"})
});

app.get('/users/courses', userAuthentication , (req, res) => {
  // logic to list all courses
  res.status(200).json({course : COURSES})
});

app.post('/users/courses/:courseId', userAuthentication ,(req, res) => {
  // logic to purchase a course
  var check = true;
  COURSES.forEach((course)=>{
    if(course.id == req.params.courseId){
      user.purchasedCourses.push(course);
    }
  })

  if (check){
    res.status(200).json({message:"Course purchased successfully"})
  }
  else{
    res.status(403).json({message:"Course not found"})
  }
});

app.get('/users/purchasedCourses', userAuthentication , (req, res) => {
  // logic to view purchased courses
  res.status(200).json({purchasedCourses:user.purchasedCourses});
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
