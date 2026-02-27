import { useState } from 'react'
import  SearchInput  from './components/SearchInput'
import  Form  from './components/Form'
import  List  from './components/List'
import Notification from './components/Notification'

import { useEffect } from 'react'
import services from './services/phones'





const App = () => {


  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [Filter, setFilter] = useState('')
  const [Message, setMessage] = useState(null)
  const [Style, setStyle] = useState('success')

  // obtain persons

  useEffect(()=> {
     services.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })

  },[])


  // set data

  const setName = (event) => {
    setNewName(event.target.value)
  }

  const setNumber = (event) => {

    setNewNumber(event.target.value)

  }

  // add number

  const addPerson = (event) => {
    event.preventDefault()

    const newperson = {
      name: newName,
      number: newNumber,
    }

    const personExist = persons.find(person => person.name === newName)


    if( ! personExist) {
      services.createNumber(newperson).then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setStyle('success')

    })

    } else {
      services.editNumber(newperson,personExist.id).then(returnedPerson => {
      const updatedPersons = persons.map(person => person.id === returnedPerson.id ? returnedPerson : person)  
      setPersons(updatedPersons)
      setStyle('success')
    })
    .catch(error => {
      const newError = `Information of ${newName} has already been deleted from the server`
      setMessage(newError)
      setStyle('error')
      setTimeout(() => {
      setMessage(null)
    }, 5000)

    })
    }

    
    setMessage(`Added ${newName}`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
    setNewName('')
    setNewNumber('')
    setFilter('') 
  }


  //filter numbers

   const personsToShow = Filter === ''
    ? persons
    : persons.filter(p => p.name.toLowerCase().includes(Filter.toLowerCase()))

    const newFilter = (event) => {

    setFilter(event.target.value)

  }

  //delete number

  const deletePerson = (id) => {
    services.deleteNumber(id).then(() =>{
      const updatedPersons = persons.filter(p => p.id !== id)
      setPersons(updatedPersons)    
    })
  }



  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message = {Message} style = {Style}/>
      <SearchInput value = {Filter} onChange = {newFilter}/>
      <Form newName = {newName} newNumber = {newNumber} setName = {setName} setNumber = {setNumber} addPerson = {addPerson} />
      <List personsToShow = {personsToShow} deletePerson = {deletePerson}/>
    </div>
  )

}
export default App