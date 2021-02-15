const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv/config');

//Get all Users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch(e){
        res.json(e);
    }
});

//Get a single user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.send(user); 
    } catch(e){
        res.json({message: "Couldn't find user"});
    }
});

//Post a new user
router.post('/', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = new User({
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email
        });

        const savedUser =  await user.save();
        res.json(savedUser);
    } catch(e) {
        res.json({ message: e})
    }
});

//User login
router.post('/login', async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    
    try{
        const match = await bcrypt.compare(req.body.password, user.password);
        const accessToken = jwt.sign(JSON.stringify(user), process.env.ACCESS_TOKEN_SECRET)
        if(match){
            res.json({ accessToken: accessToken });
        } else {
            res.json({ message: "Invalid Credentials" });
        }
    } catch(e) {
        res.json({ message: "Invalid Username" });
    }
});

//Update a user info
router.patch('/:id', async (req, res) => {
    try {
        const updatedUser = await User.updateOne(
            { _id: req.params.id },
            { $set: {
                username: req.body.username,
                password: req.body.password,
                email: req.body.email
            }});

        res.json(updatedUser);
    } catch(e) {
        res.json({  message: "Couldn't update user" });
    }
});

//Delete a user
router.delete('/:id', async(req, res) => {
    try {
        const deletedUser = await User.remove({_id: req.params.id});
        res.json(deletedUser);
    } catch(e) {
        res.json({ message: "Couldn't delete user"})
    }
});

//Authenticate the Token Middleware

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if( token == null ) return res.sendStatus(401)

    jwt.verify(token, proces.env.ACCESS_TOKEN_SECRET,  (err, user) => {
        if(err) return res.sendStatus(403)
        req.user = user;
        next();
    })
}

module.exports = router;