const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    task: String,
    done: {
        type: Boolean,
        default: false
    }
});

const UserModel = mongoose.model("employees", UserSchema);
module.exports = UserModel;
