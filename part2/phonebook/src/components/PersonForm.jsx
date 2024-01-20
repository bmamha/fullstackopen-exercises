const PersonForm = ({addName,newName, handleNameChange,newNumber,handleNumberChange}) => {
    return (
        <>
        <form id="phonebook form" onSubmit={addName}>
        <div>
          name: <input value={newName} id= "name" onChange={handleNameChange} />
          number: <input value={newNumber} id= "number" onChange={handleNumberChange}/>
          <button type="submit">add</button>
        </div>
      </form>
      </>
    )
}

export default PersonForm

