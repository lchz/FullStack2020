import React, { useState, useEffect } from 'react'
import Languages from './Languages'
import axios from 'axios'


const Country = ({ country }) => {
    // console.log('country: ', country)

    const [temp, setTemp] = useState()
    const [wind, setWind] = useState()
    const [dir, setDir] = useState()
    const [icon, setIcon] = useState('')

    useEffect(() => {
        axios.get(`http://api.weatherstack.com/current?access_key=35f2f3008b8084f0dcf631b322b66760&query=${country.capital}`)
            .then(response => {
                // console.log('current: ', response.data.current)

                const result = response.data.current
                setTemp(result.temperature)
                setWind(result.wind_speed)
                setDir(result.wind_dir)
                setIcon(result.weather_icons[0])
            })
    }, [country.capital])

    return (
        <div>
            <h1>{country.name} </h1>
            <p>capital: {country.capital}</p>
            <p>population: {country.population}</p>
            <h3>Languages</h3>
            <Languages languages={country.languages} />

            <img src={country.flag} alt="flag" width="304" height="228" />

            <h4>Weather in {country.capital}</h4>
            <p><strong>temperature: </strong> <span>{temp} Celsius</span></p>
            <img src={icon} alt="weather icon" width="100" height="100" />
            <p><strong>wind: </strong><span>{wind} kph direction {dir}</span></p>
        </div>
    )
}

export default Country