const express = require ('express')
const Router = express.Router()

const { 
    createPost,
    getPostDetails,
    updatePostDetails,
    deletePostDetails
} = require('../controllers/postController')


//The Route for creating an account
Router.post('/api/post/new', createPost)

//route for getting an account details
Router.get('/api/post/post', getPostDetails)

//route for updating an account details
Router.put('/api/post/update', updatePostDetails)

//route for deleting an account
Router.delete('api/post/delete', deletePostDetails)

module.exports = Router