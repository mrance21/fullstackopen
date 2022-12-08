const Contacts = ({persons, term}) => {
   /* Filtering the persons array based on the term. */
    const searchResults = !term
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(term))
  
    return (
      <ul>
        {searchResults.map(person => <li key={person.id}>{person.name} {person.number}</li>)}
      </ul>
    )
  }

  export default Contacts