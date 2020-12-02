const express = require ('express')
const Router = express.Router()

const { 
    createUser,
    getUserDetails,
    updateUserDetails,
    deleteUserDetails
} = require('../controllers/userController')


//The Route for creating an account
Router.post('/api/user/new', createUser)

//route for getting an account details
Router.get('/api/user/username', getUserDetails)

//route for updating an account details
Router.put('/api/user/update', updateUserDetails)

//route for deleting an account
Router.delete('api/user/delete', deleteUserDetails)

module.exports = Router