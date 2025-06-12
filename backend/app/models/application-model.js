const mongoose = require('mongoose')
const { Schema, model } = mongoose

const applicationSchema = new Schema({
    jobId: {
        type: Schema.Types.ObjectId,
        ref: 'Job'
    },
    candidateId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    coverLetter: String,
    status:{
        type: String,
        default: 'submitted'
    },
    applicationDate: Date,
    additionalInfo: String
}, { timestamps: true} )

const Application = model('Application', applicationSchema)
module.exports = Application