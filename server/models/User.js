// Dependencies
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({

    username: {
        type: String,
        required: true,
        minlength: [3, "Username must be more than 3 characters"],
        maxlength: [20, "Username cannot be longer than 20 characters."],
        unique: true
    },
    emailAddress: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Your password should be at least 6 characters."]
    },
    // image: String
},
    {
        timestamps: true
    }
)


    // verifyPassword
    userSchema.methods.verifyPassword = function(password){
        // console.log(password);
        // console.log(this.password);
        return bcrypt.compareSync(password, this.password);
    }

const User = mongoose.model("User", userSchema);

module.exports = User;