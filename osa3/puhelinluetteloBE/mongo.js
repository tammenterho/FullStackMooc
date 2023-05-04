const mongoose = require('mongoose')

 if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3];
const number = process.argv[4];

const url =
  `mongodb+srv://terho:${password}@test-cluster-1.yn0ozwg.mongodb.net/?retryWrites=true&w=majority`


mongoose.set('strictQuery', false)
mongoose.connect(url)

console.log('connecting to', url)

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: {
    type: String,
    required: true
  }
}, { validateBeforeSave: true })

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: name,
  number: number
})

person.find({}).then(result => {
  result.forEach(person => {
    console.log(person)
  })
  mongoose.connection.close()
})
