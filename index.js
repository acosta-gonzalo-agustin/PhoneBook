const express = require('express');
const app = express();
const cors = require('cors')
var morgan = require('morgan')
require('dotenv').config()

const Person = require('./models/person')


app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.static('dist'))

morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


app.get('/api/persons',(request, response, next)=> {
    Person.find({}).then(persons => {
      return response.json(persons)
    })
    .catch(error => next(error))
})


app.get('/info', async(request,response)=> {

    const count = await Person.find({}).then(phoneNumbers => {
      return phoneNumbers.length
    })

    const fechaActual = new Date()
    response.send(`<p>Phonebook has info for ${count} people</p>
        <p>${fechaActual}</p>`)
})



app.get('/api/persons/:id',(request,response, next)=> {
    const id = request.params.id


    Person.findById(id).then(person => {
      if(person) {
        response.json(person)
      } else {
        response.status(404).end()
      }

    })
    .catch(error => next(error))  

})


app.delete('/api/persons/:id',(request, response, next)=> {

    const id = request.params.id

    Person.findByIdAndDelete(id).then( () => {
      response.status(204).end()
    })
    .catch(error => next(error)) 
})


app.post('/api/persons',(request, response, next) => {

  const body = request.body

  // if(!body.name || !body.number) {
  //    return response.status(400).json({
  //     error: 'content missing'
  //   })
  // } 

    const person = new Person({
      name: body.name.trim(),
      number: body.number.trim()
    })

    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => {
      console.log(error)
      next(error)
    })



})

app.put('/api/persons/:id', (request, response, next) => {

  const body = request.body

  const person = {
    name: body.name.trim(),
    number: body.number.trim()
  }

  Person.findByIdAndUpdate(request.params.id, person, { 
    new: true, runValidators: true, context: 'query'
  })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
      

})




const invalidUrl = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(invalidUrl)


const errorHandler = (error, request, response, next) => {
  if(error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if(error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }


  next(error)
}

app.use(errorHandler)