const User = require('../models/user')
const shortId = require('shortid')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

exports.signup = (req, res) => {
   User.findOne({email: req.body.email}).exec((err, user) =>{
       if (user) {
           return res.status(400).json({
               err : 'L\'e-mail est pris'
           })
       }
       //
       const {name, email, password} = req.body
       let username = shortId.generate()
       let profile = `${process.env.CLIENT_URL}/profile/${username}`

       //

       let newUser = new User({name, email, password, profile, username})
       newUser.save((error, success) =>{
           if (error) {
               return res.status(400).json({
                    err : error
               })
           }

           res.json({
               message: 'Inscription réussie ! Veuillez vous connecter'
           })
       })

   })
}

exports.signin = (req, res) => {
    const { email, password } = req.body;
    // check if user exist
    User.findOne({ email }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User with that email does not exist. Please signup.'
            });
        }
        // authenticate
        if (!user.authenticate(password)) {
            return res.status(400).json({
                error: 'Email and password do not match.'
            });
        }
        // generate a token and send to client
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie('token', token, { expiresIn: '1d' });
        const { _id, username, name, email, role } = user;
        return res.json({
            token,
            user: { _id, username, name, email, role }
        });
    });
};


exports.signout = (req, res) =>{
    res.clearCookie('token')
    res.json({
        message: 'Signout success'
    })
}

