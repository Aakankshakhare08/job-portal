const Job = require('../models/job-model')
const Application = require('../models/application-model')
const { validationResult }  =  require('express-validator')
const jobsCltr = {}

jobsCltr.create = async(req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()})
    }
    const { body } = req
    try{
      const job = new Job(body)
      job.recruiterId = req.user.id
      await job.save()
      res.status(201).json(job)
    } catch(err){
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error'})
    }
}

jobsCltr.list = async(req,res) => {
    try{
      const jobs = await Job.find().sort({createdAt: -1})
      res.json(jobs)
    } catch(err){
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error'})
    }
}

jobsCltr.myjobs = async(req,res) => {
    try{
       const jobs = await Job.find({recruiterId: req.user.id}).sort({createdAt: -1})
       res.json(jobs)
    } catch(err){
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error'})
    }
}

jobsCltr.update = async(req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const id = req.param.id
    const body = req.body
    try{
    const job = await Job.findOneAndUpdate({_id: id, recruiterId:req.user.id}, body, {new: true})
    res.json(job)
    }catch(err){
        consolelog(err)
        res.status(500).json({ error: 'Internal Server Error'})
    }
}

jobsCltr.delete =  async(req,res) => {
    const id = req.param.id
    try{
      const job = await Job.findOneAndDelete({_id: id, recruiterId: req.user.id})
    } catch(err){
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error'})
    }
}

jobsCltr.listApplications = async(req,res) => {
    const id = req.params.id
    try{
        const job = await Job.findOne({_id: id, recruiterId: req.user.id})
        if(!job){
            return res.status(404).json({error: 'job not found'})
        }
        const applications = await Application.find({jobId: job._id})
        res.json(applications)
    } catch(err){
        res.status(500).json({error: 'Internal Server Error'})
    }
}
module.exports = jobsCltr