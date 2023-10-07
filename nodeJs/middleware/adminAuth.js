const jwt = require('jsonwebtoken')
const userData = require('../model/userModel')


async function adminAuth(req,res,next){

    try {
        
        const authorization = req.headers['authorization']
        if(!authorization) throw new Error('Authorization header required')
        const token = authorization.replace('Bearer ','')
        const decrypted = jwt.verify(token,"adminSecrectkey")
        if(!decrypted.id) throw new Error('')
        const user = await userData.findById({_id:decrypted.id})
        if(!user) throw new Error('user not found')
        if(!user.is_admin) throw new Error('Access restricted')
        req.user = user
        next()

    } catch (error) {
        console.log(error.message);
    }

} 

module.exports = adminAuth