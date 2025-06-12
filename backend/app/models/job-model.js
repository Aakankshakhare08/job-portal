const mongoose = require ('mongoose')
const { recruiter } = require('../../utils/role')
const  { Schema, model } =  mongoose
const jobSchema = new Schema({
    title: String,
    description: String,
    skills: [String],
    location: String,
    salary:{
      min: Number,
      max: Number
    },
    recruiterId:{
       type:Schema.Types.ObjectId,
       ref: 'User' //population topic
    },  
    deadline: Date
}, { Timestamps: true})

const Job = model('Job', jobSchema)
module.exports = Job
