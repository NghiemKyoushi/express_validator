const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { validationResult } = require("express-validator");

const signUp = async (req, res) => {
    const {username , password} = req.body;
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(422).jsonp(error.array())
    }
    const findUser = await User.findOne({username});
    if (findUser) {
        return res.status(400).json({
            success: false,
            message: "Username has already been taken"
        })
    }
    const hash = await bcrypt.hash(password, 10);
    const createUser = new User({
        username: username,
        password: hash
    })
    await createUser.save();
    await res.status(200).json({
        success: true,
        message: "Sign up successfully"
    })
}

const login = async (req, res) => {
    const {username, password} = req.body;
    
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(422).jsonp(error.array())
    }

    const findUser = await User.findOne({username});
    if (!findUser) {
        return res.status(400).json({
            success: false,
            message: "Username is not valid"
        })
    }
    const checkPassword = await bcrypt.compare(password, findUser.password )
    if (!checkPassword) {
        return res.status(400).json({
            success: false,
            message: "Password is wrong"
        });
    }
    return res.json({
        success: true,
        message: "Login successfully",
        accessToken
    });
}

exports.signUp = signUp;
exports.login = login;