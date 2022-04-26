// Dependencies
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const findOrCreate = require('mongoose-findorcreate');

const userSchema = mongoose.Schema({
    
    username: {
        type: String,
        required: true,
        minlength: [3, "Username must be more than 3 characters."],
        maxlength: [20, "Username cannot be longer than 20 characters."],
        unique: true,
    },
    emailAddress: {
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
    password: {
        type: String,
        required: true,
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

    userSchema.plugin(findOrCreate);

const User = mongoose.model("User", userSchema);

module.exports = User;