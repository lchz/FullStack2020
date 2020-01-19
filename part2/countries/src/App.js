import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [show, setShow] = useState([])
  const [showSingleCountry, setShowSingleCountry] = useState(false)
  const [single, setSingle] = useState() // is the country info to be shown when button clicked

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)

      })
  }, [])

  // input onChange handler
  const searchHandler = (event) => {
    const data = event.target.value
    setSearch(data)
    data === '' ? setShow([])
      : setShow(countries.filter(c => c.name.toLowerCase().includes(data.toLowerCase())))
  }

  // Button onClick handler
  // 1. To change content of the button
  // 2. set which country to show
  const showHandler = (country) => {
    showSingleCountry ? setShowSingleCountry(false) : setShowSingleCountry(true)
    setSingle(country)
  }

  const rows = () => {

    if (show.length > 10) {
      return (<p>Too many matches, specify another filter</p>)
    } else if (show.length > 1) {

      //???????????????? All the buttons changed at the same time?????????????
      return (show.map(c => <p key={c.name}>{c.name}
                              <button onClick={() => showHandler(c)}> 
                                {showSingleCountry ? 'hide' : 'show'}
                              </button>
                            </p>))
    }
    return (
      show.map(c => <Country key={c.name} country={c} />)
    )
  }

  return (
    <div>
      find countries <input value={search} onChange={searchHandler} />
      {rows()}
      <div>
        {showSingleCountry ? <Country key={single.name} country={single} /> : <p></p>}
      </div>
    </div>
  )
}

export default App;
