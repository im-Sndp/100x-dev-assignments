const { Router } = require("express");
const jwt = require("jsonwebtoken");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const {JWT_secret} = require("../config");

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;

    User.create({
        username: username,
        password: password
    }).then(()=>{
        res.status(200).json({
            msg: "User created successfully"
        })
    })
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.headers.username;
    const password  = req.headers.password;

    const user = await User.find({
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
        res.status(403).json({
            msg: "User not found"
        })
    }
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const allCourses = await Course.find({});
    res.status(200).json({
        courses: allCourses
    })
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;

    User.updateOne({
        username: username
    },{
        "$push":{
            purchasedCourses: courseId
        }
    }).then(()=>{
        res.status(200).json({
            msg: "Course purchase successfully"
        })
    })


});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    console.log(req.username);
    const user = await User.findOne({
        username: req.username
    })

    const course = await Course.findOne({
        _id : {
            "$in" : user.purchasedCourses
        }
    })

    res.status(200).json({
        course : course
    })
});

module.exports = router