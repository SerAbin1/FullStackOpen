const Filtered = ({ filtered, error }) => {
  if (error) return <p>{error}</p>

  if (filtered.length === 1) {
    const flag = filtered[0].flags.png
    const country = filtered[0]

    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>{country.capital}</p>
        <p>Area {country.area}</p>
        <h1>Languages</h1>
        {Object.values(country.languages).map((val, index) => (
          <li key={index}>{val}</li>
        ))}
        <img src={flag} />
      </div>
    )
  }
  else {
    return (
      filtered.map(country => (
        <p key={country.cca3}>{country.name.common}</p>
      ))  
    )
  }
}

export default Filtered
