const mongoose = require('mongoose');
//create mongoose model for users data in mongo db

const axios = require('axios').default;
//promise based http client for browser/node.js

const bcrypt = require('bcryptjs');
//needed to encrypt password and keep secret in database

var userSchema = new mongoose.Schema({
    //none are optional -> data must be inputed
    fullName: {
        //Name doesn't have to follow any convention (first name/last name etc)
        type: String,
        required: 'Name is required.'
    },
    userName: {
        type: String,
        required: 'Username is required.',
        //should be unique, people can have same name/address/password
        unique: true
    },
    address: {
        type: String,
        required: 'Address is required. Must be US.' 
    },
    //will be altered when stored in database to protect user privacy
    password: {
        type: String,
        required: "Password is required.",
        minlength : [6, "Password must be atleast 6 characters long"]
    },
    confPassword: {
        type:String,
        required: "Please confirm password"
    },
    // not assigned in client side
    saltSecret: String,
    latCoord: Number,
    lngCoord: Number
});


//validation for password specifications other than minLength
userSchema.path('password').validate((val) => {
    if(val.toLowerCase() === val || /^[a-zA-Z]+$/.test(val)) {
        return false;
    }
    else {
        return true;
    }
}, 'Password must have atleast 1 uppercase letter and 1 non-letter');

//pre-event from bcrypt
//invoked before save operation and generates saltSecretet in User
userSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.confPassword = hash; //would have already checked confPassword === password
            this.saltSecret = salt;
            next();
        });
    });    
});
       
//created 'User' mongoose model
mongoose.model('User', userSchema);
