const mongoose = require ('mongoose');
const bcrypt = require ('bcrypt')


const userSchema = new mongoose.Schema({
    username: {
             type: String,
             minlength: [5, 'minimum username is 5'], 
             maxlength: [16, 'maximum username is 16'],
             unique: true,
             required: [true, 'please enter a username'],
             lowercase: true},

    email: {
           type: String,
           unique: true,
           required: [true, 'the email field is required'],
           lowercase: true},

    password: {
               type: String,
               minlength: 8,
               required: [true, 'you must enter a password']
            },
  
})

userSchema.set('toJSON', {
    transfrom: (doc, user) => {
        user.id = user._id.toString()
        delete user._id
        delete user.__v
        delete user.password
    }
})


userSchema.pre('save', function(){
    if(this.password !== null || undefined ){
        bcrypt.hash(this.password, 'secret-text', function(err, hash){
            this.password = hash
        })
    }
    next()
})
const User = mongoose.model('user', userSchema)

module.exports = User