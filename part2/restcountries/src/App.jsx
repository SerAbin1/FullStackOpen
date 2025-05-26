import { useState } from "react";
import axios from 'axios';
import { useEffect } from "react";
import Filtered from './components/Filtered'

const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFiltered] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        setCountries(response.data)
      })
  }, [])

  const handleValue = (e) => {
    setValue(e.target.value)
  } 

  useEffect(() => {
    const filter = countries.filter((country) => country.name.common.toLowerCase().includes(value.toLowerCase()))
    if (filter.length > 10) {
      setError("Too many matches, specify another filter")
    }
    else if (filter.length <= 10 && filter.length > 1) {
      setFiltered(filter)
      setError(null)
    }
    else {
      setFiltered(filter)
      setError(null)
    }
  }, [value])

  return (
    <div>
      <div>
          <p>find countries</p>
          <input value={value} onChange={handleValue} />
      </div>
      <Filtered filtered={filteredCountries} error={error} />
    </div>
  )
}

export default App
