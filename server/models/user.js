import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true}, // user unique
    password: {type: String, required: true}      // different pass, know if someone else is also using your same pass
    });
    // connect
    module.exports = mongoose.model('User', userSchema);