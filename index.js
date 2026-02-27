const express = require('express');
const app = express();
const cors = require('cors')
var morgan = require('morgan')


app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.static('dist'))

morgan.token('body', (req, res) => {
  return JSON.stringify(req.body)
})



let phoneNumbers = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Maria Becerra", 
      "number": "12-43-234345"
    },
    { 
      "id": 5,
      "name": "arina grande", 
      "number": "12-43-234345"
    },
    { 
      "id": 6,
      "name": "cliente nuevo", 
      "number": "12-43-234345"
    }
]





const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


app.get('/api/notes',(request,response)=> {
    response.json(phoneNumbers)
})


app.get('/info',(request,response)=> {

    const count = phoneNumbers.length
    const fechaActual = new Date()
    response.send(`<p>Phonebook has info for ${count} people</p>
        <p>${fechaActual}</p>`)
})



app.get('/api/notes/:id',(request,response)=> {
    const id = request.params.id
    
    const Person = phoneNumbers.find(person => person.id === Number(id))

    if(Person) {
      response.json(Person)
    } else {
      response.status(404).end()
      
    }
})


app.delete('/api/notes/:id',(request,response)=> {

    const id = request.params.id
    
    phoneNumbers = phoneNumbers.filter(person => person.id !== Number(id))
    console.log(phoneNumbers);

    response.status(204).end();
 
})


app.post('/api/notes',(request,response) => {

  const body = request.body

  if(!body.name || !body.number) {
     return response.status(400).json({
      error: 'content missing'
    })
  } else if (phoneNumbers.find(person => person.name === body.name)) {
    return response.status(409).json({
      error: 'name must be unique'
    })
  }
  
  const generateId = () => {
        return Math.floor(Math.random() * 1000000);
    };


    const newPhone = 
    { 
      "id": generateId(),
      "name": body.name, 
      "number": body.number
    }

    phoneNumbers = phoneNumbers.concat(newPhone)

    console.log(phoneNumbers)
    
    response.json(newPhone)
})