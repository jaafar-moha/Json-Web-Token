const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please enter your name!"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please enter your email!"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter your password!"]
    },
    role: {
        type: String,
        default: "user",
        enum : ["user", "admin", "tech"],
    },
},{
    timestamps: true
})


module.exports = model("Users", userSchema)