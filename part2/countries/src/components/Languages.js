import React from 'react'

const Languages = ({ languages }) => {
    const rows = () => languages.map(l => <li key={l.iso639_2}>{l.name}</li>)
    return (
        <ul>{rows()} </ul>
    )
}

export default Languages