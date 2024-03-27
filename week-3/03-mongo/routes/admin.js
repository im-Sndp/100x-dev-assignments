const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin , Course } = require("../db");
const router = Router();

// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    Admin.create({
        username: username,
        password: password
    }).then(()=>{
        res.json({
            message : "Admin created Successfully"
        })
    })
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic

    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;

    const course = await Course.create({
        title: title,
        description: description,
        price: price,
        imageLink : imageLink
    })

    res.status(200).json({
        msg: "Course created successfully",
        courseId: course._id
    })

});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic

    const response = await Course.find({});

    res.json({
        courses: response
    })
});

module.exports = router;