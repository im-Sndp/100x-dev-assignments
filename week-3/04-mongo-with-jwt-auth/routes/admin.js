const { Router } = require("express");
const jwt = require("jsonwebtoken");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();
const {JWT_secret} = require("../config")

// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password =  req.body.password;

    Admin.create({
        username: username,
        password: password
    }).then(()=>{
        res.status(200).json({
            msg: "Admin created successfully"
        })
    })
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password =  req.body.password;

    const user = await Admin.find({
        username,
        password
    })

    if(user){
        const token = jwt.sign({
            username
        },JWT_secret);

        res.status(200).json({
            token
        })
    }
    else{
        res.status(411).json({
            msg: "Incorrect username and password"
        })
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title = req.body.title; 
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;

    Course.create({
        title: title,
        description: description,
        price: price,
        imageLink: imageLink
    }).then(()=>{
        res.status(200).json({
            msg: "Course created successfully"
        })
    })
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic

    const courses = await Course.find({});

    res.status(200).json({
        courses: courses
    });
});

module.exports = router;