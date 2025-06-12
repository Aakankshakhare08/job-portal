//const { Error } = require("mongoose")
//const { isNumeric } = require("validator")
const Job = require('../models/job-model')

const jobValidationSchema = {
    title: {
        notEmpty: {
            errorMessage: 'title is required'
        }
    },
    description: {
        notEmpty: {
            errorMessage: 'description is required'
        }
    },
    skills:{
        custom: {
            options: function(value){
                if(!Array.isArray(value)){
                    throw new Error('skill should be array')
                }
                if(value.length == 0){
                    throw new Error('must contain atleast one skill')
                }
                if(value.every(ele => typeof ele != 'string')){
                    throw new Error('skill should be a string')
                }
                return true
            }
        }
    },
    location: {
        notEmpty: {
            errorMessage: 'Location is required'
        }
    },
    'salary.min': {
        notEmpty: {
            errorMessage: 'minnimum value is required'
        },
        isNumeric: {
            errorMessage: 'it should be number'
        }
    },
    'salary.max': {
        notEmpty: {
            errorMessage: 'maximum value is required'
        },
        isNumeric: {
            errorMessage: 'it should be number'
        },
        custom:{
            options: function(value ,{req}){
                if(value<req.body.salary.min){
                    throw new Error('max should be greater than min')
                }
                return true
            }
        }
    },
    deadline: {
        notEmpty: {
        errorMessage: 'Deadline is required'
        },
        isDate: {
            errorMessage: 'should be a valid date format'
        },
        custom:{
            options: function(value){
                if(new Date(value) < new Date()){
                    throw new Error('deadline cannot be less than today')
                }
                return true
            }
        }
    }

}
module.exports = jobValidationSchema