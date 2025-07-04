const jwt = require('jsonwebtoken')
const authenticateUser = (req,res,next) =>{
    const token = req.headers['authorization']
    if(!token) {
        return res.status(401).json({ error: 'token is required'})
    }
    try{
        const tokenData = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {
            id: tokenData.id,
            role: tokenData.role
        }
        next()
    } catch(err){
        console.log(err)
        return res.status(401).json({ error: err.message })
    }
   /*if(true){
    const msg = 'hello world'
    req.msg = msg
    next()
   } else{
    res.send('error occured')
   } */
}

const authorizeUser = (permittedRoles) => {
    return (req,res,next) => {
        if(permittedRoles.includes(req.user.role)){
            next()
        } else{
            res.status(403).json({ error: 'you are not authorized to access this route'})
        }    
    }
}
module.exports = {
    authenticateUser: authenticateUser,
    authorizeUser: authorizeUser 
}