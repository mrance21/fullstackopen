const mongoose = require('mongoose');

mongoose.set('strictQuery', true);


if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
  }

const password = process.argv[2]

const url = `mongodb+srv://mrance21:Giovanni21@cluster0.ndtepta.mongodb.net/noteApp?retryWrites=true&w=majority`

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')

    // const note = new Note({
    //   content: 'print this note to the console',
    //   date: new Date(),
    //   important: true,
    // })
    // return note.save()
  })
//   .then(() => {
//     console.log('note saved!')
//     return mongoose.connection.close()
//   })
Note.find({}).then(result => {
    result.forEach(note => {
    console.log(note)
    })
    mongoose.connection.close()
})
  .catch((err) => console.log(err))


//   mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })


  if (process.argv.length === 3) {
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person)
        })
        return mongoose.connection.close()
    })
    .catch((err) => console.log(err))
}

if (process.argv.length > 3) {
    const person = new Person({
        name: name,
        number: number,
    })
    person.save().then(() => {
        console.log(`added ${name} number ${number} to phonebook`)
        console.log('note saved!')
        return mongoose.connection.close()
        })
        .catch((err) => console.log(err))
    }