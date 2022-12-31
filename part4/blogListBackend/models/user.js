const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 3
  },
  name: String,
  passwordHash: {
    type: String,
    required: true,
    minLength: 3
  },
  // notes: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Note
  //   },
  // ]
})

/* A function that is called when the object is converted to JSON. */
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User