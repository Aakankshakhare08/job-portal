require('dotenv').config( )
const express = require ('express');
const cors = require('cors')
const { checkSchema } = require('express-validator')
const app = express();
const port = 3055
const configureDB = require('./config/db')
const usersCltr = require('./app/controllers/users-controller')
const jobsCltr = require('./app/controllers/jobs-controller')
const applicationsCltr = require('./app/controllers/applications-controller')
const { authenticateUser, authorizeUser } = require('./app/middlewares/auth')
const roles = require('./utils/role')

const { userRegisterSchema, userLoginSchema } = require('./app/validations/user-validation-schema')
const { applicationCreateSchema } = require('./app/validations/application-validation-schema')
const jobValidationSchema = require('./app/validations/job-validation-schema')

configureDB()

app.use(cors())
app.use(express.json())

app.post('/api/users/register', checkSchema(userRegisterSchema), usersCltr.register)
app.post('/api/users/login', checkSchema(userLoginSchema), usersCltr.login) 
app.get('/api/users/account', authenticateUser, usersCltr.account)

app.get('/api/jobs', jobsCltr.list)
app.post('/api/jobs',  authenticateUser, authorizeUser(['recruiter']), jobsCltr.create)
app.get('/api/jobs/my', authenticateUser, authorizeUser(['recruiter']), jobsCltr.myjobs)


app.post('/api/jobs/:jobId/apply', authenticateUser,authorizeUser(['candidate']), checkSchema(applicationCreateSchema), applicationsCltr.create)//apply for job
app.get('/api/applications/my',authenticateUser, authorizeUser(['candidate']), applicationsCltr.myApplications)//list all jobs applied by candidate
app.get('/api/jobs/:id/applications', authenticateUser, authorizeUser(['recruiter']), jobsCltr.listApplications)
/*app.post('/api/jobs', authenticateUser, authorizeUser([roles.recruiter]) ,(req,res) => {
    res.send('api to create job posting')
})

app.post('/api/jobs/apply', authenticateUser, authorizeUser([roles.candidate]), (req,res) => {
    res.status('api to apply job posting')
}) */



 /*app.get('/', (req, res) => {
    res.send('Hello from Express!');
 }); */

app.listen(port, () => {
    console.log('server running on port', + port)
});