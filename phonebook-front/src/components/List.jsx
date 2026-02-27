

const List = ({personsToShow, deletePerson}) => {

  return (
      <div>
        <h2>Numbers</h2>
      <div>{personsToShow.map(person =><p key = {person.id}>{person.name} {person.number} <button onClick={() => deletePerson(person.id)} type="submit">delete</button> </p>
    
    )}</div>
      </div>

  )

}
export default List