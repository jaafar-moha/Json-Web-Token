const Users = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');


const userCtrl = {
    register: async (req, res) => {
        try {
            const {name, email, password} = req.body
            if(!name || !email || !password)
                return res.status(400).json({msg: "Please fill in all fields."})
        
            const user = await Users.findOne({email})
    
            if(user) return res.status(400).json({msg: "This email already exists."})

            if(password.length < 6)
                return res.status(400).json({msg: "Password must be at least 6 characters."})

            const passwordHash = await bcrypt.hash(password, 12)

            const newUser =  new Users ({
                name, email, password: passwordHash
            })

            await newUser.save()
                
            res.json({msg: "your account has been successfully"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    login: async (req, res) => {
        try {
            const {email, password} = req.body
            const user = await Users.findOne({email})
            if(!user) return res.status(400).json({msg: "This email does not exist."})

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})

            const refresh_token = createAccessToken(
                {id: user._id,
                role: user.role,
                name: user.name,
                email: user.email}
                )
                console.log(refresh_token)
                res.cookie('refreshtoken', refresh_token, {
                    httpOnly: true,
                    maxAge: 7*24*60*60*1000 // 7 days
                })

            res.json({msg: "Login success!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
}

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})
}


module.exports =  userCtrl