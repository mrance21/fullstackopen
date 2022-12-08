import { useState, useEffect } from "react";
import axios from 'axios'
import ShowResults from './components/Results'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ searchTerm, setTerm ] = useState("")

// fetch the data for all countries from the website
  useEffect(() => {
    axios
    .get("https://restcountries.com/v3.1/all")
    .then(response => {
      console.log(response)
      setCountries(response.data)
    })
  }, [])

  const handleSearch = (event) => {
    setTerm(event.target.value)
  }

// filter the countries based on search term
  const searchResults = countries.filter(country => country.name.common.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div>
      find countries: <input value={searchTerm} onChange={handleSearch} />
      <ShowResults searchResults={searchResults} setTerm={setTerm}/>
    </div>
  );
}

export default App;
