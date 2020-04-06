require('dotenv').config()
const secret = process.env.JWT_TOKEN
const jwt = require('jsonwebtoken')

const User = require('../models/user')

const withAuth = (req, res, next) => {
    const token = req.headers['access-token']
    if(!token)
    res. status(401).json({error: 'No token provider'})
    else{
        jwt.verify(token, secret, function(err, decoded) {
            if(err)
            res. status(401).json({error: 'Unauthorizd: Token invalid'})
            else{
                req.email= decoded.email
                User.findOne({email:decoded.email})
                .then(user => {
                    req.user = user
                    next()
                })
                .catch(err => {
                    res.status(401).json({error:err})
                })
            }

        })
    }

}
module.exports = withAuth

