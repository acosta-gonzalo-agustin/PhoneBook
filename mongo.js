const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const encodedPassword = encodeURIComponent(password)

const url = `mongodb+srv://Admin:${encodedPassword}@cluster0.rt6kwav.mongodb.net/PhoneBook?appName=Cluster0`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    "name":"string",
    "number":"string"
})


const Person = mongoose.model('Person', personSchema)




if (process.argv.length === 5) {
    const name = process.argv[3]
    const number = process.argv[4]

    const person = new Person({
    "name": name,
    "number": number
    })

    person.save().then(result => {
        const data = result
        console.log(`addded ${data.name} number ${data.number} to phonebook`)
        mongoose.connection.close()
    })
}


if(process.argv.length === 3) {
    Person.find({}).then(result => {
    console.log('phonebook:')
    result.map(person => {
        console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
})

}


