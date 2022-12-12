const Contacts = ({persons, term, removeContact}) => {
   /* Filtering the persons array based on the term. */
    const searchResults = !term
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(term))
  
    return (
      <ul>
        {searchResults.map(person => <li className="contact" key={person.id}>{person.name} {person.number} 
        <button onClick={() => removeContact(person.id)}>Delete</button></li>)}
      </ul>
    )
  }

  export default Contacts