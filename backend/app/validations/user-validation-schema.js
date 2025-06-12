const User = require('../models/user-model')//bcz we are finding the record in db
const roles = require('../../utils/role')

const userRegisterSchema = {
    username: {
        notEmpty: {
            errorMessage: 'username is required'
        },
        trim: true
    },
    email: {
        notEmpty: {
            errorMessage: 'email is required'
        },
        isEmail: {
            errorMessage: 'email should be in a valid format'
        },
        custom: {   // custom validation - business logic
            options: async function(value){
                const user = await User.findOne({ email: value })
                if(!user){
                    return true
                }else{
                    throw new Error('Email already exists')
                }
            }
        },
        trim: true,
        normalizeEmail: true
    },
    password: {
        notEmpty: {
            errorMessage: 'password is required'
        },
        isLength: {
            options: { min: 8, max: 128},
            errorMessage: 'password should be between 8 - 128 characters'
        },
        trim: true
    },
    role: {
        notEmpty: {
            errorMessage: 'role is required'
        },
        isIn:{
            options: [[roles.candidate, roles.recruiter]],
             errorMessage: 'role should either be a candidate or recruter '
        }
    }

}

const userLoginSchema = {
    email: {
        notEmpty: {
            errorMessage: 'email is required'
        },
        isEmail: {
            errorMessage: 'email should be a valid format'
        },
        trim: true,
        normalizeEmail: true
    },
    password: {
        notEmpty: {
            errorMessage: 'password is required'
        },
        isLength: {
            options: { min: 8, max: 128},
            errormessage: 'password should be between 8 - 128 characters long'
        },
        trim: true
    }
}

//const userLoginSchema = {}

module.exports = {
    userRegisterSchema,  //es6- object name and variable name same,we can use variable name.
    userLoginSchema
    //userLoginSchema: userLoginSchema - es5
}