const ShowResults = ({searchResults, setTerm}) => {
    if (searchResults.length === 1) {
      const country = searchResults[0]
    //   const api_key = process.env.REACT_APP_API_KEY
      return (
        <>
          <h1>{country.name.common}</h1>
          <div>Capital: {country.capital}</div> 
          <div>Area: {country.area}</div> 
          Languages:
          <ul>
            {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
          </ul>
          <img src={country.flags.png} alt={country.name.common}/>
          {/* <h2>Weather in {country.capital}</h2> */}
        </>
      )
    }
    if (searchResults.length > 10) return <div>"Too many matches, specify another filter"</div>
    return searchResults.map(country => {
      return(
        <div key={country.name.common}>
          {country.name.common} <button value={country.name.common} onClick={(e) => setTerm(e.target.value)}>show</button></div> 
      )
    })
  }

  export default ShowResults