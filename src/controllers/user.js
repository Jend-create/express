const { response } = require('express')
const User = require('../models/userModel')

const signup = async (req, res) => {
    
    const  {firstname, Lastname, email, password} = req.body
    if (firstname && Lastname && email && password){
    const user = User (doc, {firstname, Lastname, email, password})
    const newUser = await user.save()
    res.send(newUser)
    }
    }