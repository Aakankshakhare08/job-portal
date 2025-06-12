const { validationResult } = require('express-validator')
const _ = require('lodash')
const Application = require('../models/application-model')
const applicationsCltr = {}

applicationsCltr.create = async(req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()})
    }
    const body = _.pick(req.body,['additionalInfo', 'coverLetter', 'applicationDate'])
    try{
        const application = new Application(body)
        application.candidateId = req.user.id 
        application.jobId = req.params.jobId
        await application.save()
        res.status(201).json(application)
    } catch(err){
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error'})
    }
}

applicationsCltr.myApplications = async(req,res) => {
    try{
        const applications = await Application.find({ candidateId: req.user.id}).sort({ applicationDate: -1})
        res.json(application)
    } catch(err){
        res.status(500).json({ error: 'Internal Server Error'})
    }
}

module.exports= applicationsCltr