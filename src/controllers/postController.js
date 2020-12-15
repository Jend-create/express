const Post = require('../models/postModel')

function handleError(error){
    let err = { post: '', author: '', content: ''}

    if(error.message === 'incorrect post id.'){
        err.post = 'no post matches this search'
    }

    if(error.message === 'incorrect author name'){
        err.author = 'invalid author name'
    }

    if(error.message === 'inappropraite content'){
        err.content= 'Empty Search'
    }

    if(error.code === 11000){
        err.author= 'author name already taken'

        return err
    }
    
    if(error.message.includes('post validation failed')){

        Object.values(error.errors).forEach(({ properties }) => {
            err[properties.path] = properties.message
        })
    }

    return err
}

const postCtrl = {}

// create a post = POST method
postCtrl.createPost = async (req, res)=> {

    try{
        const newPost = new Post(req.body)
        let result = await newPost.save()
        res.status(200).send({message: 'Your posts have been successfully added', result})
            
        }
        catch (error){
            console.log(error.message)
            const warnings = handleError(error)
            res.status(400).json({warnings})

    }
}

// read all posts = GET method
postCtrl.getPostDetails = async (req, res) => {
    try{
        let postDetails = await Post.find({ author: req.body.author })
        if (!postDetails){
             res.status(400).send({message: 'post not found'})
    } 

        else {
            res.status(200).send({ message: 'post found', postDetails})

        }
    }
    catch ( error ) {
        const warnings = handleError(error)
        res.status(400).json({warnings})

           }

        }

// update post details = UPDATE/PUT method
postCtrl.updatePostDetails = async (req, res) => {
    try{
const { post, author, content, creationdate, numberofvotes} = req.body

        let postDetails = await User.findOneAndUpdate({_id: req.params.id }, {post, author, content, creationdate, numberofvotes})
        res.status(200).send({message: 'Your post has been updated successfully', postDetails})
            
    }
    catch ( error ) {
        const warnings = handleError(error)
        res.status(400).json({warnings})

    }
}

// delete post detail = DELETE method
postCtrl.deletePostDetails = async (req, res) => {
    try{
const { post, author, content } = req.body

       await Post.findOneAndDelete({_id: req.params.id }, {post, author, content })
       res.status(200).send({message: 'All your posts have been deleted successfully'})
                    
    }
    catch ( error ) {
        console.log(error)
    }
}

module.exports = postCtrl