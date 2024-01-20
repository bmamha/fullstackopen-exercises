
const Persons = ({persons, deleteButton}) => {
    return(
    <ul>{persons.map(person => 
        <li key={person.id}>
          {person.name} {person.number}
          <button onClick={() => deleteButton(person.id)}>Delete</button>
        </li>)}
        </ul>
    )
}


export default Persons