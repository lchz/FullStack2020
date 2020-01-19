import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [show, setShow] = useState([])

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)

      })
  }, [])
  // console.log(countries)

  const searchHandler = (event) => {
    const data = event.target.value
    setSearch(data)
    data === '' ? setShow([])
      : setShow(countries.filter(c => c.name.toLowerCase().includes(data.toLowerCase())))
  }

  const rows = () => {
    if (show.length > 10) {
      return (<p>Too many matches, specify another filter</p>)
    } else if (show.length > 1) {
      return (show.map(c => <p key={c.name}>{c.name}</p>))
    }
    return (
      show.map(c => <Country key={c.name} country={c} />)
    )
  }

  const Country = ({ country }) => {
    console.log({ country })
    return (
      <div>
        <h1>{country.name} </h1>
        <p>capital: {country.capital}</p>
        <p>population: {country.population}</p>
        <h3>Languages</h3>
        <Languages languages={country.languages} />
        <img src={country.flag} alt="flag" width="304" height="228" />
      </div>
    )
  }

  const Languages = ({ languages }) => {
    const rows = () => languages.map(l => <li key={l.iso639_2}>{l.name}</li>)
    return (
      <ul>{rows()} </ul>
    )
  }

  return (
    <div>
      find countries <input value={search} onChange={searchHandler} />
      {rows()}
    </div>
  )
}

export default App;
