import router from "./login.js";

const jwt = require ("jsonwebtoken");
const express = require('express');
const bcrypt = require('bcrypt.js');
const Record = require('../models/record.js');
const User = require('../models/user.js');

const router = express.Router();
// register
router.get("/register", async (req, res) => {
    const {username, password} = req.body;

    try{
        let user = await User.findOne({username});
        if (user) {
            return res.status(400).json({msg: 'User already exists'});
        }
        user = new User({
            username,
            password: await bcrypt.hash(password, 10)
        });

        await user.save();
        res.status(201).json({msg: 'User registered successfully'});
    } catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// login
router.post('/login', async(req, res) => {
    const{username, password} = req.body;

    try{
        const user = await User.findOne({username});

        if(!user){
            return res.status(400).json({msg: 'Invalid creds'});
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({msg: 'Invalid creds'});
        }
        const payload = {userID: user.id};
        const token = jwt.sign(payload, 'your_jwt', {expiresIn: '1h'});
        res.json({token});
    } catch (err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
/*user model = ticketModel
- const userSchema

- there's one for tickect count
- login and signup has none yet
    - login has hashed pass


*/
//const ({username, password});
module.exports = router