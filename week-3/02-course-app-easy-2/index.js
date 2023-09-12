const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')

const app = express();

app.use(express.json());
app.use(bodyParser.json())

let ADMINS = [];
let USERS = [];
let COURSES = [];
const secretKey = "MY_SECRET_KEY"

const adminAuthentication = (req,res,next)=>{
  var token = req.headers.token;
  var check = true;
  jwt.verify(token,secretKey,(error,data)=>{
    if(error){
      res.status(403).json({message:"Invalid token"})
    }
    else{
      ADMINS.forEach((admin)=>{
        if (admin.username == data.username){
          check = false;
          next();
        }
      })
    }
  })
  if(check){
    res.status(403).json({message:"Invalid login token"})
  }
}

const userAuthentication = (req,res,next)=>{
  var token = req.headers.token;
  jwt.verify(token,secretKey,(error,data)=>{
    if(error){
      res.status(403).json({message:"Error while validation token"})
    }
    else{
      var check = true;
      USERS.forEach((user)=>{
        if(user.username == data.username){
          check = false;
          next();
        }
      })
      res.status(403).json({message:"User not  found"})
    }
  })
}

// Admin routes
app.post('/admin/signup', (req, res) => {
  // logic to sign up admin
  const {username , password} = req.headers;
  var check = true;
  
  ADMINS.forEach((admin)=>{
    if(admin.username == username){
      res.status(403).json({message:"Admin already  exist"})
      check = false;
    }
  })

  if (check){
    var data = {username : username,password : password}
    ADMINS.push(data)
    var token = jwt.sign({username:username},secretKey)
    res.status(200).json({message:"Login successful",token : token})
  }
});


app.post('/admin/login', (req, res) => {
  // logic to log in admin
  var {username , password} = req.headers;
  var check = true;
  ADMINS.forEach((admin)=>{
    if (admin.username == username && admin.password == password){
      var token = jwt.sign({username:username},secretKey)
      check  = false;
      res.status(200).json({message:"Login successful", token : token })
    }
  })
  if  (check){
    res.status(200).json({message:"Invalid credentials."})
  }
});

app.post('/admin/courses', adminAuthentication , (req, res) => {
  // logic to create a course
  var course = req.body;
  course.id = Date.now();
  COURSES.push(course)
  res.status(200).json({message: "Course created successfully", id : course.id})
});

app.put('/admin/courses/:courseId', adminAuthentication ,(req, res) => {
  // logic to edit a course
  var courseId = req.params.courseId;
  var check = false;
  var i = 0;
  COURSES.forEach((course)=>{
    if (course.id == courseId){
      COURSES[i] = req.body;
      COURSES[i].id = courseId;
      check = true;
    }
    i+=1
  })

  if (check){
    res.status(200).json({message:"Course updated successfully"})
  }
  else{
    res.status(403).json({message:"Invalid course id"})
  }
});

app.get('/admin/courses', adminAuthentication ,(req, res) => {
  // logic to get all courses
  res.status(200).json({courses:COURSES})
});

// User routes
app.post('/users/signup', (req, res) => {
  // logic to sign up user
  var {username,password} = req.body;
  var check = true;
  USERS.forEach((user)=>{
    if(user.username == username){
      check = false;
    }
  })

  if(check){
    user = {
      username : username,
      password : password,
      purchasedCourses : []
    }
    USERS.push(user);
    var token = jwt.sign({username:username},secretKey) 
    res.status(200).json({message:"Sign up successful.",token : token})
  }
  else{
    res.status(403).json({message:"User already exist"})
  }
});

app.post('/users/login', (req, res) => {
  // logic to log in user
  var {username , password} = req.headers;
  var check = true;
  USERS.forEach((user)=>{
    if (user.username  == username && user.password == password){
      var token = jwt.sign({username:username},secretKey)
      check = false;
      res.status(200).json({message:"Login successful",token:token})
    }
  })
  if (check){
    req.status(403).json({message:"Invalid credentials."})
  }
});

app.get('/users/courses', userAuthentication  ,(req, res) => {
  // logic to list all courses
  res.status(200).json({courses:COURSES})
});

app.post('/users/courses/:courseId', userAuthentication ,(req, res) => {
  // logic to purchase a course
  var courseId = req.params.courseId;
  var username = jwt.verify(req.headers.token,secretKey).username
  var check = false;
  COURSES.forEach((course)=>{
    if(course.id == courseId){
      var i = 0;
      USERS.forEach((user)=>{
        if(user.username == username){
          USERS[i].purchasedCourses.push(course)
          check =true;
        }
        i+=1;
      })
    }
  })
  if (check){
    res.status(200).json({message:"Course purchased successful"})
  }
  else{
    res.status(403).json({message:"Course id not valid"})
  }
});

app.get('/users/purchasedCourses', userAuthentication , (req, res) => {
  // logic to view purchased courses
  var username = jwt.verify(req.headers.token,secretKey).username;
  USERS.forEach((user)=>{
    if(user.username == username){
      res.status(200).json({courses:user.purchasedCourses})
    }
  })
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
