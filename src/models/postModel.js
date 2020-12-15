const mongoose = require ('mongoose');
const bcrypt = require ('bcrypt')

const postSchema = new mongoose.Schema({
post: {
    id: Number,
    type: String,
    unique: true,
    required: [true]},

author: {
  type: String,
  unique: true,
  required: [true, 'an author name is required']},

content: {
      type: String,
      minlength: 8,
      maxlength: 700,
      required: [true, 'Enter contents here...']
   },
   
creationdate: {type: String,
    unique: true,
    required: [true ],
},
    
numberofvotes: {
    type: Number,
    upvotes: 'not less than 0',
    downvotes: 'not less than 0',
    unique: true,
    required: [true]
},

})


const Post = mongoose.model('post', postSchema)
    

module.exports = Post