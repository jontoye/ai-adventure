// Dependencies
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const findOrCreate = require('mongoose-findorcreate');

const userSchema = mongoose.Schema({

    googleId:{
        type: String
    },

    username: {
        type: String,
        required: true,
        minlength: [3, "Username must be more than 3 characters."],
        maxlength: [20, "Username cannot be longer than 20 characters."],
        unique: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email."
        },
    },
    // image: String
},
    {
        timestamps: true
    }
)


const GoogleUser = mongoose.model("GoogleUser", userSchema);

module.exports = GoogleUser;