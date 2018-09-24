const User = require('./../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

module.exports = {

    register: function (req, res) {

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })

        newUser.save(function (err, data) {

            if (!err) {
                res.status(201).json({
                    success: true,
                    message: `Account ${req.body.name} registered`,
                    data: data
                })
            } else {
                res.status(500).json({
                    msg: err.message
                })
            }
        })
    },


    login: function (req, res) {
        let input = {
            email: req.body.email
        }

        User.findOne(input, function (err, data) {
            if (err) {
                res.status(500).json({
                    msg: "Invalid email or password"
                })
            } else if (data === null || data === undefined) {
                res.status(404).json({
                    msg: "Not a valid email"
                })
            } else {
                let isPasswordValid = bcrypt.compareSync(req.body.password, data.password);
                if (isPasswordValid) {
                    jwt.sign({
                        _id: data._id,
                        name: data.name,
                        email: data.email,                       
                    }, process.env.JWT_SECRET, function (err, token) {
                        console.log(token)
                        res.status(200).json({
                            token:token
                        })
                    })
                } else {
                    res.status(403).json({
                        msg: "username/pass invalid"
                    })
                }
            }
        })
    },
}