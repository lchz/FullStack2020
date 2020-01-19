import React from 'react'
import Languages from './Languages'

const Country = ({ country }) => {
    // console.log('country: ', country)
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

export default Country