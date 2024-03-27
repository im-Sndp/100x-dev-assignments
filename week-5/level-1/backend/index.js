const express = require("express");
const cors = require("cors");
const {signUp} = require("./type");

const { User } = require("./db");


const PORT = 3000;

const app = express();
app.use(express.json())
app.use(cors())


app.post("/signup",async (req,res)=>{
    const createPayload = req.body;
    const parsePayload = signUp.safeParse(createPayload);

    if(!parsePayload.success){
        res.status(411).json({
            msg : "Wrong input"
        })
        return;
    }

    const emailValidate = await User.find({
        email : createPayload.email
    })
    if(emailValidate.length){
        res.status(411).json({
            msg : "Email already registered"
        })
        return
    }

    const response = await User.create({
        name: createPayload.name,
        email: createPayload.email,
        password: createPayload.password,
        description: createPayload.description,
        interest: createPayload.interest
    })

    return res.json({
        msg: "User created successfully"
    })
})

app.post("/signin",(req,res)=>{


})


app.listen(PORT,()=>{
    console.log(`Server listing at port ${PORT}`)
})
