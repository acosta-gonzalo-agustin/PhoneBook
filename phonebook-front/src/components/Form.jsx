

const Form = ({newName, newNumber, setName, setNumber, addPerson, deletePerson}) => {

  return (
      <>
      <h3>add a new</h3>
      <form>
        <div>
          name: <input value = {newName} onChange={setName}/>
        </div>
        <div>
          number: <input value = {newNumber} onChange = {setNumber} />
        </div>
        <div>
          <button onClick={addPerson} type="submit">add</button>
        </div>
      </form>
    </>
  )

}
export default Form