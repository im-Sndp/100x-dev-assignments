const mongoose =  require("mongoose");
const dotenv = require('dotenv');

dotenv.config();
mongoose.connect(process.env.MONGOOSE_URL);

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    description: String,
    interest: Array,
})

const User = mongoose.model("User",userSchema);

module.exports = {
    User
}