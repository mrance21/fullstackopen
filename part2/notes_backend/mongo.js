// const mongoose = require('mongoose');
// const password = process.argv[2]

// mongoose.set('strictQuery', true);


// if (process.argv.length < 3) {
//     console.log('Please provide the password as an argument: node mongo.js <password>')
//     process.exit(1)
//   }

// const password = process.argv[2]

// const url = `mongodb+srv://mrance21:${password}@cluster0.ndtepta.mongodb.net/noteApp?retryWrites=true&w=majority`

// mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

// const noteSchema = new mongoose.Schema({
//   content: String,
//   date: Date,
//   important: Boolean,
// })

// const Note = mongoose.model('Note', noteSchema)

// if (process.argv.length === 3) {
//     const note = new Note({
//         content: 'print this note to the console',
//         date: new Date(),
//         important: true,
//       })
//       return note.save()
//       .then(() => {
//         console.log('note saved!')
//         return mongoose.connection.close()
//       })
//       .catch((err) => console.log(err))
// }
// Note.find({}).then(result => {
//     result.forEach(note => {
//     console.log(note)
//     })
//     mongoose.connection.close()
// })
  