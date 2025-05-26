import axios from "axios"
import { useState, useEffect } from "react"
const api_key = import.meta.env.VITE_SOME_KEY

const GetWeather = ({country}) => {
  const [weather, setWeather] = useState(null)

  const lat = country.capitalInfo.latlng[0]
  const lng = country.capitalInfo.latlng[1]

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}`
      )
      .then((response) => {
        setWeather(response.data)
      })
  }, [lat, lng])

  if (!weather) return <p>Loading weather...</p>

  const temp = (weather.main.temp - 273.15).toFixed(2)
  return (
    <>
      <h1>Weather in {country.capital}</h1>
      <p>Temperature {temp} Celsius</p>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
      <p>Wind {weather.wind.speed} m/s</p>
    </>
  )
}

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
      <>
        <ShowCountry country={filtered[0]} />
        <GetWeather country={filtered[0]} />
      </>
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
