const express = require('express')
const admin_Route = express()

const admincontroller = require('../controller/adminController')
const auth = require('../middleware/adminAuth')
admin_Route.post('/login',admincontroller.login)
admin_Route.get('/home',auth,admincontroller.home)
admin_Route.post("/delete",auth,admincontroller.deleteUser)
// admin_Route.put('/update',admincontroller.updateUser)
admin_Route.get('/userDetails',admincontroller.userDetails)
admin_Route.post('/userUpdate',auth,admincontroller.updateUser)
admin_Route.get('/tokenVerification',auth,admincontroller.tokenVerification)

module.exports = admin_Route