import { useState } from "react"


const ShowCountry = ({ country }) => (
  <div>
    <h1>{country.name.common}</h1>
    <p>{country.capital}</p>
    <p>Area {country.area}</p>
    <h1>Languages</h1>
    {Object.values(country.languages).map((val, index) => (
      <li key={index}>{val}</li>
    ))}
    <img src={country.flags.png} />
  </div>
)

const Filtered = ({ filtered, error }) => {
  const [selected, setSelected] = useState(null)

  if (error) return <p>{error}</p>

  if (filtered.length === 1) {
    return (
      <ShowCountry country={filtered[0]} />
    )
  }

  else {
    return (
      <>
      {filtered.map(country => (
        <div key={country.cca3}>
          <p>{country.name.common}</p>
          <button onClick={() => setSelected(country)}>Show</button>
        </div>
      ))}
      {selected && <ShowCountry country={selected} />}
      </>
    )
  }
}

export default Filtered
