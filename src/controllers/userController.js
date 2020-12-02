const User = require('../models/userModel')

function handleError(error){
    let err = { username: '', email: '', password: ''}

    if(error.message === 'incorrect username'){
        err.username = 'that username does not exist'
    }

    if(error.message === 'incorrect email'){
        err.email = 'that email is not valid'
    }

    if(error.message === 'incorrect password'){
        err.password = 'that password is incorrect'
    }

    if(error.code === 11000){
        err.email = 'that email is registered already'

        return err
    }
    
    if(error.message.includes('user validation failed')){

        Object.values(error.errors).forEach(({ properties }) => {
            err[properties.path] = properties.message
        })
    }

    return err
}

const userCtrl = {}

// create a user = POST method
userCtrl.createUser = async (req, res)=> {

    try{
        const newUser = new User(req.body)
        let result = await newUser.save()
        res.status(200).send({message: 'Your account has been created successfully', result})
            
        }
        catch (error){
            console.log(error.message)
            const warnings = handleError(error)
            res.status(400).json({warnings})

    }
}

// read a user detail = GET method
userCtrl.getUserDetails = async (req, res) => {
    try{
        let person = await User.find({ username: req.body.username })
        if (!person){
             res.status(400).send({ message: 'user notfound'})
    } 

        else {
            res.status(200).send({ message: 'user found', person})

        }
    }
    catch ( error ) {
        const warnings = handleError(error)
        res.status(400).json({warnings})

           }

        }

// update a user detail = UPDATE/PUT method
userCtrl.updateUserDetails = async (req, res) => {
    try{
const { username, email, password } = req.body

        let person = await User.findOneAndUpdate({_id: req.params.id }, {username, email, password})
        res.status(200).send({message: 'Your account has been updated successfully', person})
            
    }
    catch ( error ) {
        const warnings = handleError(error)
        res.status(400).json({warnings})

    }
}

// delete a user detail = DELETE method
userCtrl.deleteUserDetails = async (req, res) => {
    try{
const { username, email } = req.body

       await User.findOneAndDelete({_id: req.params.id }, {username, email })
       res.status(200).send({message: 'Your account has been deleted successfully'})
       //Here you don't have to add ,person details again because the account has been deleted 
                    
    }
    catch ( error ) {
        console.log(error)
    }
}

module.exports = userCtrl